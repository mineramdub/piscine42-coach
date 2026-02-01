'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import LessonSection from '@/components/learning/LessonSection'
import TheorySection from '@/components/learning/TheorySection'
import PrepExercisesSection from '@/components/learning/PrepExercisesSection'
import { Loader2, Terminal as TerminalIcon, BookOpen } from 'lucide-react'
import type { Exercise } from '@/types/exercise'

export default function TerminalPage() {
  const searchParams = useSearchParams()
  const [currentLevel, setCurrentLevel] = useState(1)
  const [lessons, setLessons] = useState<Exercise[]>([])
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  // Charger le niveau actuel
  useEffect(() => {
    const loadLevel = () => {
      setLoading(true)

      // Vérifier si un niveau est spécifié dans l'URL
      const levelParam = searchParams.get('level')
      let level: number

      if (levelParam) {
        level = parseInt(levelParam, 10)
        localStorage.setItem('terminalLevel', level.toString())
      } else {
        const savedLevel = localStorage.getItem('terminalLevel')
        level = savedLevel ? parseInt(savedLevel, 10) : 1
      }

      setCurrentLevel(level)

      // Charger les leçons du niveau
      const loadLessons = async () => {
        try {
          const response = await fetch(`/api/exercises/terminal/${level}`)
          if (response.ok) {
            const data = await response.json()
            setLessons(data.exercises)
          }
        } catch (error) {
          console.error('Error loading terminal lessons:', error)
        } finally {
          setLoading(false)
        }
      }

      loadLessons()
    }

    loadLevel()
  }, [searchParams])

  const currentLesson = lessons[currentLessonIndex]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Chargement du niveau {currentLevel}...</p>
        </div>
      </div>
    )
  }

  if (!currentLesson) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Aucune leçon disponible pour ce niveau</h1>
        <p className="text-muted-foreground">Le niveau {currentLevel} n'a pas encore de leçons.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <TerminalIcon className="w-10 h-10" />
              💻 Terminal
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Niveau {currentLevel} - Maîtrise de la ligne de commande
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {currentLessonIndex + 1}/{lessons.length}
            </div>
            <div className="text-xs text-muted-foreground">Leçons</div>
          </div>
        </div>

        {/* Sélection de leçon */}
        {lessons.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {lessons.map((lesson, idx) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLessonIndex(idx)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  idx === currentLessonIndex
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/70'
                }`}
              >
                {idx + 1}. {lesson.title}
              </button>
            ))}
          </div>
        )}

        {/* Barre de progression */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression du niveau</span>
            <span className="text-muted-foreground">
              {Math.round(((currentLessonIndex + 1) / lessons.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${((currentLessonIndex + 1) / lessons.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Leçon actuelle */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
        </div>
        <p className="text-muted-foreground">{currentLesson.description}</p>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1">
            ⏱️ {currentLesson.estimatedTime} min
          </span>
          <span className="flex items-center gap-1">
            🔥 Difficulté : {currentLesson.difficulty}/5
          </span>
          <span className="flex items-center gap-1">
            ⭐ {currentLesson.points} points
          </span>
        </div>
      </div>

      {/* Contenu d'apprentissage */}
      {currentLesson.learningContent && (
        <div className="space-y-6">
          {/* Mini-cours interactif */}
          {currentLesson.learningContent.lesson && (
            <LessonSection lesson={currentLesson.learningContent.lesson} />
          )}

          {/* Théorie détaillée */}
          {currentLesson.learningContent.theory && (
            <TheorySection sections={currentLesson.learningContent.theory} />
          )}

          {/* Exercices préparatoires */}
          {currentLesson.learningContent.prepExercises && (
            <PrepExercisesSection exercises={currentLesson.learningContent.prepExercises} />
          )}
        </div>
      )}

      {/* Objectifs d'apprentissage */}
      {currentLesson.learningObjectives && currentLesson.learningObjectives.length > 0 && (
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold">📚 Ce que tu vas apprendre</h3>
          <ul className="space-y-2">
            {currentLesson.learningObjectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-success mt-1">✓</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t">
        <button
          onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
          disabled={currentLessonIndex === 0}
          className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Leçon précédente
        </button>

        <div className="text-sm text-muted-foreground">
          Leçon {currentLessonIndex + 1} sur {lessons.length}
        </div>

        <button
          onClick={() =>
            setCurrentLessonIndex(Math.min(lessons.length - 1, currentLessonIndex + 1))
          }
          disabled={currentLessonIndex === lessons.length - 1}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Leçon suivante →
        </button>
      </div>

      {/* Changement de niveau */}
      <div className="border-t pt-6">
        <h3 className="font-bold mb-3">📊 Autres niveaux</h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <a
              key={level}
              href={`/terminal?level=${level}`}
              onClick={() => localStorage.setItem('terminalLevel', level.toString())}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                level === currentLevel
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/70'
              }`}
            >
              Niveau {level}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
