'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Code2, ChevronDown, ChevronRight } from 'lucide-react'
import CodeBlock from '@/components/learning/CodeBlock'

interface CodeSnippet {
  title: string
  code: string
  explanation: string
}

interface Fiche {
  theme: string
  day: number
  title: string
  concepts: string[]
  codeSnippets: CodeSnippet[]
}

interface ThemeGroup {
  theme: string
  icon: string
  color: string
  fiches: Fiche[]
}

export default function FichesPage() {
  const [currentDay, setCurrentDay] = useState(1)
  const [themeGroups, setThemeGroups] = useState<ThemeGroup[]>([])
  const [expandedThemes, setExpandedThemes] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFiches = async () => {
      setLoading(true)

      // Récupérer le jour actuel
      const savedDay = localStorage.getItem('currentDay')
      const day = savedDay ? parseInt(savedDay, 10) : 1
      setCurrentDay(day)

      // Charger tous les exercices jusqu'au jour actuel
      const allFiches: Fiche[] = []

      for (let d = 1; d <= day; d++) {
        try {
          const response = await fetch(`/api/exercises/day/${d}`)
          if (response.ok) {
            const data = await response.json()
            const exercises = data.exercises || []

            // Extraire les fiches de chaque exercice
            exercises.forEach((exercise: any) => {
              if (exercise.learningContent?.theory) {
                const fiche = extractFiche(exercise, d)
                if (fiche) {
                  allFiches.push(fiche)
                }
              }
            })
          }
        } catch (error) {
          console.error(`Error loading day ${d}:`, error)
        }
      }

      // Grouper par thème
      const grouped = groupByTheme(allFiches)
      setThemeGroups(grouped)
      setLoading(false)
    }

    loadFiches()
  }, [])

  const extractFiche = (exercise: any, day: number): Fiche | null => {
    const theory = exercise.learningContent?.theory
    if (!theory || theory.length === 0) return null

    // Extraire concepts clés
    const concepts: string[] = []
    theory.forEach((section: any) => {
      if (section.keyPoints) {
        concepts.push(...section.keyPoints)
      }
    })

    // Extraire snippets de code
    const codeSnippets: CodeSnippet[] = []
    theory.forEach((section: any) => {
      if (section.codeExamples) {
        section.codeExamples.forEach((example: any) => {
          codeSnippets.push({
            title: example.title,
            code: example.code,
            explanation: example.explanation
          })
        })
      }
    })

    // Déterminer le thème
    const theme = determineTheme(exercise.title, exercise.category, day)

    return {
      theme,
      day,
      title: exercise.title,
      concepts,
      codeSnippets: codeSnippets.slice(0, 3) // Limiter à 3 snippets les plus importants
    }
  }

  const determineTheme = (title: string, category: string, day: number): string => {
    const titleLower = title.toLowerCase()

    if (titleLower.includes('variable') || titleLower.includes('type')) return 'Variables & Types'
    if (titleLower.includes('printf') || titleLower.includes('affichage')) return 'Affichage & Printf'
    if (titleLower.includes('condition') || titleLower.includes('if')) return 'Conditions'
    if (titleLower.includes('while') || titleLower.includes('boucle') || titleLower.includes('for')) return 'Boucles'
    if (titleLower.includes('fonction') || titleLower.includes('ft_')) return 'Fonctions'
    if (titleLower.includes('pointeur') || titleLower.includes('pointer')) return 'Pointeurs'
    if (titleLower.includes('string') || titleLower.includes('str') || titleLower.includes('strlen')) return 'Strings'
    if (titleLower.includes('array') || titleLower.includes('tableau')) return 'Tableaux'

    return 'Bases du C'
  }

  const groupByTheme = (fiches: Fiche[]): ThemeGroup[] => {
    const themeMap = new Map<string, Fiche[]>()

    fiches.forEach(fiche => {
      if (!themeMap.has(fiche.theme)) {
        themeMap.set(fiche.theme, [])
      }
      themeMap.get(fiche.theme)!.push(fiche)
    })

    const themeConfig: Record<string, { icon: string, color: string }> = {
      'Variables & Types': { icon: '📦', color: 'blue' },
      'Affichage & Printf': { icon: '🖨️', color: 'green' },
      'Conditions': { icon: '🔀', color: 'yellow' },
      'Boucles': { icon: '🔄', color: 'purple' },
      'Fonctions': { icon: '⚙️', color: 'red' },
      'Pointeurs': { icon: '👉', color: 'orange' },
      'Strings': { icon: '📝', color: 'pink' },
      'Tableaux': { icon: '📊', color: 'cyan' },
      'Bases du C': { icon: '🎯', color: 'gray' }
    }

    const groups: ThemeGroup[] = []
    themeMap.forEach((fiches, theme) => {
      const config = themeConfig[theme] || { icon: '📚', color: 'gray' }
      groups.push({
        theme,
        icon: config.icon,
        color: config.color,
        fiches: fiches.sort((a, b) => a.day - b.day)
      })
    })

    return groups.sort((a, b) => a.theme.localeCompare(b.theme))
  }

  const toggleTheme = (theme: string) => {
    const newExpanded = new Set(expandedThemes)
    if (newExpanded.has(theme)) {
      newExpanded.delete(theme)
    } else {
      newExpanded.add(theme)
    }
    setExpandedThemes(newExpanded)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <BookOpen className="w-12 h-12 animate-pulse text-primary mx-auto" />
          <p className="text-muted-foreground">Génération de tes fiches...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-10 h-10 text-blue-600" />
              <h1 className="text-4xl font-bold">📚 Mes Fiches</h1>
            </div>
            <p className="text-muted-foreground">
              Récapitulatif de tout ce que tu as appris, organisé par thème
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{themeGroups.length} thèmes</div>
            <div className="text-xs text-muted-foreground">
              {themeGroups.reduce((sum, g) => sum + g.fiches.length, 0)} fiches au total
            </div>
          </div>
        </div>
      </div>

      {/* Info pédagogique */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <p className="text-sm text-center">
          💡 <strong>Astuce :</strong> Ces fiches se génèrent automatiquement au fur et à mesure que tu progresses.
          Elles contiennent les concepts clés et exemples de code que tu as validés.
          Parfait pour réviser avant un examen ou quand tu as un trou de mémoire !
        </p>
      </div>

      {/* Groupes de thèmes */}
      {themeGroups.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Aucune fiche pour le moment</h3>
          <p className="text-muted-foreground">
            Les fiches se créeront automatiquement quand tu valideras tes premiers exercices !
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {themeGroups.map((group) => (
            <div key={group.theme} className="border rounded-lg overflow-hidden">
              {/* Header du thème */}
              <button
                onClick={() => toggleTheme(group.theme)}
                className="w-full flex items-center justify-between p-6 bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{group.icon}</span>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold">{group.theme}</h2>
                    <p className="text-sm text-muted-foreground">
                      {group.fiches.length} fiche{group.fiches.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                {expandedThemes.has(group.theme) ? (
                  <ChevronDown className="w-6 h-6" />
                ) : (
                  <ChevronRight className="w-6 h-6" />
                )}
              </button>

              {/* Fiches du thème */}
              {expandedThemes.has(group.theme) && (
                <div className="p-6 space-y-6">
                  {group.fiches.map((fiche, idx) => (
                    <div key={idx} className="border rounded-lg p-6 space-y-4 bg-background">
                      {/* Header fiche */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{fiche.title}</h3>
                        <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                          Jour {fiche.day}
                        </span>
                      </div>

                      {/* Concepts clés */}
                      {fiche.concepts.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                            📌 Concepts clés
                          </h4>
                          <ul className="space-y-1">
                            {fiche.concepts.map((concept, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-success mt-0.5">✓</span>
                                <span>{concept}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Snippets de code */}
                      {fiche.codeSnippets.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                            <Code2 className="w-4 h-4" />
                            Code à retenir
                          </h4>
                          {fiche.codeSnippets.map((snippet, i) => (
                            <CodeBlock
                              key={i}
                              code={snippet.code}
                              language="c"
                              title={snippet.title}
                              explanation={snippet.explanation}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
