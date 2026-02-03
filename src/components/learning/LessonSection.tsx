'use client'

import { useState, useEffect } from 'react'
import { BookOpen, ChevronRight, Code, Play } from 'lucide-react'
import type { LearningContent } from '@/types/exercise'
import CodeEditor from '@/components/exercise/CodeEditor'
import CodeBlock from '@/components/learning/CodeBlock'
import MarkdownText from '@/components/ui/MarkdownText'
import { useLearning } from '@/contexts/LearningContext'

interface LessonSectionProps {
  lesson: NonNullable<LearningContent['lesson']>
}

export default function LessonSection({ lesson }: LessonSectionProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [tryItCode, setTryItCode] = useState('')
  const [showSolution, setShowSolution] = useState(false)
  const { setCurrentSection } = useLearning()

  const step = lesson.steps[currentStep]
  const isLastStep = currentStep === lesson.steps.length - 1

  // Met à jour le contexte quand l'étape change
  useEffect(() => {
    setCurrentSection({
      type: 'lesson',
      title: step.title,
      content: step.content + (step.codeExample ? `\n\nExemple de code:\n${step.codeExample}` : ''),
      stepNumber: step.id,
    })
  }, [currentStep, step, setCurrentSection])

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1)
      setTryItCode('')
      setShowSolution(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setTryItCode('')
      setShowSolution(false)
    }
  }

  return (
    <div className="border rounded-lg p-6 space-y-6 bg-primary/5 border-primary">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">📖 Mini-cours interactif</h2>
      </div>

      {/* Introduction (visible seulement sur step 0) */}
      {currentStep === 0 && (
        <div className="bg-background border rounded-lg p-4">
          <MarkdownText className="text-muted-foreground">{lesson.introduction}</MarkdownText>
        </div>
      )}

      {/* Progression */}
      <div className="flex items-center gap-2">
        {lesson.steps.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 flex-1 rounded-full transition-all ${
              idx <= currentStep ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Step actuel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              {step.id}
            </span>
            {step.title}
          </h3>
          <span className="text-sm text-muted-foreground">
            Étape {currentStep + 1}/{lesson.steps.length}
          </span>
        </div>

        {/* Contenu */}
        <MarkdownText>{step.content}</MarkdownText>

        {/* Exemple de code */}
        {step.codeExample && (
          <CodeBlock
            code={step.codeExample}
            language={step.language || 'c'}
            title="Exemple"
            showLineNumbers={false}
          />
        )}

        {/* Try It Yourself */}
        {step.tryItYourself && (
          <div className="border border-success rounded-lg p-4 space-y-3 bg-success/5">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-success" />
              <h4 className="font-bold text-success">À toi d'essayer !</h4>
            </div>
            <p className="text-sm">{step.tryItYourself.instruction}</p>

            <CodeEditor
              defaultValue={step.tryItYourself.starterCode}
              language={step.language || 'c'}
              onChange={(value) => setTryItCode(value || '')}
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors text-sm"
              >
                {showSolution ? 'Cacher' : 'Voir'} la solution
              </button>
            </div>

            {showSolution && (
              <CodeBlock
                code={step.tryItYourself.solution}
                language={step.language || 'c'}
                title="Solution"
              />
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>

        <button
          onClick={handleNext}
          disabled={isLastStep}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLastStep ? 'Terminé' : 'Suivant'}
          {!isLastStep && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
