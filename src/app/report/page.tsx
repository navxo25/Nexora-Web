'use client'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/api'
import toast from 'react-hot-toast'

const CATEGORIES = ['roads', 'water', 'electricity', 'sanitation', 'drainage', 'other']

const schema = z.object({
  category:    z.string().min(1),
  severity:    z.number().min(1).max(5),
  description: z.string().min(10, 'Describe the issue in at least 10 characters'),
  latitude:    z.number(),
  longitude:   z.number(),
  ward:        z.string().optional(),
})

type FormData = z.infer<typeof schema>

// Upload a photo directly to Cloudinary (Pranav will provide credentials)
async function uploadToCloudinary(file: File): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('upload_preset', 'nexora') 
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dlrkj046f/image/upload`, // REPLACE YOUR_CLOUD_NAME
    { method: 'POST', body: fd }
  )
  const data = await res.json()
  return data.secure_url as string
}

export default function ReportPage() {
  const router = useRouter()
  const [photos, setPhotos]         = useState<File[]>([])
  const [uploading, setUploading]   = useState(false)

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: { severity: 3, latitude: 19.076, longitude: 72.877 },
    })
  const severity = useWatch({ control, name: 'severity' })

  const onSubmit = async (data: FormData) => {
    setUploading(true)
    let photo_urls: string[] = []
    try {
      photo_urls = await Promise.all(photos.map(uploadToCloudinary))
    } catch (e) {
      console.error("Upload failed", e)
    } finally { setUploading(false) }

    try {
      await apiFetch('/api/complaints', {
        method: 'POST',
        body: JSON.stringify({ ...data, photo_urls }),
      })
      toast.success('Complaint submitted!')
      router.push('/dashboard')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit complaint')
    }
  }

  return (
    <main className="min-h-screen bg-[#060608] p-6 pt-24">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
        <h1 className="font-serif text-4xl text-white">Report an Issue</h1>

        {/* Category Selection */}
        <select {...register('category')}
          className="w-full px-4 py-3 bg-[#111118] border border-white/10 text-white text-sm outline-none focus:border-teal-400">
          <option value="">Select category</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Severity 1-5 Slider */}
        <div>
          <label className="text-xs font-mono text-white/40 tracking-widest uppercase">
            Severity: {severity} / 5
          </label>
          <input type="range" min={1} max={5} step={1} {...register('severity', { valueAsNumber: true })}
            className="w-full mt-2 accent-teal-400" />
        </div>

        {/* Description Textarea */}
        <textarea {...register('description')} rows={4}
          placeholder="Describe the issue in detail..."
          className="w-full px-4 py-3 bg-[#111118] border border-white/10 text-white text-sm resize-none outline-none focus:border-teal-400" />
        {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}

        {/* Photo Upload Input */}
        <input type="file" multiple accept="image/*"
          onChange={(e) => setPhotos(Array.from(e.target.files || []))}
          className="text-white/40 text-sm" />
        {photos.length > 0 && <p className="text-xs text-teal-400 font-mono">{photos.length} photo(s) selected</p>}

        <button type="submit" disabled={isSubmitting || uploading}
          className="w-full py-4 bg-teal-400/10 border border-teal-400/40 text-teal-400 text-sm font-mono tracking-widest uppercase hover:bg-teal-400/20 disabled:opacity-40 transition"
        >{uploading ? 'Uploading photos...' : isSubmitting ? 'Submitting...' : 'Submit Report'}</button>
      </form>
    </main>
  )
}
