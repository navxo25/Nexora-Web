'use client'

import { useEffect, useRef, useState } from 'react'

const CITIES = [
  { id: 'mumbai', name: 'Mumbai', country: 'IN' },
  { id: 'lagos', name: 'Lagos', country: 'NG' },
  { id: 'jakarta', name: 'Jakarta', country: 'ID' },
  { id: 'dhaka', name: 'Dhaka', country: 'BD' },
  { id: 'cairo', name: 'Cairo', country: 'EG' },
  { id: 'karachi', name: 'Karachi', country: 'PK' },
]

export default function CitySwitcher() {
  const [city, setCity] = useState(() => {
    if (typeof window === 'undefined') return 'mumbai'

    const saved = localStorage.getItem('nexora_city')
    return saved && CITIES.some((item) => item.id === saved) ? saved : 'mumbai'
  })
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const selectedCity = CITIES.find((item) => item.id === city) ?? CITIES[0]

  useEffect(() => {
    function closeMenu(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', closeMenu)
    return () => document.removeEventListener('mousedown', closeMenu)
  }, [])

  function selectCity(newCity: string) {
    setCity(newCity)
    setOpen(false)
    localStorage.setItem('nexora_city', newCity)
    window.location.reload()
  }

  return (
    <div ref={menuRef} className="relative w-full sm:w-56">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 border border-white/10 bg-[#0d0d12] px-4 py-3 text-left transition hover:border-teal-300/40 focus:border-teal-300/60 focus:outline-none"
      >
        <span>
          <span className="block text-[10px] font-mono uppercase tracking-widest text-white/35">
            City
          </span>
          <span className="mt-1 block text-sm font-medium text-white">
            {selectedCity.name}, {selectedCity.country}
          </span>
        </span>
        <span className="text-xs font-mono text-teal-300">{open ? '^' : 'v'}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-20 mt-2 w-full overflow-hidden border border-white/10 bg-[#111118] shadow-2xl shadow-black/50"
        >
          {CITIES.map((item) => {
            const selected = item.id === city

            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => selectCity(item.id)}
                className="flex w-full items-center justify-between border-b border-white/5 px-4 py-3 text-left last:border-b-0 hover:bg-teal-300/10"
              >
                <span>
                  <span className="block text-sm text-white">{item.name}</span>
                  <span className="mt-1 block text-[10px] font-mono uppercase tracking-widest text-white/35">
                    {item.country}
                  </span>
                </span>
                {selected && (
                  <span className="text-xs font-mono uppercase tracking-widest text-teal-300">
                    Active
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
