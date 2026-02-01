/**
 * Définition de tous les concepts enseignés dans le parcours
 * Chaque concept a un jour d'introduction et des infos pour les rappels
 */

export interface Concept {
  id: string
  name: string
  category: 'c' | 'terminal' | 'git' | 'debug'
  introducedOnDay: number
  shortDescription: string
  keyPoints: string[]
  // Exercice de rappel rapide (micro-exercice 2-3 min)
  quickReview?: {
    question: string
    hint: string
    answer: string
  }
}

export const concepts: Record<string, Concept> = {
  // JOUR 1
  'printf': {
    id: 'printf',
    name: 'printf()',
    category: 'c',
    introducedOnDay: 1,
    shortDescription: 'Afficher du texte à l\'écran',
    keyPoints: [
      'printf("texte") pour afficher',
      '\\n pour retour à la ligne',
      'Nécessite #include <stdio.h>',
    ],
    quickReview: {
      question: 'Comment afficher "Bonjour" suivi d\'un retour à la ligne ?',
      hint: 'Utilise printf avec \\n',
      answer: 'printf("Bonjour\\n");',
    },
  },
  'main-function': {
    id: 'main-function',
    name: 'Fonction main()',
    category: 'c',
    introducedOnDay: 1,
    shortDescription: 'Point d\'entrée du programme',
    keyPoints: [
      'int main(void) { }',
      'return (0) pour succès',
      'C\'est le point de départ du programme',
    ],
    quickReview: {
      question: 'Quelle est la signature de la fonction main ?',
      hint: 'Type de retour, nom, paramètres',
      answer: 'int main(void)',
    },
  },
  'include-stdio': {
    id: 'include-stdio',
    name: '#include <stdio.h>',
    category: 'c',
    introducedOnDay: 1,
    shortDescription: 'Bibliothèque standard input/output',
    keyPoints: [
      'Nécessaire pour printf, scanf, etc.',
      'Se place en haut du fichier',
      'stdio = Standard Input Output',
    ],
    quickReview: {
      question: 'Pourquoi a-t-on besoin de #include <stdio.h> ?',
      hint: 'Pense aux fonctions d\'affichage',
      answer: 'Pour utiliser printf() et les fonctions d\'entrée/sortie',
    },
  },
  'gcc-compilation': {
    id: 'gcc-compilation',
    name: 'Compilation avec gcc',
    category: 'c',
    introducedOnDay: 1,
    shortDescription: 'Compiler un programme C',
    keyPoints: [
      'gcc fichier.c compile le code',
      '-o nom pour nommer l\'exécutable',
      '-Wall -Wextra -Werror pour les warnings',
    ],
    quickReview: {
      question: 'Quelle commande pour compiler main.c avec tous les warnings ?',
      hint: 'gcc + flags Wall Wextra Werror',
      answer: 'gcc -Wall -Wextra -Werror main.c',
    },
  },

  // JOUR 2
  'variables': {
    id: 'variables',
    name: 'Variables (int, char)',
    category: 'c',
    introducedOnDay: 2,
    shortDescription: 'Déclarer et utiliser des variables',
    keyPoints: [
      'int age = 25; pour les entiers',
      'char lettre = \'A\'; pour les caractères',
      'Initialiser avant d\'utiliser',
    ],
    quickReview: {
      question: 'Déclare une variable entière "compteur" initialisée à 0',
      hint: 'Type int, nom, = valeur',
      answer: 'int compteur = 0;',
    },
  },
  'if-else': {
    id: 'if-else',
    name: 'Conditions if/else',
    category: 'c',
    introducedOnDay: 2,
    shortDescription: 'Exécuter du code selon une condition',
    keyPoints: [
      'if (condition) { code }',
      'else { code alternatif }',
      'Conditions: ==, !=, <, >, <=, >=',
    ],
    quickReview: {
      question: 'Écris une condition qui affiche "Majeur" si age >= 18',
      hint: 'if (age ...) printf(...)',
      answer: 'if (age >= 18) printf("Majeur\\n");',
    },
  },
  'while-loop': {
    id: 'while-loop',
    name: 'Boucle while',
    category: 'c',
    introducedOnDay: 2,
    shortDescription: 'Répéter du code tant qu\'une condition est vraie',
    keyPoints: [
      'while (condition) { code }',
      'Ne pas oublier d\'incrémenter !',
      'Risque de boucle infinie si condition toujours vraie',
    ],
    quickReview: {
      question: 'Affiche les nombres de 0 à 4 avec une boucle while',
      hint: 'Compteur de 0, condition < 5, printf + incrément',
      answer: 'int i = 0; while (i < 5) { printf("%d\\n", i); i++; }',
    },
  },

  // JOUR 3
  'strings': {
    id: 'strings',
    name: 'Chaînes de caractères',
    category: 'c',
    introducedOnDay: 3,
    shortDescription: 'Manipuler du texte en C',
    keyPoints: [
      'char str[] = "Hello"; pour déclarer',
      'Toujours terminé par \\0 (null terminator)',
      'Tableau de caractères',
    ],
    quickReview: {
      question: 'Comment déclarer une chaîne "Bonjour" ?',
      hint: 'char tableau[], guillemets',
      answer: 'char str[] = "Bonjour";',
    },
  },
  'arrays': {
    id: 'arrays',
    name: 'Tableaux',
    category: 'c',
    introducedOnDay: 3,
    shortDescription: 'Stocker plusieurs valeurs du même type',
    keyPoints: [
      'int tab[5]; pour déclarer',
      'tab[0] pour le 1er élément',
      'Indices de 0 à taille-1',
    ],
    quickReview: {
      question: 'Déclare un tableau de 10 entiers nommé "nombres"',
      hint: 'int nom[taille]',
      answer: 'int nombres[10];',
    },
  },
  'pointers-intro': {
    id: 'pointers-intro',
    name: 'Pointeurs (introduction)',
    category: 'c',
    introducedOnDay: 3,
    shortDescription: 'Adresse mémoire d\'une variable',
    keyPoints: [
      'int *ptr; déclare un pointeur',
      '&variable pour obtenir l\'adresse',
      '*ptr pour accéder à la valeur pointée',
    ],
    quickReview: {
      question: 'Comment obtenir l\'adresse d\'une variable "age" ?',
      hint: 'Opérateur &',
      answer: '&age',
    },
  },

  // TERMINAL
  'terminal-ls': {
    id: 'terminal-ls',
    name: 'Commande ls',
    category: 'terminal',
    introducedOnDay: 1,
    shortDescription: 'Lister les fichiers',
    keyPoints: [
      'ls affiche les fichiers du dossier courant',
      'ls -l pour format long',
      'ls -a pour afficher les fichiers cachés',
    ],
    quickReview: {
      question: 'Quelle commande pour voir TOUS les fichiers y compris cachés ?',
      hint: 'ls avec l\'option -a',
      answer: 'ls -a',
    },
  },
  'terminal-cd': {
    id: 'terminal-cd',
    name: 'Commande cd',
    category: 'terminal',
    introducedOnDay: 1,
    shortDescription: 'Changer de dossier',
    keyPoints: [
      'cd dossier pour entrer',
      'cd .. pour remonter',
      'cd ~ pour aller au home',
    ],
    quickReview: {
      question: 'Comment revenir au dossier parent ?',
      hint: 'cd avec ..',
      answer: 'cd ..',
    },
  },

  // GIT
  'git-init': {
    id: 'git-init',
    name: 'git init',
    category: 'git',
    introducedOnDay: 1,
    shortDescription: 'Créer un dépôt Git',
    keyPoints: [
      'git init initialise un repo',
      'Crée un dossier .git caché',
      'À faire une seule fois par projet',
    ],
    quickReview: {
      question: 'Quelle commande pour initialiser un repo Git ?',
      hint: 'git ...',
      answer: 'git init',
    },
  },
  'git-add': {
    id: 'git-add',
    name: 'git add',
    category: 'git',
    introducedOnDay: 1,
    shortDescription: 'Ajouter des fichiers au staging',
    keyPoints: [
      'git add fichier ajoute un fichier',
      'git add . ajoute tout',
      'Nécessaire avant commit',
    ],
    quickReview: {
      question: 'Comment ajouter TOUS les fichiers au staging ?',
      hint: 'git add avec .',
      answer: 'git add .',
    },
  },
}

/**
 * Obtient tous les concepts introduits à un jour donné
 */
export function getConceptsForDay(day: number): Concept[] {
  return Object.values(concepts).filter(c => c.introducedOnDay === day)
}

/**
 * Obtient un concept par son ID
 */
export function getConcept(id: string): Concept | undefined {
  return concepts[id]
}

/**
 * Obtient tous les concepts d'une catégorie
 */
export function getConceptsByCategory(category: Concept['category']): Concept[] {
  return Object.values(concepts).filter(c => c.category === category)
}
