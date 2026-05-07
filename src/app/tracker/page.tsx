'use client'

import { useState } from 'react'
import { apiFetch } from '@/lib/api'

const STATUS_COLOR: Record<string, string> = {
  submitted: '#c9a84c',
  verified: '#5a8de0',
  assigned: '#9b5fe0',
  in_progress: '#e08a3c',
  resolved: '#5ac97a',
  closed: '#5a5a72',
}

type ComplaintHistory = {
  status: string
  note?: string
  created_at: string
}

type ComplaintResult = {
  id: string
  category: string
  ward: string
  description: string
  status: string
  history: ComplaintHistory[]
}

export default function TrackerPage() {
  const [id, setId] = useState('')
  const [result, setResult] = useState<ComplaintResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function track() {
    const trimmedId = id.trim()

    if (!trimmedId) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await apiFetch<ComplaintResult>(`/api/complaints/track/${trimmedId}`)
      setResult(data)
    } catch {
      setError('Complaint not found. Check the ID and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#060608] px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-xs font-mono uppercase tracking-widest text-teal-400">
          Public Tracker
        </p>
        <h1 className="mb-8 text-5xl font-semibold text-white">Track your complaint</h1>

        <div className="flex gap-2">
          <input
            value={id}
            onChange={(event) => setId(event.target.value)}
            placeholder="Paste complaint ID..."
            onKeyDown={(event) => event.key === 'Enter' && track()}
            className="flex-1 border border-white/10 bg-[#111118] px-4 py-3 text-sm font-mono text-white outline-none focus:border-teal-400"
          />
          <button
            onClick={track}
            disabled={loading || !id.trim()}
            className="border border-teal-400/40 bg-teal-400/10 px-6 py-3 text-xs font-mono uppercase tracking-widest text-teal-400 transition hover:bg-teal-400/20 disabled:opacity-40"
          >
            {loading ? '...' : 'Track'}
          </button>
        </div>

        {error && <p className="mt-4 text-sm font-mono text-red-400">{error}</p>}

        {result && (
          <div className="mt-8 border border-white/10">
            <div className="border-b border-white/10 p-6">
              <p className="text-xs font-mono uppercase tracking-widest text-white/30">
                {result.category} · {result.ward}
              </p>
              <p className="mt-2 text-white">{result.description}</p>
              <span
                style={{ color: STATUS_COLOR[result.status] ?? '#5a5a72' }}
                className="mt-2 inline-block text-xs font-mono uppercase tracking-widest"
              >
                ● {result.status}
              </span>
            </div>

            <div className="space-y-4 p-6">
              {result.history.map((historyItem, index) => (
                <div key={`${historyItem.status}-${historyItem.created_at}`} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="mt-1 h-2 w-2 rounded-full"
                      style={{ background: STATUS_COLOR[historyItem.status] ?? '#5a5a72' }}
                    />
                    {index < result.history.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-white/10" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p
                      className="text-xs font-mono uppercase tracking-widest"
                      style={{ color: STATUS_COLOR[historyItem.status] ?? '#5a5a72' }}
                    >
                      {historyItem.status}
                    </p>
                    {historyItem.note && (
                      <p className="mt-1 text-xs text-white/50">{historyItem.note}</p>
                    )}
                    <p className="mt-1 text-xs text-white/20">
                      {new Date(historyItem.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
