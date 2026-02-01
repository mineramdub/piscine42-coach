import { NextRequest, NextResponse } from 'next/server'
import { loadExercisesByCategory } from '@/lib/exercises/loader'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ level: string }> }
) {
  try {
    const { level } = await params
    const levelNumber = parseInt(level, 10)

    if (isNaN(levelNumber) || levelNumber < 1) {
      return NextResponse.json(
        { error: 'Invalid level number. Must be >= 1.' },
        { status: 400 }
      )
    }

    // Charger tous les exercices terminal
    const allTerminalExercises = loadExercisesByCategory('terminal')

    // Filtrer par niveau
    const levelExercises = allTerminalExercises.filter(
      (ex: any) => ex.level === levelNumber
    )

    // Trier par order
    levelExercises.sort((a: any, b: any) => a.order - b.order)

    return NextResponse.json({
      level: levelNumber,
      exercises: levelExercises,
      count: levelExercises.length,
    })
  } catch (error) {
    console.error('Terminal exercises API error:', error)
    return NextResponse.json(
      { error: 'Failed to load terminal lessons' },
      { status: 500 }
    )
  }
}
