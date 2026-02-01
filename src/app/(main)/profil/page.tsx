'use client'

import { Flame, Trophy, Target, Code, Terminal as TerminalIcon, GitBranch, Bug } from 'lucide-react'

export default function ProfilPage() {
  // Données mockées pour l'instant
  const userProgress = {
    name: 'Étudiant',
    currentStreak: 5,
    longestStreak: 12,
    totalExercises: 8,

    // 4 tracks de progression
    cLevel: 2,
    cXp: 350,
    cXpToNext: 500,

    terminalLevel: 1,
    terminalXp: 120,
    terminalXpToNext: 300,

    gitLevel: 1,
    gitXp: 80,
    gitXpToNext: 300,

    debugLevel: 1,
    debugXp: 50,
    debugXpToNext: 300,
  }

  const badges = [
    { id: 1, name: 'Premier pas', icon: '🌊', earned: true, description: 'Premier exercice complété' },
    { id: 2, name: 'Marathonien', icon: '🔥', earned: true, description: '5 jours consécutifs' },
    { id: 3, name: 'Hello World', icon: '👋', earned: true, description: 'Premier programme C' },
    { id: 4, name: 'Terminal Master', icon: '💻', earned: false, description: 'Niveau 3 Terminal' },
    { id: 5, name: 'Git Ninja', icon: '🥷', earned: false, description: 'Niveau 3 Git' },
    { id: 6, name: 'Semaine 1', icon: '📅', earned: false, description: 'Terminer les 7 premiers jours' },
  ]

  const getLevelColor = (track: string) => {
    const colors: Record<string, string> = {
      c: 'text-primary',
      terminal: 'text-success',
      git: 'text-warning',
      debug: 'text-danger',
    }
    return colors[track] || 'text-foreground'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">👤 {userProgress.name}</h1>
          <p className="text-muted-foreground">Ton profil et ta progression</p>
        </div>
      </div>

      {/* Streak */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-warning/10 border border-warning rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-6 h-6 text-warning" />
            <h2 className="text-2xl font-bold">Streak actuel</h2>
          </div>
          <p className="text-5xl font-bold text-warning">{userProgress.currentStreak} jours</p>
          <p className="text-sm text-muted-foreground mt-2">Continue comme ça !</p>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Record</h2>
          </div>
          <p className="text-5xl font-bold text-primary">{userProgress.longestStreak} jours</p>
          <p className="text-sm text-muted-foreground mt-2">Meilleur streak personnel</p>
        </div>
      </div>

      {/* Stats globales */}
      <div className="border rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Target className="w-6 h-6" />
          Statistiques
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold">{userProgress.totalExercises}</p>
            <p className="text-sm text-muted-foreground">Exercices complétés</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold">{userProgress.cLevel}</p>
            <p className="text-sm text-muted-foreground">Niveau C</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold">{userProgress.terminalLevel}</p>
            <p className="text-sm text-muted-foreground">Niveau Terminal</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold">{userProgress.gitLevel}</p>
            <p className="text-sm text-muted-foreground">Niveau Git</p>
          </div>
        </div>
      </div>

      {/* 4 tracks de progression */}
      <div className="border rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold">📊 Progression par compétence</h2>

        {/* Track C */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className={`w-5 h-5 ${getLevelColor('c')}`} />
              <span className="font-medium">Programmation C</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Niveau {userProgress.cLevel} - {userProgress.cXp}/{userProgress.cXpToNext} XP
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(userProgress.cXp / userProgress.cXpToNext) * 100}%` }}
            />
          </div>
        </div>

        {/* Track Terminal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon className={`w-5 h-5 ${getLevelColor('terminal')}`} />
              <span className="font-medium">Terminal</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Niveau {userProgress.terminalLevel} - {userProgress.terminalXp}/{userProgress.terminalXpToNext} XP
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-all"
              style={{ width: `${(userProgress.terminalXp / userProgress.terminalXpToNext) * 100}%` }}
            />
          </div>
        </div>

        {/* Track Git */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className={`w-5 h-5 ${getLevelColor('git')}`} />
              <span className="font-medium">Git</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Niveau {userProgress.gitLevel} - {userProgress.gitXp}/{userProgress.gitXpToNext} XP
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-warning rounded-full transition-all"
              style={{ width: `${(userProgress.gitXp / userProgress.gitXpToNext) * 100}%` }}
            />
          </div>
        </div>

        {/* Track Debug */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bug className={`w-5 h-5 ${getLevelColor('debug')}`} />
              <span className="font-medium">Debug & Tests</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Niveau {userProgress.debugLevel} - {userProgress.debugXp}/{userProgress.debugXpToNext} XP
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-danger rounded-full transition-all"
              style={{ width: `${(userProgress.debugXp / userProgress.debugXpToNext) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="border rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6" />
          Badges ({badges.filter(b => b.earned).length}/{badges.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative text-center p-4 rounded-lg border transition-all ${
                badge.earned
                  ? 'bg-primary/10 border-primary'
                  : 'bg-muted border-border opacity-50 grayscale'
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <p className="font-medium text-sm">{badge.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
              {!badge.earned && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
                  <span className="text-2xl">🔒</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
