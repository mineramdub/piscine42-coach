import { NextRequest, NextResponse } from 'next/server'
import { loadExercisesByDay } from '@/lib/exercises/loader'
import { TOTAL_DAYS } from '@/lib/config/constants'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ day: string }> }
) {
  try {
    const { day } = await params
    const dayNumber = parseInt(day, 10)

    if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > TOTAL_DAYS) {
      return NextResponse.json(
        { error: `Invalid day number. Must be between 1 and ${TOTAL_DAYS}.` },
        { status: 400 }
      )
    }

    const exercises = loadExercisesByDay(dayNumber)

    return NextResponse.json({
      day: dayNumber,
      exercises,
      count: exercises.length,
    })
  } catch (error) {
    console.error('Day exercises API error:', error)
    return NextResponse.json(
      { error: 'Failed to load exercises for this day' },
      { status: 500 }
    )
  }
}
