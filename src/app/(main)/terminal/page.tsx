'use client'

import { useState } from 'react'
import { Terminal, Search, ChevronRight } from 'lucide-react'

export default function TerminalPage() {
  const [selectedCommand, setSelectedCommand] = useState<string | null>('ls')
  const [searchQuery, setSearchQuery] = useState('')

  // Commandes organisées par catégorie
  const commandsByCategory = {
    'Navigation': [
      {
        name: 'ls',
        description: 'Liste les fichiers et dossiers',
        syntax: 'ls [options] [chemin]',
        examples: ['ls', 'ls -l', 'ls -la', 'ls -lh'],
        options: [
          { flag: '-l', desc: 'Format long avec détails' },
          { flag: '-a', desc: 'Affiche les fichiers cachés' },
          { flag: '-h', desc: 'Tailles lisibles (KB, MB)' },
          { flag: '-R', desc: 'Liste récursive' },
        ],
        tips: ['Utilise ls -la pour tout voir, y compris les fichiers cachés comme .git'],
        traps: ['Ne pas confondre -l (long) avec -1 (un fichier par ligne)'],
      },
      {
        name: 'cd',
        description: 'Change de répertoire',
        syntax: 'cd [chemin]',
        examples: ['cd Documents', 'cd ..', 'cd ~', 'cd /Users/ton-login'],
        options: [],
        tips: ['cd sans argument ramène au dossier home', 'cd - revient au dossier précédent'],
        traps: ['Les espaces dans les chemins doivent être échappés avec \\ ou entre guillemets'],
      },
      {
        name: 'pwd',
        description: 'Affiche le chemin absolu du répertoire actuel',
        syntax: 'pwd',
        examples: ['pwd'],
        options: [],
        tips: ['Utilise pwd pour vérifier où tu es avant de faire rm ou mv'],
        traps: [],
      },
    ],
    'Fichiers': [
      {
        name: 'cat',
        description: 'Affiche le contenu d\'un fichier',
        syntax: 'cat [fichier]',
        examples: ['cat hello.c', 'cat file1.txt file2.txt', 'cat *.c'],
        options: [
          { flag: '-n', desc: 'Numéros de ligne' },
          { flag: '-e', desc: 'Affiche $ à la fin de chaque ligne' },
        ],
        tips: ['Utilise cat pour vérifier ton code avant de compiler'],
        traps: ['cat sur un gros fichier peut saturer le terminal'],
      },
      {
        name: 'cp',
        description: 'Copie des fichiers ou dossiers',
        syntax: 'cp [source] [destination]',
        examples: ['cp hello.c hello_backup.c', 'cp -r folder1 folder2'],
        options: [
          { flag: '-r', desc: 'Copie récursive (pour dossiers)' },
          { flag: '-i', desc: 'Demande confirmation avant écrasement' },
        ],
        tips: ['Toujours utiliser cp -r pour copier un dossier'],
        traps: ['cp écrase sans prévenir ! Utilise -i pour être sûr'],
      },
      {
        name: 'mv',
        description: 'Déplace ou renomme des fichiers',
        syntax: 'mv [source] [destination]',
        examples: ['mv old.c new.c', 'mv file.c folder/', 'mv *.c src/'],
        options: [
          { flag: '-i', desc: 'Demande confirmation avant écrasement' },
        ],
        tips: ['mv sert aussi à renommer : mv old.txt new.txt'],
        traps: ['mv écrase sans prévenir si le fichier existe déjà'],
      },
      {
        name: 'rm',
        description: 'Supprime des fichiers ou dossiers',
        syntax: 'rm [options] [fichier]',
        examples: ['rm test.c', 'rm *.o', 'rm -rf temp/'],
        options: [
          { flag: '-r', desc: 'Suppression récursive (dossiers)' },
          { flag: '-f', desc: 'Force sans confirmation' },
          { flag: '-i', desc: 'Demande confirmation' },
        ],
        tips: ['TOUJOURS vérifier avec ls avant de faire rm'],
        traps: ['rm -rf est DANGEREUX : suppression définitive sans corbeille !'],
      },
    ],
    'Compilation': [
      {
        name: 'gcc',
        description: 'Compile du code C',
        syntax: 'gcc [options] fichier.c',
        examples: [
          'gcc hello.c',
          'gcc -Wall -Wextra -Werror main.c',
          'gcc main.c -o mon_programme',
          'gcc *.c -o programme',
        ],
        options: [
          { flag: '-Wall', desc: 'Active tous les warnings' },
          { flag: '-Wextra', desc: 'Warnings supplémentaires' },
          { flag: '-Werror', desc: 'Traite les warnings comme erreurs' },
          { flag: '-o nom', desc: 'Nom du fichier de sortie' },
          { flag: '-g', desc: 'Inclut les symboles de debug' },
        ],
        tips: ['À la Piscine, TOUJOURS compiler avec -Wall -Wextra -Werror'],
        traps: ['Sans -o, le programme s\'appelle a.out par défaut'],
      },
      {
        name: 'make',
        description: 'Automatise la compilation',
        syntax: 'make [target]',
        examples: ['make', 'make clean', 'make fclean', 'make re'],
        options: [],
        tips: ['Lis toujours le Makefile pour comprendre les targets disponibles'],
        traps: ['make utilise des TABS, pas des espaces (erreur fréquente !)'],
      },
    ],
    'Recherche': [
      {
        name: 'grep',
        description: 'Recherche du texte dans des fichiers',
        syntax: 'grep [pattern] [fichier]',
        examples: [
          'grep "main" *.c',
          'grep -r "TODO" .',
          'grep -n "printf" hello.c',
        ],
        options: [
          { flag: '-r', desc: 'Recherche récursive' },
          { flag: '-n', desc: 'Affiche les numéros de ligne' },
          { flag: '-i', desc: 'Ignore la casse' },
        ],
        tips: ['grep est super utile pour trouver des fonctions dans un gros projet'],
        traps: [],
      },
      {
        name: 'find',
        description: 'Trouve des fichiers par nom',
        syntax: 'find [chemin] [options]',
        examples: [
          'find . -name "*.c"',
          'find . -type f -name "main.c"',
        ],
        options: [
          { flag: '-name', desc: 'Recherche par nom' },
          { flag: '-type f', desc: 'Fichiers seulement' },
          { flag: '-type d', desc: 'Dossiers seulement' },
        ],
        tips: ['Combine avec grep : find . -name "*.c" -exec grep "main" {} \\;'],
        traps: [],
      },
    ],
  }

  // Filtrage des commandes selon la recherche
  const filteredCommands = Object.entries(commandsByCategory).reduce((acc, [category, commands]) => {
    const filtered = commands.filter(cmd =>
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (filtered.length > 0) {
      acc[category] = filtered
    }
    return acc
  }, {} as Record<string, typeof commandsByCategory[keyof typeof commandsByCategory]>)

  const currentCommand = Object.values(commandsByCategory)
    .flat()
    .find(cmd => cmd.name === selectedCommand)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">💻 Terminal</h1>
        <p className="text-lg text-muted-foreground">
          Encyclopédie des commandes essentielles pour la Piscine
        </p>

        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher une commande..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Layout : Liste + Détail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des commandes par catégorie */}
        <div className="space-y-4">
          {Object.entries(filteredCommands).map(([category, commands]) => (
            <div key={category} className="border rounded-lg p-4 space-y-2">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wide">
                {category}
              </h3>
              <div className="space-y-1">
                {commands.map((cmd) => (
                  <button
                    key={cmd.name}
                    onClick={() => setSelectedCommand(cmd.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCommand === cmd.name
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div>
                      <div className="font-mono font-bold">{cmd.name}</div>
                      <div className="text-xs opacity-90 line-clamp-1">{cmd.description}</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Détail de la commande sélectionnée */}
        {currentCommand && (
          <div className="lg:col-span-2 border rounded-lg p-6 space-y-6 h-fit sticky top-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold font-mono">{currentCommand.name}</h2>
              </div>
              <p className="text-lg text-muted-foreground">{currentCommand.description}</p>
            </div>

            {/* Syntaxe */}
            <div>
              <h3 className="font-bold mb-2">📝 Syntaxe</h3>
              <pre className="bg-muted p-3 rounded-lg font-mono text-sm">
                {currentCommand.syntax}
              </pre>
            </div>

            {/* Exemples */}
            <div>
              <h3 className="font-bold mb-2">💡 Exemples</h3>
              <div className="space-y-2">
                {currentCommand.examples.map((example, idx) => (
                  <div key={idx} className="bg-muted p-3 rounded-lg">
                    <code className="font-mono text-sm">$ {example}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Options */}
            {currentCommand.options.length > 0 && (
              <div>
                <h3 className="font-bold mb-2">⚙️ Options principales</h3>
                <div className="space-y-2">
                  {currentCommand.options.map((option, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-muted p-3 rounded-lg">
                      <code className="font-mono font-bold text-primary">{option.flag}</code>
                      <span className="text-sm">{option.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {currentCommand.tips.length > 0 && (
              <div className="bg-success/10 border border-success rounded-lg p-4">
                <h3 className="font-bold mb-2 text-success">✓ Tips</h3>
                <ul className="space-y-1 text-sm">
                  {currentCommand.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-success">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pièges */}
            {currentCommand.traps.length > 0 && (
              <div className="bg-danger/10 border border-danger rounded-lg p-4">
                <h3 className="font-bold mb-2 text-danger">⚠️ Pièges à éviter</h3>
                <ul className="space-y-1 text-sm">
                  {currentCommand.traps.map((trap, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-danger">•</span>
                      <span>{trap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
