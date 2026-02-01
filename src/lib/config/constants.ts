/**
 * Configuration globale de l'application
 */

// Nombre total de jours du programme (extensible au-delà de 30)
export const TOTAL_DAYS = 90 // 90 jours = 3 mois complets

// Phases du programme
export const PHASES = {
  1: { name: 'Survie', days: [1, 10], color: 'danger' },
  2: { name: 'Autonomie', days: [11, 30], color: 'warning' },
  3: { name: 'Piscine réelle', days: [31, 45], color: 'primary' },
  4: { name: 'Approfondissement', days: [46, 60], color: 'success' },
  5: { name: 'Expertise', days: [61, 90], color: 'purple' },
} as const

// Intervalles de répétition espacée
export const REVIEW_INTERVALS = [1, 3, 7, 14, 30] as const

// Points XP
export const XP_CONFIG = {
  easy: 5,
  medium: 10,
  hard: 15,
  expert: 25,
} as const

/**
 * Obtient la phase actuelle basée sur le jour
 */
export function getCurrentPhase(day: number): {
  number: number
  name: string
  color: string
} {
  for (const [phaseNum, phase] of Object.entries(PHASES)) {
    if (day >= phase.days[0] && day <= phase.days[1]) {
      return {
        number: parseInt(phaseNum),
        name: phase.name,
        color: phase.color,
      }
    }
  }

  // Si au-delà des phases définies, retourner la dernière
  return {
    number: 5,
    name: 'Expertise',
    color: 'purple',
  }
}

/**
 * Calcule le pourcentage de progression
 */
export function getProgressPercent(currentDay: number): number {
  return Math.min(Math.round((currentDay / TOTAL_DAYS) * 100), 100)
}
