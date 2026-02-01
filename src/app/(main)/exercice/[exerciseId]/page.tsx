'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import CodeEditor from '@/components/exercise/CodeEditor'
import { Play, ArrowLeft, Lightbulb } from 'lucide-react'

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
      }
    ]
  }
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

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput('Compilation et exécution...\n')

    // TODO: Appeler l'API Piston pour vraiment exécuter le code
    // Pour l'instant, simulation
    setTimeout(() => {
      setOutput('Hello, World!\n\n✅ Test réussi !')
      setIsRunning(false)
    }, 1500)
  }

  return (
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
            <h1 className="text-3xl font-bold">{exercise.title}</h1>
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
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Exécution...' : 'Exécuter'}
            </button>
          </div>

          <CodeEditor
            defaultValue={exercise.starterCode}
            language="c"
            onChange={setCode}
          />
        </div>

        {/* Panel latéral (sortie + infos) */}
        <div className="space-y-4">
          {/* Sortie du programme */}
          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="font-bold">📟 Sortie</h3>
            <pre className="bg-muted p-4 rounded-lg min-h-[200px] font-mono text-sm whitespace-pre-wrap">
              {output || 'Clique sur "Exécuter" pour tester ton code...'}
            </pre>
          </div>

          {/* Tests */}
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-bold">🧪 Tests</h3>
            {exercise.testCases
              .filter(test => test.visible)
              .map((test) => (
                <div key={test.id} className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-medium">{test.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Attendu : <code className="bg-background px-2 py-0.5 rounded">{test.expectedStdout}</code>
                  </p>
                </div>
              ))}
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
                    <span className="text-warning">•</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
