'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/api'
import toast from 'react-hot-toast'

type AuthUser = {
  id: string
  email: string
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]   = useState('')
  const [otp, setOtp]       = useState('')
  const [step, setStep]     = useState<'email' | 'otp'>('email')
  const [loading, setLoading] = useState(false)

  async function handleRequestOtp() {
    setLoading(true)
    try {
      await apiFetch('/api/auth/request-otp', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
      setStep('otp')
      toast.success('OTP sent — check your email')
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to send OTP')
    } finally { setLoading(false) }
  }

  async function handleVerifyOtp() {
    setLoading(true)
    try {
      const { token, user } = await apiFetch<{ token: string; user: AuthUser }>(
        '/api/auth/verify-otp',
        { method: 'POST', body: JSON.stringify({ email, otp }) }
      )
      localStorage.setItem('nexora_jwt', token)
      localStorage.setItem('nexora_user', JSON.stringify(user))
      router.push('/dashboard')
    } catch {
      toast.error('Invalid OTP — try again')
    } finally { setLoading(false) }
  }

  return (
    <main className="min-h-screen bg-[#060608] flex items-center justify-center p-6">
      <div className="w-full max-w-sm border border-white/10 p-8">
        <h1 className="font-serif text-3xl text-white mb-2">
          {step === 'email' ? 'Sign in' : 'Enter OTP'}
        </h1>
        {step === 'email' ? (
          <>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full mt-4 px-4 py-3 bg-[#111118] border border-white/10 text-white text-sm outline-none focus:border-teal-400"
            />
            <button onClick={handleRequestOtp} disabled={loading || !email}
              className="w-full mt-4 py-3 bg-teal-400/10 border border-teal-400/40 text-teal-400 text-sm font-mono tracking-widest uppercase hover:bg-teal-400/20 disabled:opacity-40 transition"
            >{loading ? 'Sending...' : 'Send OTP'}</button>
          </>
        ) : (
          <>
            <p className="text-sm text-white/50 mt-2">Sent to {email}</p>
            <input
              type="text" value={otp} onChange={(e) => setOtp(e.target.value)}
              placeholder="123456" maxLength={6}
              className="w-full mt-4 px-4 py-3 bg-[#111118] border border-white/10 text-white text-sm font-mono tracking-[0.3em] text-center outline-none focus:border-teal-400"
            />
            <button onClick={handleVerifyOtp} disabled={loading || otp.length < 6}
              className="w-full mt-4 py-3 bg-teal-400/10 border border-teal-400/40 text-teal-400 text-sm font-mono tracking-widest uppercase hover:bg-teal-400/20 disabled:opacity-40 transition"
            >{loading ? 'Verifying...' : 'Verify'}</button>
            <button onClick={() => setStep('email')} className="w-full mt-2 py-2 text-white/30 text-xs font-mono hover:text-white/60">
              ← Use a different email
            </button>
          </>
        )}
      </div>
    </main>
  )
}
