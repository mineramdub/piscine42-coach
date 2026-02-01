'use client'

import { useState } from 'react'
import { Dumbbell, Check, X, Eye, EyeOff } from 'lucide-react'
import type { PrepExercise } from '@/types/exercise'
import CodeEditor from '@/components/exercise/CodeEditor'

interface PrepExercisesSectionProps {
  exercises: PrepExercise[]
}

export default function PrepExercisesSection({ exercises }: PrepExercisesSectionProps) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [code, setCode] = useState(exercises[0].starterCode)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [completed, setCompleted] = useState<number[]>([])

  const exercise = exercises[currentExercise]
  const isCompleted = completed.includes(exercise.id)

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '')
  }

  const handleCheckSolution = () => {
    // Simulation simple : on vérifie si le code contient la solution
    if (code.trim() === exercise.solution.trim()) {
      if (!completed.includes(exercise.id)) {
        setCompleted([...completed, exercise.id])
      }
    }
  }

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setCode(exercises[currentExercise + 1].starterCode)
      setShowHint(false)
      setShowSolution(false)
    }
  }

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
      setCode(exercises[currentExercise - 1].starterCode)
      setShowHint(false)
      setShowSolution(false)
    }
  }

  const getDifficultyColor = (diff: number) => {
    if (diff === 1) return 'text-success'
    if (diff === 2) return 'text-warning'
    return 'text-danger'
  }

  return (
    <div className="border rounded-lg p-6 space-y-6 bg-warning/5 border-warning">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Dumbbell className="w-6 h-6 text-warning" />
          <h2 className="text-2xl font-bold">💪 Exercices préparatoires</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          {completed.length}/{exercises.length} complétés
        </div>
      </div>

      {/* Progression */}
      <div className="flex gap-2">
        {exercises.map((ex, idx) => (
          <button
            key={ex.id}
            onClick={() => {
              setCurrentExercise(idx)
              setCode(ex.starterCode)
              setShowHint(false)
              setShowSolution(false)
            }}
            className={`flex-1 h-10 rounded-lg font-medium text-sm transition-all ${
              idx === currentExercise
                ? 'bg-warning text-warning-foreground'
                : completed.includes(ex.id)
                ? 'bg-success text-success-foreground'
                : 'bg-muted hover:bg-muted/70'
            }`}
          >
            {idx + 1}
            {completed.includes(ex.id) && (
              <Check className="w-4 h-4 inline ml-1" />
            )}
          </button>
        ))}
      </div>

      {/* Exercice actuel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{exercise.title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Difficulté:</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-4 rounded ${
                    level <= exercise.difficulty
                      ? getDifficultyColor(exercise.difficulty) + ' bg-current'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground">{exercise.instruction}</p>

        {/* Test case */}
        {exercise.testCase && (
          <div className="bg-muted rounded-lg p-3 text-sm">
            <p className="font-medium mb-2">Test attendu :</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-muted-foreground">Entrée:</span>
                <code className="ml-2 bg-background px-2 py-1 rounded">
                  {exercise.testCase.input || '(aucune)'}
                </code>
              </div>
              <div>
                <span className="text-muted-foreground">Sortie:</span>
                <code className="ml-2 bg-background px-2 py-1 rounded">
                  {exercise.testCase.expectedOutput}
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Éditeur */}
        <CodeEditor
          defaultValue={exercise.starterCode}
          language="c"
          onChange={handleCodeChange}
        />

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleCheckSolution}
            className="px-4 py-2 bg-warning text-warning-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Vérifier
          </button>

          {exercise.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
            >
              {showHint ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showHint ? 'Cacher' : 'Voir'} l'indice
            </button>
          )}

          <button
            onClick={() => setShowSolution(!showSolution)}
            className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
          >
            {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showSolution ? 'Cacher' : 'Voir'} la solution
          </button>
        </div>

        {/* Hint */}
        {showHint && exercise.hint && (
          <div className="bg-primary/10 border border-primary rounded-lg p-4">
            <p className="text-sm">💡 {exercise.hint}</p>
          </div>
        )}

        {/* Solution */}
        {showSolution && (
          <div className="bg-success/10 border border-success rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-success">Solution :</p>
            <pre className="font-mono text-sm overflow-x-auto bg-background p-3 rounded">
              <code>{exercise.solution}</code>
            </pre>
          </div>
        )}

        {/* État de complétion */}
        {isCompleted && (
          <div className="bg-success/10 border border-success rounded-lg p-4 flex items-center gap-2">
            <Check className="w-5 h-5 text-success" />
            <span className="font-medium text-success">Exercice validé !</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t">
        <button
          onClick={handlePrevious}
          disabled={currentExercise === 0}
          className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>

        <div className="text-sm text-muted-foreground">
          Exercice {currentExercise + 1}/{exercises.length}
        </div>

        <button
          onClick={handleNext}
          disabled={currentExercise === exercises.length - 1}
          className="px-4 py-2 bg-warning text-warning-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant
        </button>
      </div>
    </div>
  )
}
