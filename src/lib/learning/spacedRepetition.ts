import { concepts, type Concept } from './concepts'

/**
 * Intervalles de répétition espacée (en jours)
 * J+1, J+3, J+7, J+14, J+30
 */
export const REVIEW_INTERVALS = [1, 3, 7, 14, 30]

/**
 * Représente un rappel à faire
 */
export interface Review {
  concept: Concept
  reviewNumber: number // 1ère révision, 2ème, etc.
  daysSinceIntroduction: number
  importance: 'high' | 'medium' | 'low'
}

/**
 * Calcule tous les rappels à faire pour un jour donné
 *
 * @param currentDay Le jour actuel (1-90+)
 * @returns Liste des concepts à réviser ce jour
 */
export function getReviewsForDay(currentDay: number): Review[] {
  const reviews: Review[] = []

  // Pour chaque concept
  Object.values(concepts).forEach((concept) => {
    const introDay = concept.introducedOnDay

    // Le concept n'a pas encore été vu
    if (introDay > currentDay) {
      return
    }

    // Nombre de jours depuis l'introduction
    const daysSince = currentDay - introDay

    // Vérifie si c'est un jour de révision
    REVIEW_INTERVALS.forEach((interval, index) => {
      if (daysSince === interval) {
        const importance = getImportance(index)
        reviews.push({
          concept,
          reviewNumber: index + 1,
          daysSinceIntroduction: daysSince,
          importance,
        })
      }
    })
  })

  // Trier par importance (high → medium → low)
  return reviews.sort((a, b) => {
    const importanceOrder = { high: 0, medium: 1, low: 2 }
    return importanceOrder[a.importance] - importanceOrder[b.importance]
  })
}

/**
 * Détermine l'importance d'un rappel selon son numéro
 * - 1ère et 2ème révision (J+1, J+3) : HIGH (consolidation initiale)
 * - 3ème révision (J+7) : MEDIUM
 * - 4ème et 5ème (J+14, J+30) : LOW (déjà bien ancré)
 */
function getImportance(reviewNumber: number): Review['importance'] {
  if (reviewNumber <= 1) return 'high' // J+1, J+3
  if (reviewNumber === 2) return 'medium' // J+7
  return 'low' // J+14, J+30
}

/**
 * Calcule le prochain jour de révision pour un concept
 */
export function getNextReviewDay(introducedDay: number, currentReviewNumber: number): number | null {
  const nextInterval = REVIEW_INTERVALS[currentReviewNumber]
  if (!nextInterval) return null // Plus de révisions programmées

  return introducedDay + nextInterval
}

/**
 * Obtient des statistiques sur les révisions pour un jour
 */
export function getReviewStats(currentDay: number) {
  const reviews = getReviewsForDay(currentDay)

  return {
    total: reviews.length,
    high: reviews.filter(r => r.importance === 'high').length,
    medium: reviews.filter(r => r.importance === 'medium').length,
    low: reviews.filter(r => r.importance === 'low').length,
    byCategory: {
      c: reviews.filter(r => r.concept.category === 'c').length,
      terminal: reviews.filter(r => r.concept.category === 'terminal').length,
      git: reviews.filter(r => r.concept.category === 'git').length,
      debug: reviews.filter(r => r.concept.category === 'debug').length,
    },
  }
}

/**
 * Vérifie si un concept doit être révisé aujourd'hui
 */
export function shouldReviewToday(conceptId: string, currentDay: number): boolean {
  const reviews = getReviewsForDay(currentDay)
  return reviews.some(r => r.concept.id === conceptId)
}

/**
 * Calcule le planning de révision complet pour un concept
 * Retourne tous les jours où ce concept sera revu
 */
export function getReviewSchedule(conceptId: string): number[] {
  const concept = concepts[conceptId]
  if (!concept) return []

  const schedule: number[] = []
  REVIEW_INTERVALS.forEach(interval => {
    schedule.push(concept.introducedOnDay + interval)
  })

  return schedule
}
