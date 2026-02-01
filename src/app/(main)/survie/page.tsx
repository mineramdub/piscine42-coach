'use client'

import { useState, useEffect } from 'react'
import { Clock, Battery, Zap, Play, Pause, RotateCcw, AlertTriangle } from 'lucide-react'

export default function SurviePage() {
  const [activeMode, setActiveMode] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(15)

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            // Timer terminé !
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft])

  const startMode = (mode: string, duration: number) => {
    setActiveMode(mode)
    setTimeLeft(duration * 60)
    setIsRunning(true)
  }

  const pauseResume = () => {
    setIsRunning(!isRunning)
  }

  const reset = () => {
    setIsRunning(false)
    setActiveMode(null)
    setTimeLeft(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const modes = [
    {
      id: 'chrono',
      title: 'Mode Chrono',
      icon: Clock,
      color: 'primary',
      description: 'Résous un exercice contre la montre',
      details: 'Simule la pression d\'un exam ou d\'un rush. Un exercice, un chrono, pas de pause.',
      durations: [15, 30, 60, 120],
      exercise: {
        title: 'ft_strcpy',
        description: 'Reproduis le comportement de strcpy',
        constraints: ['Prototype: char *ft_strcpy(char *dest, char *src)', 'Interdiction de strlen'],
      },
    },
    {
      id: 'fatigue',
      title: 'Mode Fatigue',
      icon: Battery,
      color: 'warning',
      description: 'Code quand tu es épuisé',
      details: 'Interface simplifiée, exercice minimal, pour coder même à 3h du matin pendant la Piscine.',
      durations: [15, 30],
      exercise: {
        title: 'ft_putchar',
        description: 'Affiche un caractère',
        constraints: ['Prototype: void ft_putchar(char c)', 'Utilise write'],
      },
    },
    {
      id: 'stress',
      title: 'Stress Test',
      icon: Zap,
      color: 'danger',
      description: 'Gère les erreurs et bugs',
      details: 'Ton code compile mais segfault. Debug sous pression avec des erreurs aléatoires.',
      durations: [30, 60],
      exercise: {
        title: 'Debug Challenge',
        description: 'Trouve et corrige les 5 erreurs cachées',
        constraints: ['Segfault', 'Memory leak', 'Off-by-one', 'Undefined behavior', 'Mauvaise gestion pointeurs'],
      },
    },
  ]

  const currentMode = modes.find(m => m.id === activeMode)

  if (activeMode && currentMode) {
    return (
      <div className="space-y-8">
        {/* Header du mode actif */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <currentMode.icon className={`w-10 h-10 text-${currentMode.color}`} />
            <div>
              <h1 className="text-3xl font-bold">{currentMode.title}</h1>
              <p className="text-muted-foreground">{currentMode.description}</p>
            </div>
          </div>
          <button
            onClick={reset}
            className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Quitter
          </button>
        </div>

        {/* Timer */}
        <div className={`border-4 rounded-xl p-12 text-center ${
          timeLeft < 60 ? 'border-danger bg-danger/5' : `border-${currentMode.color} bg-${currentMode.color}/5`
        }`}>
          <div className={`text-8xl font-bold font-mono mb-6 ${
            timeLeft < 60 ? 'text-danger' : `text-${currentMode.color}`
          }`}>
            {formatTime(timeLeft)}
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={pauseResume}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                isRunning
                  ? 'bg-warning text-warning-foreground'
                  : 'bg-success text-success-foreground'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Reprendre
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="px-6 py-3 border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Abandonner
            </button>
          </div>
          {timeLeft === 0 && (
            <div className="mt-6 text-xl font-bold text-success">
              ⏰ Temps écoulé ! Soumets ton code maintenant.
            </div>
          )}
        </div>

        {/* Exercice */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">{currentMode.exercise.title}</h2>
          <p className="text-lg">{currentMode.exercise.description}</p>
          <div className="space-y-2">
            <h3 className="font-bold">Contraintes :</h3>
            <ul className="space-y-1">
              {currentMode.exercise.constraints.map((constraint, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-danger">•</span>
                  <code className="text-sm bg-muted px-2 py-1 rounded">{constraint}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Zone de code (placeholder) */}
        <div className="border rounded-lg p-6">
          <h3 className="font-bold mb-4">💻 Ton code</h3>
          <div className="bg-muted rounded-lg p-4 h-64 flex items-center justify-center text-muted-foreground">
            [Éditeur de code - intégration à venir]
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90">
            Tester mon code
          </button>
          <button className="flex-1 bg-success text-success-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90">
            Soumettre
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">🔥 Mode Survie</h1>
        <p className="text-lg text-muted-foreground">
          Entraîne-toi dans des conditions extrêmes pour être prêt le jour J
        </p>
      </div>

      {/* Warning */}
      <div className="bg-warning/10 border border-warning rounded-lg p-6 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-lg mb-2">⚠️ Attention</h3>
          <p className="text-sm">
            Les modes Survie simulent les conditions réelles de la Piscine : pression, fatigue, bugs.
            C&apos;est normal de galérer, c&apos;est fait pour ça !
          </p>
        </div>
      </div>

      {/* Cartes des modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modes.map((mode) => {
          const Icon = mode.icon
          return (
            <div
              key={mode.id}
              className={`border rounded-lg p-6 space-y-4 hover:scale-105 transition-transform bg-${mode.color}/5`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-8 h-8 text-${mode.color}`} />
                <h2 className="text-2xl font-bold">{mode.title}</h2>
              </div>
              <p className="text-muted-foreground">{mode.description}</p>
              <div className="border-t pt-4 space-y-2">
                <p className="text-sm">{mode.details}</p>
              </div>

              {/* Durées disponibles */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Choisis ta durée :</h3>
                <div className="grid grid-cols-2 gap-2">
                  {mode.durations.map((duration) => (
                    <button
                      key={duration}
                      onClick={() => startMode(mode.id, duration)}
                      className={`px-4 py-2 border rounded-lg hover:bg-${mode.color} hover:text-${mode.color}-foreground transition-colors font-medium`}
                    >
                      {duration} min
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Statistiques */}
      <div className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">📊 Tes stats en mode Survie</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Sessions complétées</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold">67%</p>
            <p className="text-sm text-muted-foreground">Taux de réussite</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold">18:32</p>
            <p className="text-sm text-muted-foreground">Temps moyen</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">Record (jours consécutifs)</p>
          </div>
        </div>
      </div>

      {/* Conseils */}
      <div className="border rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold">💡 Conseils pour les modes Survie</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span><strong>Mode Chrono :</strong> Lis bien l&apos;énoncé avant de lancer le timer</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span><strong>Mode Fatigue :</strong> Utilise-le pour t&apos;entraîner à coder simple et efficace</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span><strong>Stress Test :</strong> Apprends à debug méthodiquement, pas au hasard</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span>Fais une session par jour minimum pour habituer ton cerveau au stress</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
