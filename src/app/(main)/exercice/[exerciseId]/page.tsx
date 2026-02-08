'use client'

import { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CodeEditor from '@/components/exercise/CodeEditor'
import CompletionModal from '@/components/exercise/CompletionModal'
import CodeBlock from '@/components/learning/CodeBlock'
import MarkdownText from '@/components/ui/MarkdownText'
import { Play, ArrowLeft, Lightbulb, CheckCircle, XCircle, Send, Loader2, Eye, EyeOff } from 'lucide-react'
import type { Exercise } from '@/types/exercise'
import { validateExercise } from '@/lib/validation/exercise-validator'

interface TestResult {
  id: number
  passed: boolean
  message: string
}

export default function ExercicePage({
  params,
}: {
  params: Promise<{ exerciseId: string }>
}) {
  const resolvedParams = use(params)
  const router = useRouter()

  // États de chargement
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [nextExerciseId, setNextExerciseId] = useState<string | undefined>()
  const [isLastOfDay, setIsLastOfDay] = useState(false)
  const [loading, setLoading] = useState(true)

  // États de l'exercice
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [allTestsPassed, setAllTestsPassed] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)

  // Charger l'exercice depuis l'API
  useEffect(() => {
    const loadExercise = async () => {
      try {
        const response = await fetch(`/api/exercises/${resolvedParams.exerciseId}`)

        if (!response.ok) {
          throw new Error('Exercise not found')
        }

        const data = await response.json()
        setExercise(data.exercise)
        setNextExerciseId(data.nextExerciseId)
        setIsLastOfDay(data.isLastOfDay)

        // Initialiser le code avec le starterCode
        if (data.exercise.starterCode) {
          setCode(data.exercise.starterCode)
        }
      } catch (error) {
        console.error('Error loading exercise:', error)
      } finally {
        setLoading(false)
      }
    }

    loadExercise()
  }, [resolvedParams.exerciseId])

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '')
    // Reset test results when code changes
    if (testResults.length > 0) {
      setTestResults([])
      setAllTestsPassed(false)
    }
  }

  const handleRunTests = async () => {
    if (!exercise) return

    setIsRunning(true)
    setOutput('🔄 Compilation et exécution des tests...\n')
    setTestResults([])

    // Simulation des tests
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Validation dynamique basée sur l'exercice
    const results: TestResult[] = validateExercise(exercise.id, code)

    setTestResults(results)

    const allPassed = results.every(r => r.passed)
    setAllTestsPassed(allPassed)

    if (allPassed) {
      setOutput('✅ Tous les tests sont passés !\n\nTu peux maintenant soumettre ton exercice.')
    } else {
      const failedCount = results.filter(r => !r.passed).length
      setOutput(`❌ ${failedCount} test(s) échoué(s).\n\nVérifie ton code et réessaye.`)
    }

    setIsRunning(false)
  }

  const handleSubmit = () => {
    if (!allTestsPassed) return

    // Soumettre l'exercice → ouvrir la modal
    setShowCompletionModal(true)
  }

  const handleToggleSolution = () => {
    console.log('Toggle solution clicked', { showSolution, hasSolution: !!exercise?.solution, exercise })
    if (!showSolution && exercise?.solution) {
      console.log('Showing solution:', exercise.solution)
      setCode(exercise.solution)
      setShowSolution(true)
    } else if (exercise?.starterCode) {
      console.log('Hiding solution, showing starter code')
      setCode(exercise.starterCode)
      setShowSolution(false)
    }
  }

  // Écran de chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Chargement de l'exercice...</p>
        </div>
      </div>
    )
  }

  // Exercice non trouvé
  if (!exercise) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Exercice introuvable</h1>
        <button
          onClick={() => router.back()}
          className="text-primary hover:underline"
        >
          Retour
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{exercise.title}</h1>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {exercise.points} XP
                </span>
              </div>
              <MarkdownText className="text-muted-foreground">{exercise.description}</MarkdownText>
            </div>
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Éditeur de code */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">💻 Ton code</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleToggleSolution}
                  disabled={!exercise.solution}
                  className="flex items-center gap-2 bg-warning/10 text-warning border border-warning px-4 py-2 rounded-lg hover:bg-warning/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showSolution ? 'Cacher' : 'Voir la solution'}
                </button>
                <button
                  onClick={handleRunTests}
                  disabled={isRunning || !code}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-4 h-4" />
                  {isRunning ? 'Tests en cours...' : 'Tester'}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!allTestsPassed}
                  className="flex items-center gap-2 bg-success text-success-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Soumettre
                </button>
              </div>
            </div>

            <CodeEditor
              value={code}
              language="c"
              onChange={handleCodeChange}
            />

            {/* Message d'aide */}
            {!allTestsPassed && testResults.length > 0 && (
              <div className="bg-warning/10 border border-warning rounded-lg p-3 text-sm">
                💡 Tous les tests doivent être verts pour pouvoir soumettre l'exercice
              </div>
            )}
          </div>

          {/* Panel latéral (output + tests + infos) */}
          <div className="space-y-4">
            {/* Sortie du programme */}
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-bold">📟 Sortie</h3>
              <CodeBlock
                code={output || 'Clique sur "Tester" pour lancer les tests...'}
                language="bash"
                title="Output"
                showLineNumbers={false}
              />
            </div>

            {/* Résultats des tests */}
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-bold">🧪 Tests ({testResults.filter(t => t.passed).length}/{exercise.testCases.length})</h3>

              {testResults.length === 0 ? (
                // Afficher les tests avant exécution
                <div className="space-y-2">
                  {exercise.testCases
                    .filter(test => test.visible)
                    .map((test) => (
                      <div key={test.id} className="bg-muted p-3 rounded-lg flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{test.description}</p>
                          {test.expectedStdout && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Attendu : <code className="bg-background px-2 py-0.5 rounded">{test.expectedStdout}</code>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                // Afficher les résultats des tests
                <div className="space-y-2">
                  {testResults.map((result) => (
                    <div
                      key={result.id}
                      className={`p-3 rounded-lg flex items-start gap-2 ${
                        result.passed
                          ? 'bg-success/10 border border-success'
                          : 'bg-danger/10 border border-danger'
                      }`}
                    >
                      {result.passed ? (
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-sm">{result.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Indices */}
            {exercise.hints && exercise.hints.length > 0 && (
              <div className="border border-warning bg-warning/10 rounded-lg p-4 space-y-3">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 font-bold w-full text-left"
                >
                  <Lightbulb className="w-5 h-5" />
                  <span>Indices ({exercise.hints.length})</span>
                  <span className="ml-auto text-sm">{showHints ? '▼' : '▶'}</span>
                </button>

                {showHints && (
                  <ul className="space-y-2 pt-2">
                    {exercise.hints.map((hint, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-warning mt-1">•</span>
                        <MarkdownText>{hint}</MarkdownText>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de complétion */}
      <CompletionModal
        isOpen={showCompletionModal}
        exerciseTitle={exercise.title}
        points={exercise.points}
        isLastOfDay={isLastOfDay}
        nextExerciseId={nextExerciseId}
        currentDay={exercise.day}
        exerciseId={exercise.id}
        onClose={() => setShowCompletionModal(false)}
      />
    </>
  )
}
