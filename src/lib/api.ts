// src/lib/api.ts
// All calls go to Pranav's backend at NEXT_PUBLIC_API_BASE
// Phase 3: Every request includes city slug in x-city header
const BASE = process.env.NEXT_PUBLIC_API_BASE ?? ''

function getJwt() {
  return typeof window !== 'undefined'
    ? localStorage.getItem('nexora_jwt')
    : null
}

function getCurrentCity() {
  return typeof window !== 'undefined'
    ? localStorage.getItem('nexora_city') || process.env.NEXT_PUBLIC_DEFAULT_CITY || 'mumbai'
    : 'mumbai'
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const jwt = getJwt()
  const city = getCurrentCity()
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'x-city': city, // Phase 3 multi-city header
      ...(jwt ? { 'Authorization': `Bearer ${jwt}` } : {}),
      ...init.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  return res.json()
}
