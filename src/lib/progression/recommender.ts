import { loadAllExercises } from '@/lib/exercises/loader'
import prisma from '@/lib/prisma'

/**
 * Recommande des exercices en fonction de la progression de l'utilisateur.
 * Stratégie initiale :
 * - Priorise les exercices "revise" (attemptés mais pas parfaits)
 * - Puis les exercices "new" (jamais tentés)
 * - Complète avec des exercices "practice"
 */

export interface Recommendation {
  exerciseId: string
  title?: string
  reason: 'new' | 'revise' | 'practice'
  points?: number
}

export async function getRecommendationsForUser(userId: string, limit = 6): Promise<Recommendation[]> {
  // Charger métadonnées des exercices depuis les JSON
  const exercises = loadAllExercises()

  // Récupérer complétions de l'utilisateur
  const completions = await prisma.exerciseCompletion.findMany({ where: { userId } })
  const completionMap = new Map(completions.map(c => [c.exerciseId, c]))

  const attemptedButNotPerfect = completions.filter(c => !c.completed || (c.bestScore && c.bestScore < 100))

  // Pools de candidats
  const recommendations: Recommendation[] = []

  // 1) Revisons : attemptedButNotPerfect
  for (const c of attemptedButNotPerfect) {
    if (recommendations.length >= limit) break
    const meta = exercises.find(e => e.id === c.exerciseId)
    recommendations.push({ exerciseId: c.exerciseId, title: meta?.title, reason: 'revise', points: c.bestScore || 0 })
  }

  // 2) Nouveaux : jamais tentés
  const neverTried = exercises.filter(e => !completionMap.has(e.id))
  for (const e of neverTried) {
    if (recommendations.length >= limit) break
    recommendations.push({ exerciseId: e.id, title: e.title, reason: 'new', points: e.points })
  }

  // 3) Compléter avec practice (autres non inclus)
  for (const e of exercises) {
    if (recommendations.length >= limit) break
    if (!recommendations.find(r => r.exerciseId === e.id)) {
      recommendations.push({ exerciseId: e.id, title: e.title, reason: 'practice', points: e.points })
    }
  }

  return recommendations.slice(0, limit)
}
