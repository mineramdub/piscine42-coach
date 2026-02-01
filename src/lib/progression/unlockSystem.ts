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
 * Règle : Les exercices sont débloqués par groupes de 3
 * - Groupe 0 (ex 0-2) : débloqué par défaut
 * - Groupe 1 (ex 3-5) : débloqué quand 1+ exercice du groupe 0 est complété
 * - Groupe 2 (ex 6-8) : débloqué quand 1+ exercice du groupe 1 est complété
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

    let isUnlocked = false

    if (groupNumber === 0) {
      // Premier groupe : toujours débloqué
      isUnlocked = true
    } else {
      // Groupes suivants : débloqués si au moins 1 exercice du groupe précédent est complété
      const previousGroupStart = (groupNumber - 1) * groupSize
      const previousGroupEnd = previousGroupStart + groupSize
      const previousGroupExercises = Array.from(
        { length: groupSize },
        (_, idx) => previousGroupStart + idx
      ).filter(idx => idx < totalExercises)

      // Vérifie si au moins 1 exercice du groupe précédent est complété
      isUnlocked = previousGroupExercises.some(idx =>
        completedExercises.includes(idx)
      )
    }

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
 */
export function isExerciseUnlocked(
  exerciseOrder: number,
  completedExercises: number[]
): boolean {
  const groupNumber = Math.floor(exerciseOrder / 3)

  if (groupNumber === 0) {
    return true
  }

  const previousGroupStart = (groupNumber - 1) * 3
  const previousGroupEnd = previousGroupStart + 3

  // Au moins 1 exercice du groupe précédent doit être complété
  for (let i = previousGroupStart; i < previousGroupEnd; i++) {
    if (completedExercises.includes(i)) {
      return true
    }
  }

  return false
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
