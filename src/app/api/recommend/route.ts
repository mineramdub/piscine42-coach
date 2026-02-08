import { NextRequest, NextResponse } from 'next/server'
import { getRecommendationsForUser } from '@/lib/progression/recommender'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'default-user'
    const limit = parseInt(searchParams.get('limit') || '6', 10)

    const recs = await getRecommendationsForUser(userId, limit)

    return NextResponse.json({ success: true, recommendations: recs })
  } catch (error) {
    console.error('recommendation error', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
