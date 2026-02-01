'use client'

import { Trophy, Star, ChevronRight, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CompletionModalProps {
  isOpen: boolean
  exerciseTitle: string
  points: number
  isLastOfDay: boolean
  nextExerciseId?: string
  currentDay: number
  onClose: () => void
}

export default function CompletionModal({
  isOpen,
  exerciseTitle,
  points,
  isLastOfDay,
  nextExerciseId,
  currentDay,
  onClose,
}: CompletionModalProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleNext = () => {
    // Si c'est le dernier exercice du jour, incrémenter le jour
    if (isLastOfDay) {
      const savedDay = localStorage.getItem('currentDay')
      const currentDayNumber = savedDay ? parseInt(savedDay, 10) : currentDay
      const nextDay = currentDayNumber + 1
      localStorage.setItem('currentDay', nextDay.toString())

      // Rediriger vers la page Aujourd'hui avec le nouveau jour
      router.push(`/aujourdhui?day=${nextDay}`)
    } else {
      // Sinon, retourner à la page Aujourd'hui sans changer de jour
      router.push('/aujourdhui')
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background border rounded-lg max-w-lg w-full p-8 space-y-6 animate-in fade-in zoom-in duration-300">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-success" />
          </div>
        </div>

        {/* Titre */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">
            {isLastOfDay ? '🎉 Jour terminé !' : '✅ Exercice validé !'}
          </h2>
          <p className="text-lg text-muted-foreground">{exerciseTitle}</p>
        </div>

        {/* XP gagné */}
        <div className="bg-primary/10 border border-primary rounded-lg p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold text-primary">+{points} XP</span>
          </div>
          <p className="text-sm text-muted-foreground">Points gagnés</p>
        </div>

        {/* Message */}
        <div className="bg-success/10 border border-success rounded-lg p-4 text-center">
          {isLastOfDay ? (
            <>
              <p className="font-medium text-success mb-1">
                Tous les exercices du jour {currentDay} sont terminés !
              </p>
              <p className="text-sm text-muted-foreground">
                Le jour {currentDay + 1} est maintenant débloqué 🔓
              </p>
            </>
          ) : (
            <>
              <p className="font-medium text-success mb-1">
                Exercice validé avec succès !
              </p>
              <p className="text-sm text-muted-foreground">
                Tu vas découvrir le cours du prochain exercice 📚
              </p>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={handleNext}
            className="w-full bg-success text-success-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {isLastOfDay ? (
              <>
                <Home className="w-5 h-5" />
                Découvrir le jour {currentDay + 1}
              </>
            ) : (
              <>
                Continuer
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Rester ici
          </button>
        </div>

        {/* Stats (optionnel) */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t text-center">
          <div>
            <p className="text-2xl font-bold">3/9</p>
            <p className="text-xs text-muted-foreground">Exercices jour {currentDay}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">1</p>
            <p className="text-xs text-muted-foreground">Tentative</p>
          </div>
          <div>
            <p className="text-2xl font-bold">100%</p>
            <p className="text-xs text-muted-foreground">Score</p>
          </div>
        </div>
      </div>
    </div>
  )
}
