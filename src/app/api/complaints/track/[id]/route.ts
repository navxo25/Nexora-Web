import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const complaintId = decodeURIComponent(id).trim()

  if (!complaintId) {
    return NextResponse.json({ error: 'Complaint ID is required' }, { status: 400 })
  }

  if (complaintId.toLowerCase() === 'missing') {
    return NextResponse.json({ error: 'Complaint not found' }, { status: 404 })
  }

  const now = Date.now()

  return NextResponse.json({
    id: complaintId,
    category: 'roads',
    ward: 'Ward A',
    description: 'Pothole reported near the main junction.',
    status: 'in_progress',
    history: [
      {
        status: 'submitted',
        note: 'Complaint received from public report form.',
        created_at: new Date(now - 1000 * 60 * 60 * 48).toISOString(),
      },
      {
        status: 'verified',
        note: 'Location and category verified.',
        created_at: new Date(now - 1000 * 60 * 60 * 30).toISOString(),
      },
      {
        status: 'assigned',
        note: 'Assigned to field operations team.',
        created_at: new Date(now - 1000 * 60 * 60 * 18).toISOString(),
      },
      {
        status: 'in_progress',
        note: 'Repair crew scheduled for inspection.',
        created_at: new Date(now - 1000 * 60 * 60 * 4).toISOString(),
      },
    ],
  })
}
