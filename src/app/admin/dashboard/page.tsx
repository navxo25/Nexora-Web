'use client'

import CitySwitcher from '@/components/CitySwitcher'
import Link from 'next/link'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const stats = {
  total: 128,
  open: 34,
  resolved: 82,
  avg_resolution_hours: 18,
  trend: [
    { date: 'Day 1', open: 22, resolved: 8 },
    { date: 'Day 5', open: 28, resolved: 16 },
    { date: 'Day 10', open: 24, resolved: 31 },
    { date: 'Day 15', open: 36, resolved: 45 },
    { date: 'Day 20', open: 31, resolved: 59 },
    { date: 'Day 25', open: 38, resolved: 70 },
    { date: 'Day 30', open: 34, resolved: 82 },
  ],
}

export default function AdminDashboard() {
  const cards = [
    { label: 'Total', value: stats.total, color: 'text-white' },
    { label: 'Open', value: stats.open, color: 'text-yellow-300' },
    { label: 'Resolved', value: stats.resolved, color: 'text-teal-300' },
    { label: 'Avg Hrs', value: stats.avg_resolution_hours, color: 'text-sky-300' },
  ]

  return (
    <main className="min-h-screen bg-[#060608] p-6 text-white">
      <section className="mx-auto max-w-6xl py-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-teal-300/70">
              Nexora Admin
            </p>
            <h1 className="mt-3 text-4xl font-semibold">Admin Dashboard</h1>
          </div>
          
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <CitySwitcher />
            
            <div className="flex gap-3">
              <Link
                href="/map"
                className="border border-white/10 px-4 py-3 text-xs font-mono uppercase tracking-widest text-white/65 hover:border-teal-300/40 hover:text-teal-200 transition-colors"
              >
                Map
              </Link>
              <Link
                href="/report"
                className="border border-teal-300/40 bg-teal-300/10 px-4 py-3 text-xs font-mono uppercase tracking-widest text-teal-200 hover:bg-teal-300/15 transition-colors"
              >
                New Report
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {cards.map(({ label, value, color }) => (
            <article key={label} className="border border-white/10 bg-[#0d0d12] p-5">
              <p className="mb-2 text-xs font-mono uppercase tracking-widest text-white/35">
                {label}
              </p>
              <p className={`text-4xl font-semibold ${color}`}>{value}</p>
            </article>
          ))}
        </div>

        <section className="mt-8 border border-white/10 bg-[#0d0d12] p-5">
          <p className="mb-6 text-xs font-mono uppercase tracking-widest text-white/35">
            30-Day Trend
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.trend}>
                <defs>
                  <linearGradient id="openGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="resolvedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5eead4" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#5eead4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="date" tick={{ fill: '#8a8a9e', fontSize: 11 }} tickLine={false} />
                <YAxis tick={{ fill: '#8a8a9e', fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#16161f',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="open"
                  stroke="#facc15"
                  fill="url(#openGrad)"
                  strokeWidth={2}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#5eead4"
                  fill="url(#resolvedGrad)"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </section>
    </main>
  )
}
