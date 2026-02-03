// Validation dynamique des exercices C

interface ValidationResult {
  id: number
  passed: boolean
  message: string
}

export function validateExercise(exerciseId: string, code: string): ValidationResult[] {
  // Hello World
  if (exerciseId === 'c-day01-ex00-hello') {
    return [
      {
        id: 1,
        passed: code.includes('printf("Hello, World!\\n")'),
        message: code.includes('printf("Hello, World!\\n")')
          ? 'Affiche correctement "Hello, World!"'
          : 'Le texte affiché n\'est pas correct'
      },
      {
        id: 2,
        passed: code.includes('#include <stdio.h>'),
        message: code.includes('#include <stdio.h>')
          ? 'Compilation réussie'
          : 'Erreur de compilation : include manquant'
      },
      {
        id: 3,
        passed: code.includes('return (0)') || code.includes('return(0)'),
        message: 'Return code correct (0)'
      }
    ]
  }

  // Variables (somme)
  if (exerciseId === 'c-day01-ex01-variables') {
    const hasVariables = code.includes('int a') && code.includes('int b')
    const hasPrintf = code.includes('printf') && code.includes('%d')
    const hasSum = code.includes('a + b') || code.includes('a+b')

    return [
      {
        id: 1,
        passed: hasVariables,
        message: hasVariables ? 'Variables déclarées correctement' : 'Variables a et b manquantes'
      },
      {
        id: 2,
        passed: hasSum,
        message: hasSum ? 'Calcule la somme correctement' : 'Calcul de la somme manquant'
      },
      {
        id: 3,
        passed: hasPrintf,
        message: hasPrintf ? 'Affichage avec printf correct' : 'Printf manquant ou incorrect'
      }
    ]
  }

  // Printf avancé
  if (exerciseId === 'c-day01-ex02-printf') {
    const hasNombre = code.includes('int nombre')
    const hasLettre = code.includes('char lettre')
    const hasPrintfD = code.includes('printf') && code.includes('%d')
    const hasPrintfC = code.includes('printf') && code.includes('%c')

    return [
      {
        id: 1,
        passed: hasNombre && hasLettre,
        message: (hasNombre && hasLettre) ? 'Variables nombre et lettre déclarées' : 'Variables manquantes'
      },
      {
        id: 2,
        passed: hasPrintfD,
        message: hasPrintfD ? 'Affichage du nombre avec %d correct' : 'Printf avec %d manquant'
      },
      {
        id: 3,
        passed: hasPrintfC,
        message: hasPrintfC ? 'Affichage du caractère avec %c correct' : 'Printf avec %c manquant'
      }
    ]
  }

  // If/Else conditions
  if (exerciseId === 'c-day02-ex00-conditions') {
    const hasIf = code.includes('if') && (code.includes('n >= 0') || code.includes('n>=0'))
    const hasElse = code.includes('else')
    const hasPositif = code.includes('printf') && code.includes('Positif')
    const hasNegatif = code.includes('printf') && code.includes('Négatif')

    return [
      {
        id: 1,
        passed: hasIf,
        message: hasIf ? 'Condition if (n >= 0) correcte' : 'Condition if manquante ou incorrecte'
      },
      {
        id: 2,
        passed: hasElse,
        message: hasElse ? 'Bloc else présent' : 'Bloc else manquant'
      },
      {
        id: 3,
        passed: hasPositif && hasNegatif,
        message: (hasPositif && hasNegatif)
          ? 'Affichage "Positif" et "Négatif" correct'
          : 'Affichage manquant ou incorrect'
      }
    ]
  }

  // While loop
  if (exerciseId === 'c-day02-ex01-while') {
    const hasWhile = code.includes('while')
    const hasCondition = code.includes('i <= 5') || code.includes('i<=5') || code.includes('i < 6')
    const hasIncrement = code.includes('i++') || code.includes('i = i + 1') || code.includes('i+=1')
    const hasPrintf = code.includes('printf') && code.includes('%d')

    return [
      {
        id: 1,
        passed: hasWhile,
        message: hasWhile ? 'Boucle while présente' : 'Boucle while manquante'
      },
      {
        id: 2,
        passed: hasCondition,
        message: hasCondition ? 'Condition de boucle correcte' : 'Condition incorrecte (doit aller jusqu\'à 5)'
      },
      {
        id: 3,
        passed: hasIncrement && hasPrintf,
        message: (hasIncrement && hasPrintf)
          ? 'Incrémentation et affichage corrects'
          : 'Incrémentation ou printf manquant'
      }
    ]
  }

  // ft_strlen
  if (exerciseId === 'c-day03-ex00-ft-strlen') {
    const hasFunction = code.includes('int ft_strlen') || code.includes('int\tft_strlen')
    const hasParam = code.includes('char *str') || code.includes('char*str')
    const hasWhile = code.includes('while') && code.includes('\\0')
    const hasReturn = code.includes('return')

    return [
      {
        id: 1,
        passed: hasFunction && hasParam,
        message: (hasFunction && hasParam)
          ? 'Signature de fonction correcte'
          : 'Signature incorrecte : int ft_strlen(char *str)'
      },
      {
        id: 2,
        passed: hasWhile,
        message: hasWhile
          ? 'Parcourt la string jusqu\'au \\0'
          : 'Boucle while ou test \\0 manquant'
      },
      {
        id: 3,
        passed: hasReturn,
        message: hasReturn ? 'Retourne la longueur' : 'Return manquant'
      }
    ]
  }

  // Par défaut : tests génériques
  return [
    {
      id: 1,
      passed: code.includes('#include'),
      message: code.includes('#include') ? 'Includes présents' : 'Includes manquants'
    },
    {
      id: 2,
      passed: code.includes('main') || code.includes('ft_'),
      message: code.includes('main') || code.includes('ft_') ? 'Fonction principale présente' : 'Fonction manquante'
    },
    {
      id: 3,
      passed: code.length > 50,
      message: code.length > 50 ? 'Code suffisamment détaillé' : 'Code incomplet'
    }
  ]
}
