export type ExerciseCategory = 'c' | 'terminal' | 'git'

export type ExerciseDifficulty = 1 | 2 | 3 | 4 | 5

export interface TestCase {
  id: number
  description: string
  stdin?: string
  expectedStdout?: string
  expectedExitCode?: number
  visible: boolean
  command?: string // Pour exercices terminal/git
  success?: boolean
}

export interface Constraints {
  allowedFunctions?: string[]
  forbiddenFunctions?: string[]
  maxExecutionTime: number
  maxMemory: number
}

export interface Resource {
  title: string
  url: string
}

export interface Exercise {
  id: string
  category: ExerciseCategory
  day: number
  order: number
  title: string
  description: string
  difficulty: ExerciseDifficulty
  points: number
  estimatedTime: number // minutes
  learningObjectives: string[]

  // Code (pour exercices C)
  starterCode?: string
  hints?: string[]
  testCases: TestCase[]
  constraints?: Constraints

  // Terminal/Git
  expectedCommands?: string[]

  relatedExercises: string[]
  resources?: Resource[]
}

export interface ExerciseProgress {
  exerciseId: string
  completed: boolean
  attempts: number
  bestScore: number
  timeSpent: number
  firstTrySuccess: boolean
}

export interface ExerciseSubmission {
  exerciseId: string
  code: string
  language: string
  passed: boolean
  score: number
  testsPassed: number
  testsTotal: number
  feedback?: string
}
