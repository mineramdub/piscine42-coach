'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import CodeEditor from '@/components/exercise/CodeEditor'
import CompletionModal from '@/components/exercise/CompletionModal'
import { Play, ArrowLeft, Lightbulb, CheckCircle, XCircle, Send } from 'lucide-react'

// Pour l'instant, on charge les exercices côté client
// Plus tard on pourra faire un fetch API
const exercisesData = {
  'c-day01-ex00-hello': {
    id: 'c-day01-ex00-hello',
    title: 'Hello World',
    description: 'Écris un programme C qui affiche \'Hello, World!\' suivi d\'un retour à la ligne.',
    starterCode: '#include <stdio.h>\n\nint main(void)\n{\n\t// Ton code ici\n\treturn (0);\n}',
    hints: [
      'Utilise la fonction printf() pour afficher du texte',
      'N\'oublie pas le \\n pour le retour à la ligne',
      'La fonction main() doit retourner 0'
    ],
    testCases: [
      {
        id: 1,
        description: 'Affiche \'Hello, World!\'',
        expectedStdout: 'Hello, World!\n',
        visible: true
      },
      {
        id: 2,
        description: 'Code compile sans erreur',
        expectedStdout: '',
        visible: true
      },
      {
        id: 3,
        description: 'Return code = 0',
        expectedStdout: '',
        visible: true
      }
    ],
    points: 10,
    day: 1,
    order: 0,
  }
}

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
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [allTestsPassed, setAllTestsPassed] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)

  // Charger l'exercice (simplifié pour l'instant)
  const exercise = exercisesData[resolvedParams.exerciseId as keyof typeof exercisesData]

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

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '')
    // Reset test results when code changes
    if (testResults.length > 0) {
      setTestResults([])
      setAllTestsPassed(false)
    }
  }

  const handleRunTests = async () => {
    setIsRunning(true)
    setOutput('🔄 Compilation et exécution des tests...\n')
    setTestResults([])

    // Simulation des tests
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Check si le code contient printf("Hello, World!\n")
    const hasCorrectPrintf = code.includes('printf("Hello, World!\\n")')
    const hasInclude = code.includes('#include <stdio.h>')
    const hasReturn = code.includes('return (0)')

    const results: TestResult[] = [
      {
        id: 1,
        passed: hasCorrectPrintf,
        message: hasCorrectPrintf ? 'Affiche correctement "Hello, World!"' : 'Le texte affiché n\'est pas correct'
      },
      {
        id: 2,
        passed: hasInclude,
        message: hasInclude ? 'Compilation réussie' : 'Erreur de compilation : include manquant'
      },
      {
        id: 3,
        passed: hasReturn,
        message: hasReturn ? 'Return code correct (0)' : 'Return code incorrect'
      }
    ]

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

  const getNextExercise = () => {
    // Pour l'instant, pas d'exercice suivant (c'est le seul)
    return undefined
  }

  const isLastOfDay = exercise.order === 2 // Simulation : 3 exercices par jour, order 0-2

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
              <p className="text-muted-foreground">{exercise.description}</p>
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
              defaultValue={exercise.starterCode}
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
              <pre className="bg-muted p-4 rounded-lg min-h-[120px] font-mono text-sm whitespace-pre-wrap">
                {output || 'Clique sur "Tester" pour lancer les tests...'}
              </pre>
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
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de complétion */}
      <CompletionModal
        isOpen={showCompletionModal}
        exerciseTitle={exercise.title}
        points={exercise.points}
        isLastOfDay={isLastOfDay}
        nextExerciseId={getNextExercise()}
        currentDay={exercise.day}
        onClose={() => setShowCompletionModal(false)}
      />
    </>
  )
}
