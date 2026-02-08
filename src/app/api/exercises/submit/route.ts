import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

interface SubmitExerciseRequest {
  userId: string
  exerciseId: string
  completed: boolean
  points?: number
  timeSpent?: number
  attempts?: number
  firstTrySuccess?: boolean
  hintsUsed?: number
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SubmitExerciseRequest

    const {
      userId,
      exerciseId,
      completed,
      points = 0,
      timeSpent = 0,
      attempts = 1,
      firstTrySuccess = false,
      hintsUsed = 0,
    } = body

    if (!userId || !exerciseId) {
      return NextResponse.json(
        { error: 'userId et exerciseId sont requis' },
        { status: 400 }
      )
    }

    // Vérifier ou créer l'utilisateur
    let user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          name: 'Étudiant',
        },
      })
    }

    // Créer ou mettre à jour la completion de l'exercice
    const completion = await prisma.exerciseCompletion.upsert({
      where: {
        userId_exerciseId: {
          userId,
          exerciseId,
        },
      },
      update: {
        completed,
        completedAt: completed ? new Date() : undefined,
        attempts: {
          increment: 1,
        },
        bestScore: Math.max(
          (await prisma.exerciseCompletion
            .findUnique({
              where: {
                userId_exerciseId: {
                  userId,
                  exerciseId,
                },
              },
            })
            .then(c => c?.bestScore || 0)) || 0,
          points
        ),
        timeSpent: {
          increment: timeSpent,
        },
        firstTrySuccess: firstTrySuccess || undefined,
        lastAttemptAt: new Date(),
        hintsUsed: {
          increment: hintsUsed,
        },
      },
      create: {
        userId,
        exerciseId,
        completed,
        completedAt: completed ? new Date() : undefined,
        attempts: 1,
        bestScore: points,
        timeSpent,
        firstTrySuccess,
        lastAttemptAt: new Date(),
        hintsUsed,
      },
    })

    // Mettre à jour la progression utilisateur si l'exercice est complété
    if (completed) {
      const userProgress = await prisma.userProgress.upsert({
        where: { userId },
        update: {
          totalExercisesCompleted: {
            increment: 1,
          },
          cXp: {
            increment: points,
          },
          totalTimeSpent: {
            increment: Math.floor(timeSpent / 60), // convertir en minutes
          },
        },
        create: {
          userId,
          totalExercisesCompleted: 1,
          cXp: points,
          totalTimeSpent: Math.floor(timeSpent / 60),
        },
      })

      return NextResponse.json(
        {
          success: true,
          message: 'Progression enregistrée avec succès',
          completion,
          userProgress,
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Tentative enregistrée',
        completion,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde de la progression' },
      { status: 500 }
    )
  }
}
