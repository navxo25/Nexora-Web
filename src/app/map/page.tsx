import Link from 'next/link'

const issuePins = [
  { id: 'NX-1042', category: 'Roads', area: 'Andheri East', severity: 4 },
  { id: 'NX-1038', category: 'Water', area: 'Bandra West', severity: 3 },
  { id: 'NX-1031', category: 'Sanitation', area: 'Dadar', severity: 2 },
]

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#060608] p-6 text-white">
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl gap-6 py-8 lg:grid-cols-[1fr_340px]">
        <div className="relative min-h-[520px] overflow-hidden border border-white/10 bg-[#0b1114]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.09)_1px,transparent_1px)] bg-[size:56px_56px]" />
          <div className="absolute left-[32%] top-[36%] h-4 w-4 rounded-full border-2 border-[#060608] bg-teal-300 shadow-[0_0_0_8px_rgba(45,212,191,0.14)]" />
          <div className="absolute left-[58%] top-[52%] h-4 w-4 rounded-full border-2 border-[#060608] bg-amber-300 shadow-[0_0_0_8px_rgba(252,211,77,0.14)]" />
          <div className="absolute left-[46%] top-[66%] h-4 w-4 rounded-full border-2 border-[#060608] bg-rose-300 shadow-[0_0_0_8px_rgba(253,164,175,0.14)]" />
          <div className="relative flex h-full flex-col justify-between p-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-teal-300/70">
                Nexora
              </p>
              <h1 className="mt-3 text-4xl font-semibold">City Map</h1>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/55">
              Live map integration can connect here once the Mapbox token and
              complaints feed are ready.
            </p>
          </div>
        </div>

        <aside className="border border-white/10 bg-[#0d0d12] p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-medium">Recent Issues</h2>
            <Link
              href="/report"
              className="text-xs font-mono uppercase tracking-widest text-teal-300 hover:text-teal-200"
            >
              Report
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {issuePins.map((issue) => (
              <article key={issue.id} className="border border-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{issue.category}</p>
                  <span className="text-xs font-mono text-white/40">{issue.id}</span>
                </div>
                <p className="mt-2 text-sm text-white/55">{issue.area}</p>
                <p className="mt-3 text-xs font-mono uppercase tracking-widest text-teal-300/70">
                  Severity {issue.severity}/5
                </p>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </main>
  )
}
