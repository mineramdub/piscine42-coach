'use client'

import { useState } from 'react'

export interface TermDefinition {
  term: string
  definition: string
  aphorism: string
  category?: string
}

export const glossary: Record<string, TermDefinition> = {
  gcc: {
    term: 'gcc',
    definition: 'GNU Compiler Collection - Le compilateur C standard sous Unix/Linux',
    aphorism: 'Un bon compilateur ne pardonne pas les erreurs, il les révèle.',
    category: 'Compilateur & Outils'
  },
  compilateur: {
    term: 'compilateur',
    definition: 'Programme qui traduit le code source en langage machine exécutable',
    aphorism: 'La compilation est la première étape vers l\'exécution, pas la dernière.',
    category: 'Compilateur & Outils'
  },
  norminette: {
    term: 'norminette',
    definition: 'Outil 42 qui vérifie la conformité du code aux standards de la Norme',
    aphorism: 'La norme n\'est pas une contrainte, c\'est un guide vers la clarté.',
    category: 'Compilateur & Outils'
  },
  printf: {
    term: 'printf',
    definition: 'Fonction C pour afficher du texte formaté sur la sortie standard',
    aphorism: 'printf est ton premier outil de debug, maîtrise-le.',
    category: 'Fonctions C'
  },
  main: {
    term: 'main',
    definition: 'Point d\'entrée de tout programme C - la fonction qui s\'exécute en premier',
    aphorism: 'Tout commence par main, tout finit par return.',
    category: 'Fonctions C'
  },
  return: {
    term: 'return',
    definition: 'Mot-clé qui termine une fonction et renvoie une valeur',
    aphorism: 'return 0 signifie succès, tout autre nombre signale une erreur.',
    category: 'Structures de contrôle'
  },
  include: {
    term: 'include',
    definition: 'Directive qui importe les déclarations d\'un fichier header (.h)',
    aphorism: 'Sans include, pas de printf - c\'est la porte vers les bibliothèques.',
    category: 'Compilateur & Outils'
  },
  void: {
    term: 'void',
    definition: 'Type spécial signifiant "aucune valeur" - utilisé pour fonctions sans retour',
    aphorism: 'void ne signifie pas inutile, mais sans valeur de retour.',
    category: 'Types de données'
  },
  int: {
    term: 'int',
    definition: 'Type entier (integer) - stocke des nombres entiers de -2147483648 à 2147483647',
    aphorism: 'int est le type par défaut - simple, efficace, universel.',
    category: 'Types de données'
  },
  char: {
    term: 'char',
    definition: 'Type caractère - stocke un seul caractère (1 octet)',
    aphorism: 'Un char peut être un caractère ou un petit entier - c\'est la même chose.',
    category: 'Types de données'
  },
  pointeur: {
    term: 'pointeur',
    definition: 'Variable qui stocke l\'adresse mémoire d\'une autre variable',
    aphorism: 'Les pointeurs sont la clé du C - maîtrise-les ou abandonne.',
    category: 'Types de données'
  },
  variable: {
    term: 'variable',
    definition: 'Espace nommé en mémoire pour stocker une valeur qui peut changer',
    aphorism: 'Une variable bien nommée vaut mille commentaires.',
    category: 'Bases'
  },
  fonction: {
    term: 'fonction',
    definition: 'Bloc de code réutilisable qui effectue une tâche spécifique',
    aphorism: 'Une fonction fait une chose et la fait bien.',
    category: 'Fonctions C'
  },
  boucle: {
    term: 'boucle',
    definition: 'Structure qui répète du code tant qu\'une condition est vraie (while, for)',
    aphorism: 'Une boucle infinie n\'est pas un bug, c\'est un serveur.',
    category: 'Structures de contrôle'
  },
  condition: {
    term: 'condition',
    definition: 'Expression booléenne (if/else) qui contrôle le flux d\'exécution',
    aphorism: 'if est le premier mot de la logique, else en est le second.',
    category: 'Structures de contrôle'
  },
  array: {
    term: 'array',
    definition: 'Tableau - collection d\'éléments du même type stockés consécutivement',
    aphorism: 'Un tableau commence à 0, pas à 1 - accepte-le.',
    category: 'Types de données'
  },
  string: {
    term: 'string',
    definition: 'Chaîne de caractères - tableau de char terminé par \\0',
    aphorism: 'En C, une string est juste un pointeur qui espère trouver un \\0.',
    category: 'Types de données'
  },
  header: {
    term: 'header',
    definition: 'Fichier .h contenant les déclarations de fonctions et macros',
    aphorism: 'Un bon header est une promesse que le .c doit tenir.',
    category: 'Compilateur & Outils'
  },
  malloc: {
    term: 'malloc',
    definition: 'Fonction qui alloue dynamiquement de la mémoire sur le heap',
    aphorism: 'Tout malloc doit avoir son free - c\'est la loi.',
    category: 'Fonctions C'
  },
  free: {
    term: 'free',
    definition: 'Fonction qui libère la mémoire allouée par malloc',
    aphorism: 'Oublier free, c\'est créer une fuite mémoire - évitable et impardonnable.',
    category: 'Fonctions C'
  },
  segfault: {
    term: 'segfault',
    definition: 'Segmentation Fault - erreur d\'accès à une zone mémoire interdite',
    aphorism: 'Un segfault est le cri de la mémoire qu\'on maltraite.',
    category: 'Erreurs courantes'
  },
  null: {
    term: 'NULL',
    definition: 'Pointeur spécial (adresse 0) indiquant l\'absence de valeur',
    aphorism: 'Toujours vérifier si un pointeur est NULL avant de l\'utiliser.',
    category: 'Types de données'
  },
  stdin: {
    term: 'stdin',
    definition: 'Entrée standard - flux de données entrant (clavier par défaut)',
    aphorism: 'stdin, stdout, stderr - les trois flux qu\'un programme doit connaître.',
    category: 'Entrées/Sorties'
  },
  stdout: {
    term: 'stdout',
    definition: 'Sortie standard - flux de données sortant (écran par défaut)',
    aphorism: 'printf écrit sur stdout, pas directement sur l\'écran.',
    category: 'Entrées/Sorties'
  },
  stderr: {
    term: 'stderr',
    definition: 'Sortie d\'erreur standard - flux séparé pour les messages d\'erreur',
    aphorism: 'stderr existe pour une raison : séparer erreurs et résultats.',
    category: 'Entrées/Sorties'
  },
  makefile: {
    term: 'Makefile',
    definition: 'Fichier décrivant comment compiler un projet avec make',
    aphorism: 'Un Makefile bien écrit compile plus vite que tu ne penses.',
    category: 'Compilateur & Outils'
  },
  flag: {
    term: 'flag',
    definition: 'Option de compilation (-Wall, -Wextra, -Werror)',
    aphorism: '-Wall -Wextra -Werror : tes trois meilleurs amis pour un code propre.',
    category: 'Flags de compilation'
  },
  prototype: {
    term: 'prototype',
    definition: 'Déclaration d\'une fonction sans son implémentation',
    aphorism: 'Un prototype dit ce que fait une fonction, le corps dit comment.',
    category: 'Fonctions C'
  },
  scope: {
    term: 'scope',
    definition: 'Portée - zone du code où une variable est accessible',
    aphorism: 'Une variable locale naît et meurt dans sa fonction.',
    category: 'Bases'
  },
  static: {
    term: 'static',
    definition: 'Mot-clé limitant la visibilité d\'une variable/fonction au fichier',
    aphorism: 'static cache ce qui n\'a pas besoin d\'être vu ailleurs.',
    category: 'Modificateurs'
  }
}

interface TechTermProps {
  children: string
}

export default function TechTerm({ children }: TechTermProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const termKey = children.toLowerCase().trim()
  const termData = glossary[termKey]

  if (!termData) {
    return <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{children}</code>
  }

  return (
    <span className="relative inline-block">
      <span
        className="border-b border-dotted border-primary cursor-help text-primary font-medium"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </span>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-80">
          <div className="bg-slate-900 rounded-lg shadow-xl overflow-hidden">
            {/* Définition */}
            <div className="px-4 py-3 bg-slate-800">
              <div className="font-bold text-white mb-1">{termData.term}</div>
              <div className="text-sm text-slate-300">{termData.definition}</div>
            </div>

            {/* Aphorisme */}
            <div className="px-4 py-3 bg-primary/20">
              <div className="text-sm text-slate-100">
                💡 « {termData.aphorism} »
              </div>
            </div>
          </div>

          {/* Flèche */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="border-8 border-transparent border-t-slate-900" />
          </div>
        </div>
      )}
    </span>
  )
}
