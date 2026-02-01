import { NextRequest, NextResponse } from 'next/server'
import { loadAllExercises } from '@/lib/exercises/loader'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const exercises = loadAllExercises()

    // Trouver l'exercice actuel
    const currentIndex = exercises.findIndex((ex) => ex.id === id)

    if (currentIndex === -1) {
      return NextResponse.json(
        { error: 'Exercise not found' },
        { status: 404 }
      )
    }

    const currentExercise = exercises[currentIndex]

    // Trouver l'exercice suivant (même catégorie et jour suivant dans l'ordre)
    const nextExercise =
      currentIndex < exercises.length - 1
        ? exercises[currentIndex + 1]
        : null

    // Déterminer si c'est le dernier du jour
    const sameDayExercises = exercises.filter(
      (ex) => ex.day === currentExercise.day && ex.category === currentExercise.category
    )
    const isLastOfDay =
      currentExercise.order === sameDayExercises.length - 1

    return NextResponse.json({
      exercise: currentExercise,
      nextExerciseId: nextExercise?.id,
      isLastOfDay,
    })
  } catch (error) {
    console.error('Exercise API error:', error)
    return NextResponse.json(
      { error: 'Failed to load exercise' },
      { status: 500 }
    )
  }
}
