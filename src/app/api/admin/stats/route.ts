import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
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
  })
}
