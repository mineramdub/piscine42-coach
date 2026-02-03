'use client'

import { useState } from 'react'
import { Brain, ChevronDown, ChevronUp, Check, Eye, EyeOff } from 'lucide-react'
import { getReviewsForDay, type Review } from '@/lib/learning/spacedRepetition'
import MarkdownText from '@/components/ui/MarkdownText'

interface ReviewSectionProps {
  currentDay: number
}

export default function ReviewSection({ currentDay }: ReviewSectionProps) {
  const reviews = getReviewsForDay(currentDay)
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set())
  const [completedReviews, setCompletedReviews] = useState<Set<string>>(new Set())
  const [showAnswers, setShowAnswers] = useState<Set<string>>(new Set())

  if (reviews.length === 0) {
    return null // Pas de rappels aujourd'hui
  }

  const toggleExpanded = (conceptId: string) => {
    const newExpanded = new Set(expandedReviews)
    if (newExpanded.has(conceptId)) {
      newExpanded.delete(conceptId)
    } else {
      newExpanded.add(conceptId)
    }
    setExpandedReviews(newExpanded)
  }

  const toggleCompleted = (conceptId: string) => {
    const newCompleted = new Set(completedReviews)
    if (newCompleted.has(conceptId)) {
      newCompleted.delete(conceptId)
    } else {
      newCompleted.add(conceptId)
    }
    setCompletedReviews(newCompleted)
  }

  const toggleAnswer = (conceptId: string) => {
    const newShowAnswers = new Set(showAnswers)
    if (newShowAnswers.has(conceptId)) {
      newShowAnswers.delete(conceptId)
    } else {
      newShowAnswers.add(conceptId)
    }
    setShowAnswers(newShowAnswers)
  }

  const getImportanceColor = (importance: Review['importance']) => {
    if (importance === 'high') return 'border-danger bg-danger/10'
    if (importance === 'medium') return 'border-warning bg-warning/10'
    return 'border-primary bg-primary/10'
  }

  const getImportanceBadge = (importance: Review['importance']) => {
    if (importance === 'high') return '🔥 Prioritaire'
    if (importance === 'medium') return '⚡ Important'
    return '💡 Rappel'
  }

  const getCategoryIcon = (category: string) => {
    if (category === 'c') return '💻'
    if (category === 'terminal') return '⌨️'
    if (category === 'git') return '🌿'
    return '🐛'
  }

  const getDayLabel = (days: number) => {
    if (days === 1) return 'J+1 (hier)'
    if (days === 3) return 'J+3 (il y a 3 jours)'
    if (days === 7) return 'J+7 (il y a 1 semaine)'
    if (days === 14) return 'J+14 (il y a 2 semaines)'
    if (days === 30) return 'J+30 (il y a 1 mois)'
    return `J+${days}`
  }

  return (
    <div className="border rounded-lg p-6 space-y-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-purple-600" />
          <div>
            <h2 className="text-2xl font-bold">🧠 Rappels du jour</h2>
            <p className="text-sm text-muted-foreground">
              Méthode de répétition espacée - {completedReviews.size}/{reviews.length} révisés
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-danger/20 text-danger rounded-full text-xs font-medium">
            {reviews.filter(r => r.importance === 'high').length} prioritaires
          </span>
          <span className="px-3 py-1 bg-warning/20 text-warning rounded-full text-xs font-medium">
            {reviews.filter(r => r.importance === 'medium').length} importants
          </span>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded-lg p-4 text-sm">
        <p className="font-medium mb-1">💡 Pourquoi ces rappels ?</p>
        <p className="text-muted-foreground">
          La répétition espacée (J+1, J+3, J+7, J+14, J+30) est la méthode la plus efficace pour ancrer les
          connaissances sur le long terme. Passe 2-3 minutes sur chaque rappel pour maximiser ta mémoire !
        </p>
      </div>

      {/* Liste des rappels */}
      <div className="space-y-3">
        {reviews.map((review) => {
          const isExpanded = expandedReviews.has(review.concept.id)
          const isCompleted = completedReviews.has(review.concept.id)
          const showAnswer = showAnswers.has(review.concept.id)

          return (
            <div
              key={review.concept.id}
              className={`border rounded-lg transition-all ${
                isCompleted ? 'opacity-70 bg-success/5 border-success' : getImportanceColor(review.importance)
              }`}
            >
              {/* Header du rappel */}
              <div className="p-4 flex items-center justify-between hover:bg-background/50 transition-colors rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  {/* Checkbox de complétion */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleCompleted(review.concept.id)
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleCompleted(review.concept.id)
                      }
                    }}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${
                      isCompleted
                        ? 'bg-success border-success text-success-foreground'
                        : 'border-muted-foreground hover:border-success'
                    }`}
                  >
                    {isCompleted && <Check className="w-4 h-4" />}
                  </div>

                  {/* Contenu du rappel - cliquable pour expand */}
                  <button
                    onClick={() => toggleExpanded(review.concept.id)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <span className="text-xl">{getCategoryIcon(review.concept.category)}</span>

                    <div className="flex-1">
                      <h3 className="font-bold">{review.concept.name}</h3>
                      <p className="text-sm text-muted-foreground">{review.concept.shortDescription}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-background rounded-full">
                        {getDayLabel(review.daysSinceIntroduction)}
                      </span>
                      <span className="text-xs font-medium">
                        {getImportanceBadge(review.importance)}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Chevron expand/collapse */}
                <button
                  onClick={() => toggleExpanded(review.concept.id)}
                  className="ml-3 flex-shrink-0 p-1 hover:bg-muted rounded transition-colors"
                  aria-label={isExpanded ? 'Replier' : 'Déplier'}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Contenu déployé */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-4 border-t">
                  {/* Points clés */}
                  <div className="pt-4">
                    <h4 className="font-medium mb-2 text-sm">Points clés à retenir :</h4>
                    <ul className="space-y-1">
                      {review.concept.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-success mt-0.5">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick review si disponible */}
                  {review.concept.quickReview && (
                    <div className="bg-background border rounded-lg p-4 space-y-3">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <span>💪</span>
                        <span>Mini-exercice de rappel (2-3 min)</span>
                      </h4>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">{review.concept.quickReview.question}</p>

                        <button
                          onClick={() => toggleAnswer(review.concept.id)}
                          className="flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          {showAnswer ? (
                            <>
                              <EyeOff className="w-4 h-4" />
                              Cacher la réponse
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4" />
                              Voir l'indice
                            </>
                          )}
                        </button>

                        {showAnswer && (
                          <div className="space-y-2 mt-3">
                            <div className="bg-warning/10 border border-warning rounded p-3 text-sm">
                              <p className="font-medium text-warning mb-1">💡 Indice :</p>
                              <MarkdownText>{review.concept.quickReview.hint}</MarkdownText>
                            </div>

                            <div className="bg-success/10 border border-success rounded p-3 text-sm">
                              <p className="font-medium text-success mb-1">✓ Réponse :</p>
                              <code className="font-mono">{review.concept.quickReview.answer}</code>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer avec stats */}
      <div className="pt-4 border-t text-sm text-muted-foreground text-center">
        <p>
          📅 Prochaines révisions programmées selon la méthode espacée :{' '}
          <strong>J+1, J+3, J+7, J+14, J+30</strong>
        </p>
      </div>
    </div>
  )
}
