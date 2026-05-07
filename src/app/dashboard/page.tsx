export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#060608] p-6 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col justify-center">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-300/70">
          Nexora
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Dashboard</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
          You are signed in. The dashboard modules can be added here next.
        </p>
      </section>
    </main>
  )
}
