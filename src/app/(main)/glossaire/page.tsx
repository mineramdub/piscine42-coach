'use client'

import { useState, useMemo } from 'react'
import { Search, Lightbulb } from 'lucide-react'
import { glossary, type TermDefinition } from '@/components/learning/TechTerm'

const categories = [
  'Tous',
  'Compilateur & Outils',
  'Fonctions C',
  'Types de données',
  'Structures de contrôle',
  'Entrées/Sorties',
  'Flags de compilation',
  'Modificateurs',
  'Erreurs courantes',
  'Bases',
]

export default function GlossairePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  const glossaryEntries = useMemo(() => {
    return Object.entries(glossary)
  }, [])

  const filteredEntries = useMemo(() => {
    return glossaryEntries.filter(([key, term]) => {
      // Filtre par recherche
      const matchesSearch =
        searchQuery === '' ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.aphorism.toLowerCase().includes(searchQuery.toLowerCase())

      // Filtre par catégorie
      const matchesCategory =
        selectedCategory === 'Tous' || term.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [glossaryEntries, searchQuery, selectedCategory])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">📖 Glossaire</h1>
        <p className="text-muted-foreground">
          Tous les termes techniques essentiels pour la Piscine 42
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher un terme, une définition, un aphorisme..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Résultats */}
      <div className="text-sm text-muted-foreground">
        {filteredEntries.length} terme{filteredEntries.length > 1 ? 's' : ''} trouvé
        {filteredEntries.length > 1 ? 's' : ''}
      </div>

      {/* Grille de cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEntries.map(([key, term]) => (
          <div
            key={key}
            className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
          >
            {/* Terme + Catégorie */}
            <div className="flex items-start justify-between gap-2">
              <code className="text-lg font-bold bg-muted px-2 py-1 rounded">
                {term.term}
              </code>
              {term.category && (
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap">
                  {term.category}
                </span>
              )}
            </div>

            {/* Définition */}
            <p className="text-sm">{term.definition}</p>

            {/* Aphorisme */}
            <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
              <Lightbulb className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm italic text-muted-foreground">
                « {term.aphorism} »
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredEntries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg mb-2">Aucun terme trouvé</p>
          <p className="text-sm">
            Essaie de modifier ta recherche ou de changer de catégorie
          </p>
        </div>
      )}
    </div>
  )
}
