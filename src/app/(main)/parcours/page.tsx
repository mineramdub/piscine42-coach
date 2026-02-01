'use client'

import { Check, Lock, Play } from 'lucide-react'
import Link from 'next/link'
import { TOTAL_DAYS, PHASES } from '@/lib/config/constants'

export default function ParcoursPage() {
  // Données mockées pour le parcours
  const currentDay = 1

  const roadmap = [
    // Phase 1 : Survie (Jours 1-10)
    {
      phase: 1,
      title: 'Phase 1 : Survie',
      description: 'Les bases essentielles pour démarrer la Piscine',
      color: 'primary',
      days: [
        { day: 1, title: 'Hello World & Variables', exercises: 3, completed: 3, status: 'completed' },
        { day: 2, title: 'Conditions & Boucles', exercises: 4, completed: 2, status: 'in_progress' },
        { day: 3, title: 'Strings & Arrays', exercises: 5, completed: 0, status: 'locked' },
        { day: 4, title: 'Pointeurs (intro)', exercises: 4, completed: 0, status: 'locked' },
        { day: 5, title: 'Fonctions', exercises: 5, completed: 0, status: 'locked' },
        { day: 6, title: 'Terminal basics', exercises: 6, completed: 0, status: 'locked' },
        { day: 7, title: 'Git basics', exercises: 5, completed: 0, status: 'locked' },
        { day: 8, title: 'Récursivité', exercises: 4, completed: 0, status: 'locked' },
        { day: 9, title: 'Strings avancé', exercises: 5, completed: 0, status: 'locked' },
        { day: 10, title: 'Révision Phase 1', exercises: 8, completed: 0, status: 'locked' },
      ],
    },
    // Phase 2 : Autonomie (Jours 11-20)
    {
      phase: 2,
      title: 'Phase 2 : Autonomie',
      description: 'Devenir indépendant et gérer les erreurs',
      color: 'success',
      days: [
        { day: 11, title: 'Pointeurs avancés', exercises: 5, completed: 0, status: 'locked' },
        { day: 12, title: 'Malloc & Free', exercises: 4, completed: 0, status: 'locked' },
        { day: 13, title: 'Structures', exercises: 5, completed: 0, status: 'locked' },
        { day: 14, title: 'Makefile', exercises: 4, completed: 0, status: 'locked' },
        { day: 15, title: 'Terminal avancé', exercises: 6, completed: 0, status: 'locked' },
        { day: 16, title: 'Git workflows', exercises: 5, completed: 0, status: 'locked' },
        { day: 17, title: 'Debugging', exercises: 5, completed: 0, status: 'locked' },
        { day: 18, title: 'Tests unitaires', exercises: 4, completed: 0, status: 'locked' },
        { day: 19, title: 'Optimisation', exercises: 5, completed: 0, status: 'locked' },
        { day: 20, title: 'Révision Phase 2', exercises: 8, completed: 0, status: 'locked' },
      ],
    },
    // Phase 3 : Piscine réelle (Jours 31-45)
    {
      phase: 3,
      title: 'Phase 3 : Piscine réelle',
      description: 'Simulation de la vraie Piscine',
      color: 'warning',
      days: [
        { day: 21, title: 'Projet : ft_printf', exercises: 1, completed: 0, status: 'locked' },
        { day: 22, title: 'Projet : get_next_line', exercises: 1, completed: 0, status: 'locked' },
        { day: 23, title: 'Peer evaluation', exercises: 3, completed: 0, status: 'locked' },
        { day: 24, title: 'Rush 00', exercises: 1, completed: 0, status: 'locked' },
        { day: 25, title: 'Mode survie 4h', exercises: 5, completed: 0, status: 'locked' },
        { day: 26, title: 'Mode survie 8h', exercises: 8, completed: 0, status: 'locked' },
        { day: 27, title: 'Exam simulation', exercises: 10, completed: 0, status: 'locked' },
        { day: 28, title: 'Projet final (Part 1)', exercises: 1, completed: 0, status: 'locked' },
        { day: 29, title: 'Projet final (Part 2)', exercises: 1, completed: 0, status: 'locked' },
        { day: 30, title: 'Bilan Phase 2', exercises: 5, completed: 0, status: 'locked' },
      ],
    },
    // Phase 4 : Approfondissement (Jours 46-60)
    {
      phase: 4,
      title: 'Phase 4 : Approfondissement',
      description: 'Maîtrise approfondie et projets avancés',
      color: 'success',
      days: [
        { day: 46, title: 'Structures de données avancées', exercises: 6, completed: 0, status: 'locked' },
        { day: 48, title: 'Algorithmes de tri', exercises: 5, completed: 0, status: 'locked' },
        { day: 50, title: 'Gestion mémoire avancée', exercises: 4, completed: 0, status: 'locked' },
        { day: 52, title: 'Projet: Minishell', exercises: 1, completed: 0, status: 'locked' },
        { day: 55, title: 'Optimisation de code', exercises: 5, completed: 0, status: 'locked' },
        { day: 58, title: 'Debugging avancé', exercises: 4, completed: 0, status: 'locked' },
        { day: 60, title: 'Bilan Phase 4', exercises: 5, completed: 0, status: 'locked' },
      ],
    },
    // Phase 5 : Expertise (Jours 61-90)
    {
      phase: 5,
      title: 'Phase 5 : Expertise',
      description: 'Niveau expert et préparation complète',
      color: 'warning',
      days: [
        { day: 61, title: 'Réseau et sockets', exercises: 5, completed: 0, status: 'locked' },
        { day: 65, title: 'Threads et processus', exercises: 6, completed: 0, status: 'locked' },
        { day: 70, title: 'Projet: Webserver', exercises: 1, completed: 0, status: 'locked' },
        { day: 75, title: 'Sécurité en C', exercises: 4, completed: 0, status: 'locked' },
        { day: 80, title: 'Performance & Profiling', exercises: 5, completed: 0, status: 'locked' },
        { day: 85, title: 'Projet final expert', exercises: 1, completed: 0, status: 'locked' },
        { day: 90, title: 'Certification finale', exercises: 10, completed: 0, status: 'locked' },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <Check className="w-5 h-5 text-success" />
    if (status === 'in_progress') return <Play className="w-5 h-5 text-primary" />
    return <Lock className="w-5 h-5 text-muted-foreground" />
  }

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'border-success bg-success/10'
    if (status === 'in_progress') return 'border-primary bg-primary/10'
    return 'border-border bg-muted opacity-60'
  }

  const getPhaseColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-primary/10 border-primary text-primary',
      success: 'bg-success/10 border-success text-success',
      warning: 'bg-warning/10 border-warning text-warning',
      danger: 'bg-danger/10 border-danger text-danger',
      purple: 'bg-purple-100 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-300',
    }
    return colors[color] || 'bg-muted border-border'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">🗺️ Parcours</h1>
        <p className="text-lg text-muted-foreground">
          {TOTAL_DAYS} jours de formation complète - De débutant à expert
        </p>

        {/* Progress globale */}
        <div className="border rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Progression globale</span>
            <span className="text-muted-foreground">Jour {currentDay}/{TOTAL_DAYS} - 5 exercices complétés</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '3%' }}></div>
          </div>
        </div>
      </div>

      {/* Roadmap par phase */}
      {roadmap.map((phase) => (
        <div key={phase.phase} className="space-y-4">
          {/* Header de phase */}
          <div className={`border rounded-lg p-6 ${getPhaseColor(phase.color)}`}>
            <h2 className="text-2xl font-bold mb-2">{phase.title}</h2>
            <p className="opacity-90">{phase.description}</p>
          </div>

          {/* Jours de la phase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {phase.days.map((day) => (
              <Link
                key={day.day}
                href={day.status === 'locked' ? '#' : `/aujourdhui?day=${day.day}`}
                className={`block border rounded-lg p-4 transition-all ${getStatusColor(
                  day.status
                )} ${day.status !== 'locked' ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={(e) => {
                  if (day.status !== 'locked') {
                    localStorage.setItem('currentDay', day.day.toString())
                  }
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(day.status)}
                    <span className="font-bold text-lg">Jour {day.day}</span>
                  </div>
                  {day.status === 'completed' && (
                    <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded">
                      100%
                    </span>
                  )}
                  {day.status === 'in_progress' && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      {Math.round((day.completed / day.exercises) * 100)}%
                    </span>
                  )}
                </div>

                <h3 className="font-medium mb-2 line-clamp-2">{day.title}</h3>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{day.exercises} exercices</span>
                  {day.status !== 'locked' && (
                    <span className="text-xs">
                      {day.completed}/{day.exercises}
                    </span>
                  )}
                </div>

                {day.status === 'in_progress' && (
                  <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(day.completed / day.exercises) * 100}%` }}
                    ></div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Légende */}
      <div className="border rounded-lg p-6 bg-muted/50">
        <h3 className="font-bold mb-3">🎯 Légende</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-success" />
            <span>Jour complété (tous les exercices validés)</span>
          </div>
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" />
            <span>Jour en cours (exercices en progression)</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <span>Jour verrouillé (complète les jours précédents)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
