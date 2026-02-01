import { Exercise } from '@/types/exercise'
import fs from 'fs'
import path from 'path'

// Cache des exercices en mémoire (pour performance)
let exercisesCache: Exercise[] | null = null

/**
 * Charge tous les exercices depuis les fichiers JSON
 */
export function loadAllExercises(): Exercise[] {
  // Retourner le cache si déjà chargé
  if (exercisesCache) {
    return exercisesCache
  }

  const exercises: Exercise[] = []
  const dataDir = path.join(process.cwd(), 'src/data/exercises')

  // Fonction récursive pour parcourir les dossiers
  function scanDirectory(dir: string) {
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        scanDirectory(fullPath)
      } else if (item.endsWith('.json')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8')
          const exercise = JSON.parse(content) as Exercise
          exercises.push(exercise)
        } catch (error) {
          console.error(`Erreur lors du chargement de ${fullPath}:`, error)
        }
      }
    }
  }

  // Scanner tous les dossiers
  scanDirectory(dataDir)

  // Trier par catégorie, jour, puis order
  exercises.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category)
    }
    if (a.day !== b.day) {
      return a.day - b.day
    }
    return a.order - b.order
  })

  // Mettre en cache
  exercisesCache = exercises

  return exercises
}

/**
 * Charge un exercice par son ID
 */
export function loadExerciseById(id: string): Exercise | null {
  const exercises = loadAllExercises()
  return exercises.find((ex) => ex.id === id) || null
}

/**
 * Charge les exercices d'une catégorie spécifique
 */
export function loadExercisesByCategory(category: string): Exercise[] {
  const exercises = loadAllExercises()
  return exercises.filter((ex) => ex.category === category)
}

/**
 * Charge les exercices d'un jour spécifique
 */
export function loadExercisesByDay(day: number): Exercise[] {
  const exercises = loadAllExercises()
  return exercises.filter((ex) => ex.day === day)
}

/**
 * Charge l'exercice du jour (basé sur le jour de progression de l'utilisateur)
 */
export function loadDailyExercise(userDay: number): Exercise | null {
  const dayExercises = loadExercisesByDay(userDay)

  // Retourner le premier exercice C du jour (priorité)
  return dayExercises.find((ex) => ex.category === 'c') || dayExercises[0] || null
}

/**
 * Invalider le cache (utile en dev quand on ajoute des exercices)
 */
export function clearExercisesCache() {
  exercisesCache = null
}
