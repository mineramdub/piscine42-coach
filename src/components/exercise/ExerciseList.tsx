'use client'

import { Lock, CheckCircle, Circle, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { calculateUnlockStatus } from '@/lib/progression/unlockSystem'
import MarkdownText from '@/components/ui/MarkdownText'

interface Exercise {
  id: string
  title: string
  description: string
  points: number
  order: number
  difficulty: number
}

interface ExerciseListProps {
  exercises: Exercise[]
  completedExercises: number[]
  currentDay: number
}

export default function ExerciseList({ exercises, completedExercises, currentDay }: ExerciseListProps) {
  const unlockStatus = calculateUnlockStatus(exercises.length, completedExercises)

  // Grouper les exercices par groupe de 3
  const groups: Exercise[][] = []
  const groupSize = 3

  for (let i = 0; i < exercises.length; i += groupSize) {
    groups.push(exercises.slice(i, i + groupSize))
  }

  const getStatusIcon = (order: number) => {
    const status = unlockStatus[order]
    if (!status) return null

    if (status.isCompleted) {
      return <CheckCircle className="w-5 h-5 text-success" />
    }
    if (status.isUnlocked) {
      return <Circle className="w-5 h-5 text-primary" />
    }
    return <Lock className="w-5 h-5 text-muted-foreground" />
  }

  const getCardStyle = (order: number) => {
    const status = unlockStatus[order]
    if (!status) return 'bg-muted opacity-50'

    if (status.isCompleted) {
      return 'bg-success/10 border-success'
    }
    if (status.isUnlocked) {
      return 'border-primary hover:bg-primary/5 cursor-pointer'
    }
    return 'bg-muted/50 opacity-60 cursor-not-allowed'
  }

  return (
    <div className="space-y-8">
      {groups.map((group, groupIdx) => {
        const groupNumber = groupIdx
        const allExercisesUnlocked = group.every(ex => unlockStatus[ex.order]?.isUnlocked)
        const someCompleted = group.some(ex => unlockStatus[ex.order]?.isCompleted)

        return (
          <div key={groupIdx} className="space-y-4">
            {/* Header du groupe */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                  {groupNumber + 1}
                </span>
                Groupe {groupNumber + 1}
              </h3>
              <div className="text-sm text-muted-foreground">
                {group.filter(ex => unlockStatus[ex.order]?.isCompleted).length}/{group.length} complétés
              </div>
            </div>

            {/* Message de déblocage */}
            {!allExercisesUnlocked && groupNumber > 0 && (
              <div className="bg-warning/10 border border-warning rounded-lg p-3 text-sm flex items-start gap-2">
                <Lock className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Groupe verrouillé :</strong> Termine au moins 1 exercice du groupe {groupNumber} pour débloquer ce groupe.
                </span>
              </div>
            )}

            {/* Liste des exercices du groupe */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {group.map((exercise) => {
                const status = unlockStatus[exercise.order]
                const isClickable = status?.isUnlocked

                const CardContent = (
                  <div className={`border rounded-lg p-4 transition-all ${getCardStyle(exercise.order)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(exercise.order)}
                        <span className="font-bold">Ex{exercise.order.toString().padStart(2, '0')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: exercise.difficulty }).map((_, i) => (
                          <div key={i} className="w-1.5 h-3 bg-warning rounded"></div>
                        ))}
                      </div>
                    </div>

                    <h4 className="font-medium mb-2 line-clamp-1">{exercise.title}</h4>
                    <div className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      <MarkdownText>{exercise.description}</MarkdownText>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary font-medium">{exercise.points} XP</span>
                      {status?.isUnlocked && !status?.isCompleted && (
                        <ChevronRight className="w-4 h-4 text-primary" />
                      )}
                      {status?.isCompleted && (
                        <span className="text-success text-xs">✓ Terminé</span>
                      )}
                      {!status?.isUnlocked && (
                        <span className="text-muted-foreground text-xs">🔒 Verrouillé</span>
                      )}
                    </div>
                  </div>
                )

                if (isClickable) {
                  return (
                    <Link key={exercise.id} href={`/exercice/${exercise.id}`}>
                      {CardContent}
                    </Link>
                  )
                }

                return <div key={exercise.id}>{CardContent}</div>
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
