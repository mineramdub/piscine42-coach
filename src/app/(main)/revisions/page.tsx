'use client'

import { useState, useEffect } from 'react'
import { Brain, Calendar } from 'lucide-react'
import ReviewSection from '@/components/learning/ReviewSection'

export default function RevisionsPage() {
  const [currentDay, setCurrentDay] = useState(1)

  useEffect(() => {
    const savedDay = localStorage.getItem('currentDay')
    const day = savedDay ? parseInt(savedDay, 10) : 1
    setCurrentDay(day)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-10 h-10 text-purple-600" />
              <h1 className="text-4xl font-bold">🧠 Mes Révisions</h1>
            </div>
            <p className="text-muted-foreground">
              Méthode de répétition espacée - Consolide tes connaissances sur le long terme
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Calendar className="w-6 h-6" />
              Jour {currentDay}
            </div>
            <div className="text-xs text-muted-foreground">Révisions programmées</div>
          </div>
        </div>
      </div>

      {/* Explication de la méthode */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>📚</span>
          <span>Comment fonctionne la répétition espacée ?</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold">🎯 Le principe</h3>
            <p className="text-sm text-muted-foreground">
              Pour ancrer une connaissance dans ta mémoire à long terme, tu dois la réviser à des
              intervalles croissants. C'est scientifiquement prouvé : c'est la méthode la plus efficace !
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-16 px-2 py-1 bg-danger/20 text-danger rounded text-center font-medium">
                  J+1
                </div>
                <span className="text-muted-foreground">Le lendemain (critique !)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 px-2 py-1 bg-danger/20 text-danger rounded text-center font-medium">
                  J+3
                </div>
                <span className="text-muted-foreground">3 jours après (prioritaire)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 px-2 py-1 bg-warning/20 text-warning rounded text-center font-medium">
                  J+7
                </div>
                <span className="text-muted-foreground">1 semaine après (important)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 px-2 py-1 bg-warning/20 text-warning rounded text-center font-medium">
                  J+14
                </div>
                <span className="text-muted-foreground">2 semaines après (consolidation)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 px-2 py-1 bg-primary/20 text-primary rounded text-center font-medium">
                  J+30
                </div>
                <span className="text-muted-foreground">1 mois après (ancrage)</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">💡 Conseils pratiques</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>
                  <strong>2-3 minutes par rappel</strong> : Pas besoin de passer des heures !
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>
                  <strong>Priorité aux J+1 et J+3</strong> : Ce sont les plus critiques
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>
                  <strong>Fais l'exercice de rappel</strong> : Ne te contente pas de relire
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>
                  <strong>Coche quand c'est fait</strong> : Satisfaisant et motivant !
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>
                  <strong>Révise AVANT le nouveau cours</strong> : Ça prépare ton cerveau
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-purple-200 dark:border-purple-800">
          <p className="text-sm text-center font-medium">
            🔬 <strong>Fait prouvé scientifiquement</strong> : La répétition espacée améliore la rétention de{' '}
            <span className="text-purple-600 font-bold">80%</span> par rapport à une révision unique !
          </p>
        </div>
      </div>

      {/* Section des révisions du jour */}
      <ReviewSection currentDay={currentDay} />

      {/* Statistiques */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 bg-gradient-to-br from-danger/5 to-danger/10">
          <div className="text-2xl font-bold text-danger">J+1 & J+3</div>
          <div className="text-sm text-muted-foreground">Révisions critiques</div>
          <div className="text-xs mt-2 text-muted-foreground">
            Ces intervalles sont les plus importants pour ancrer la mémoire
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-gradient-to-br from-warning/5 to-warning/10">
          <div className="text-2xl font-bold text-warning">J+7 & J+14</div>
          <div className="text-sm text-muted-foreground">Consolidation</div>
          <div className="text-xs mt-2 text-muted-foreground">
            Transforme tes connaissances en réflexes automatiques
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="text-2xl font-bold text-primary">J+30</div>
          <div className="text-sm text-muted-foreground">Ancrage long terme</div>
          <div className="text-xs mt-2 text-muted-foreground">
            Garantit que tu te souviendras pendant des années
          </div>
        </div>
      </div>
    </div>
  )
}
