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

export interface LessonStep {
  id: number
  title: string
  content: string // Markdown
  codeExample?: string
  language?: string
  tryItYourself?: {
    instruction: string
    starterCode: string
    solution: string
  }
}

export interface TheorySection {
  title: string
  content: string // Markdown
  codeExamples?: Array<{
    title: string
    code: string
    explanation: string
  }>
  keyPoints: string[]
  commonMistakes?: string[]
}

export interface PrepExercise {
  id: number
  title: string
  instruction: string
  starterCode: string
  solution: string
  hint?: string
  difficulty: 1 | 2 | 3
  testCase?: {
    input: string
    expectedOutput: string
  }
}

export interface LearningContent {
  // Mini-cours interactif
  lesson?: {
    introduction: string
    steps: LessonStep[]
  }

  // Théorie détaillée
  theory?: TheorySection[]

  // Exercices préparatoires
  prepExercises?: PrepExercise[]
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

  // NOUVEAU: Contenu d'apprentissage
  learningContent?: LearningContent

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
