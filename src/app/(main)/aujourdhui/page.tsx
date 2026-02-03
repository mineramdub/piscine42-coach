'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import LessonSection from '@/components/learning/LessonSection'
import TheorySection from '@/components/learning/TheorySection'
import PrepExercisesSection from '@/components/learning/PrepExercisesSection'
import CodeBlock from '@/components/learning/CodeBlock'
import { Loader2 } from 'lucide-react'
import type { Exercise } from '@/types/exercise'
import { TOTAL_DAYS, getCurrentPhase, getProgressPercent } from '@/lib/config/constants'

export default function AujourdhuiPage() {
  const searchParams = useSearchParams()
  const [currentDay, setCurrentDay] = useState(1)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)

  // Charger le jour actuel depuis localStorage ou URL
  useEffect(() => {
    const loadDay = () => {
      setLoading(true)

      // Vérifier si un jour est spécifié dans l'URL (?day=X)
      const dayParam = searchParams.get('day')
      let day: number

      if (dayParam) {
        // Utiliser le jour de l'URL
        day = parseInt(dayParam, 10)
        // Le sauvegarder dans localStorage pour la prochaine fois
        localStorage.setItem('currentDay', day.toString())
      } else {
        // Sinon, charger depuis localStorage
        const savedDay = localStorage.getItem('currentDay')
        day = savedDay ? parseInt(savedDay, 10) : 1
      }

      setCurrentDay(day)

      // Charger les exercices du jour via l'API
      const loadExercises = async () => {
        try {
          const response = await fetch(`/api/exercises/day/${day}`)
          if (response.ok) {
            const data = await response.json()
            setExercises(data.exercises)
          }
        } catch (error) {
          console.error('Error loading exercises:', error)
        } finally {
          setLoading(false)
        }
      }

      loadExercises()
    }

    // Charger au montage
    loadDay()

    // Écouter les changements de jour (quand un exercice est validé)
    const handleDayChanged = (event: Event) => {
      const customEvent = event as CustomEvent
      console.log('Day changed to:', customEvent.detail.day)
      loadDay()
    }

    window.addEventListener('dayChanged', handleDayChanged)

    return () => {
      window.removeEventListener('dayChanged', handleDayChanged)
    }
  }, [searchParams])

  const todayExercise = exercises.find(ex => ex.category === 'c') || exercises[0]
  const progressPercent = getProgressPercent(currentDay)
  const currentPhase = getCurrentPhase(currentDay)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Chargement du jour {currentDay}...</p>
        </div>
      </div>
    )
  }

  if (!todayExercise) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Aucun exercice disponible pour aujourd'hui</h1>
        <p className="text-muted-foreground">Le jour {currentDay} n'a pas encore d'exercices.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">🌊 Aujourd&apos;hui</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Phase {currentPhase.number}: {currentPhase.name}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Jour {currentDay}</div>
            <div className="text-xs text-muted-foreground">
              sur {TOTAL_DAYS} jours
            </div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression globale</span>
            <span className="text-muted-foreground">{progressPercent}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Section Apprentissage */}
      {todayExercise.learningContent && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold">📚 Apprends d'abord</h2>
            <span className="text-sm text-muted-foreground">
              Suis le cours avant de commencer l'exercice
            </span>
          </div>

          {/* Mini-cours interactif */}
          {todayExercise.learningContent.lesson && (
            <LessonSection lesson={todayExercise.learningContent.lesson} />
          )}

          {/* Théorie détaillée */}
          {todayExercise.learningContent.theory && (
            <TheorySection sections={todayExercise.learningContent.theory} />
          )}

          {/* Exercices préparatoires */}
          {todayExercise.learningContent.prepExercises && (
            <PrepExercisesSection exercises={todayExercise.learningContent.prepExercises} />
          )}

          {/* Séparateur */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm font-medium text-muted-foreground px-4">
              Maintenant, passe à l'exercice principal
            </span>
            <div className="flex-1 h-px bg-border"></div>
          </div>
        </div>
      )}

      {/* Mission du jour */}
      <div className="bg-primary/10 border border-primary rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold">🎯 Mission du jour</h2>
        {todayExercise ? (
          <div className="space-y-2">
            <p className="text-lg">
              Aujourd&apos;hui tu dois : <strong>{todayExercise.title}</strong>
            </p>
            <p className="text-muted-foreground">
              {todayExercise.description}
            </p>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                ⏱️ Temps estimé : {todayExercise.estimatedTime} min
              </span>
              <span className="flex items-center gap-1">
                🔥 Difficulté : {todayExercise.difficulty}/5
              </span>
              <span className="flex items-center gap-1">
                ⭐ Points : {todayExercise.points}
              </span>
            </div>
          </div>
        ) : (
          <p>Aucun exercice disponible pour aujourd&apos;hui</p>
        )}
      </div>

      {/* Objectifs d'apprentissage */}
      {todayExercise && todayExercise.learningObjectives && (
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold">📚 Ce que tu vas apprendre</h3>
          <ul className="space-y-2">
            {todayExercise.learningObjectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-success mt-1">✓</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Code starter */}
      {todayExercise && todayExercise.starterCode && (
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold">💻 Code de départ</h3>
          <CodeBlock
            code={todayExercise.starterCode}
            language="c"
            title="Code de départ"
          />
        </div>
      )}

      {/* Hints */}
      {todayExercise && todayExercise.hints && todayExercise.hints.length > 0 && (
        <div className="border border-warning bg-warning/10 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold">💡 Indices</h3>
          <ul className="space-y-2">
            {todayExercise.hints.map((hint, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-warning mt-1">•</span>
                <span>{hint}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tests */}
      {todayExercise && todayExercise.testCases && (
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold">🧪 Tests à valider</h3>
          <div className="space-y-3">
            {todayExercise.testCases
              .filter(test => test.visible)
              .map((test) => (
                <div key={test.id} className="bg-muted p-4 rounded-lg">
                  <p className="font-medium mb-2">{test.description}</p>
                  {test.stdin && (
                    <p className="text-sm text-muted-foreground">
                      Entrée : <code className="bg-background px-2 py-1 rounded">{test.stdin}</code>
                    </p>
                  )}
                  {test.expectedStdout && (
                    <p className="text-sm text-muted-foreground">
                      Sortie attendue : <code className="bg-background px-2 py-1 rounded">{test.expectedStdout}</code>
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        {todayExercise && (
          <a
            href={`/exercice/${todayExercise.id}`}
            className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center"
          >
            Commencer l&apos;exercice
          </a>
        )}
        <button className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors">
          Je suis bloquée 🆘
        </button>
      </div>
    </div>
  )
}
