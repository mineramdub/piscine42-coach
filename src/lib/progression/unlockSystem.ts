/**
 * Système de déblocage par groupes de 3 exercices
 */

export interface UnlockStatus {
  exerciseId: string
  isUnlocked: boolean
  isCompleted: boolean
  groupNumber: number // Groupe 0, 1, 2, etc.
}

export interface DayProgress {
  day: number
  exercisesCompleted: number[]
  currentGroup: number
}

/**
 * Calcule le statut de déblocage pour tous les exercices d'un jour
 * Règle : TOUS LES EXERCICES SONT DÉBLOQUÉS DIRECTEMENT
 */
export function calculateUnlockStatus(
  totalExercises: number,
  completedExercises: number[]
): UnlockStatus[] {
  const status: UnlockStatus[] = []
  const groupSize = 3

  for (let i = 0; i < totalExercises; i++) {
    const groupNumber = Math.floor(i / groupSize)
    const isCompleted = completedExercises.includes(i)

    // Tous les exercices sont débloqués
    const isUnlocked = true

    status.push({
      exerciseId: `ex${i.toString().padStart(2, '0')}`,
      isUnlocked,
      isCompleted,
      groupNumber,
    })
  }

  return status
}

/**
 * Détermine si un exercice spécifique est débloqué
 * Tous les exercices sont débloqués directement
 */
export function isExerciseUnlocked(
  exerciseOrder: number,
  completedExercises: number[]
): boolean {
  // Tous les exercices sont débloqués
  return true
}

/**
 * Retourne le numéro du prochain groupe à débloquer
 */
export function getNextGroupToUnlock(
  totalExercises: number,
  completedExercises: number[]
): number {
  const status = calculateUnlockStatus(totalExercises, completedExercises)

  // Trouve le premier groupe qui n'est pas entièrement débloqué
  const groups = Math.ceil(totalExercises / 3)

  for (let g = 0; g < groups; g++) {
    const groupExercises = status.filter(s => s.groupNumber === g)
    const allUnlocked = groupExercises.every(s => s.isUnlocked)

    if (!allUnlocked) {
      return g
    }
  }

  return groups - 1
}

/**
 * Simule la progression de l'utilisateur (pour l'instant, données mockées)
 * Plus tard, ça viendra de la DB
 */
export function getUserProgress(day: number): DayProgress {
  // Mock data - en production, ça viendrait de la DB
  return {
    day,
    exercisesCompleted: [0], // Exercice 0 complété
    currentGroup: 0,
  }
}
