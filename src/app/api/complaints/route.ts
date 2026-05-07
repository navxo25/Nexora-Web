import { NextResponse } from 'next/server'

const CATEGORIES = ['roads', 'water', 'electricity', 'sanitation', 'drainage', 'other']

type ComplaintPayload = {
  category?: string
  severity?: number
  description?: string
  latitude?: number
  longitude?: number
  ward?: string
  photo_urls?: string[]
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as ComplaintPayload | null

  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body.category || !CATEGORIES.includes(body.category)) {
    return NextResponse.json({ error: 'Choose a valid category' }, { status: 400 })
  }

  if (typeof body.severity !== 'number' || body.severity < 1 || body.severity > 5) {
    return NextResponse.json({ error: 'Choose a severity from 1 to 5' }, { status: 400 })
  }

  if (!body.description || body.description.trim().length < 10) {
    return NextResponse.json(
      { error: 'Describe the issue in at least 10 characters' },
      { status: 400 },
    )
  }

  if (typeof body.latitude !== 'number' || typeof body.longitude !== 'number') {
    return NextResponse.json({ error: 'Location is required' }, { status: 400 })
  }

  const complaint = {
    id: crypto.randomUUID(),
    status: 'submitted',
    created_at: new Date().toISOString(),
    ...body,
    photo_urls: body.photo_urls ?? [],
  }

  return NextResponse.json({ complaint }, { status: 201 })
}
