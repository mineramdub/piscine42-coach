'use client'

import { useState } from 'react'
import { GitBranch, Search, ChevronRight, Shield, Sparkles, Zap } from 'lucide-react'

export default function GitPage() {
  const [selectedLevel, setSelectedLevel] = useState<number>(1)
  const [selectedCommand, setSelectedCommand] = useState<string>('git init')
  const [searchQuery, setSearchQuery] = useState('')

  const levels = [
    {
      level: 1,
      title: 'Niveau 1 : Survivre',
      description: 'Les commandes minimum vital pour la Piscine',
      icon: Shield,
      color: 'primary',
      commands: [
        {
          name: 'git init',
          description: 'Crée un nouveau dépôt Git',
          syntax: 'git init',
          when: 'Au début de chaque projet',
          examples: ['git init', 'git init mon-projet'],
          workflow: ['cd dans ton dossier de projet', 'git init', 'git add .', 'git commit -m "Initial commit"'],
          tips: ['Crée un dossier .git caché', 'À faire une seule fois par projet'],
          traps: ['Ne jamais faire git init dans ton home (~) !'],
        },
        {
          name: 'git add',
          description: 'Ajoute des fichiers au staging',
          syntax: 'git add [fichiers]',
          when: 'Avant chaque commit',
          examples: ['git add .', 'git add main.c', 'git add *.c', 'git add -A'],
          workflow: ['Modifie tes fichiers', 'git add pour les staging', 'git commit pour sauvegarder'],
          tips: ['git add . ajoute tout le dossier courant', 'git add -A ajoute tout le repo'],
          traps: ['git add . n\'ajoute pas les fichiers supprimés (utilise git add -A)'],
        },
        {
          name: 'git commit',
          description: 'Sauvegarde tes modifications',
          syntax: 'git commit -m "message"',
          when: 'Après avoir testé ton code',
          examples: [
            'git commit -m "Add ft_strlen"',
            'git commit -m "Fix segfault in main"',
            'git commit -m "Update Makefile"',
          ],
          workflow: ['git add pour staging', 'Teste ton code', 'git commit avec message clair'],
          tips: ['Message en anglais (convention 42)', 'Présent ou impératif : "Add" pas "Added"', 'Commit souvent !'],
          traps: ['Ne jamais commit sans avoir testé', 'Évite les messages vagues : "update", "fix"'],
        },
        {
          name: 'git status',
          description: 'Affiche l\'état du dépôt',
          syntax: 'git status',
          when: 'Tout le temps !',
          examples: ['git status'],
          workflow: ['Utilise git status avant add', 'Utilise git status avant commit', 'Utilise git status... toujours !'],
          tips: ['Montre les fichiers modifiés, staged, untracked', 'Utilise-le constamment pour savoir où tu en es'],
          traps: [],
        },
        {
          name: 'git log',
          description: 'Affiche l\'historique des commits',
          syntax: 'git log [options]',
          when: 'Pour voir l\'historique',
          examples: ['git log', 'git log --oneline', 'git log -3', 'git log --graph'],
          workflow: [],
          tips: ['--oneline pour un format compact', 'q pour quitter le log'],
          traps: [],
        },
      ],
    },
    {
      level: 2,
      title: 'Niveau 2 : Être propre',
      description: 'Git comme un pro',
      icon: Sparkles,
      color: 'success',
      commands: [
        {
          name: 'git diff',
          description: 'Montre les modifications non stagées',
          syntax: 'git diff [options]',
          when: 'Avant de commit',
          examples: ['git diff', 'git diff main.c', 'git diff --staged'],
          workflow: ['Modifie des fichiers', 'git diff pour voir les changements', 'git add puis git commit'],
          tips: ['git diff --staged montre ce qui va être commité', 'Vérifie toujours avant de commit !'],
          traps: ['git diff ne montre pas les fichiers staged (utilise --staged)'],
        },
        {
          name: 'git branch',
          description: 'Gère les branches',
          syntax: 'git branch [nom]',
          when: 'Pour travailler sur plusieurs features',
          examples: ['git branch', 'git branch ma-feature', 'git branch -d old-branch'],
          workflow: [],
          tips: ['git branch sans argument liste les branches', 'git branch -a montre aussi les branches distantes'],
          traps: [],
        },
        {
          name: 'git checkout',
          description: 'Change de branche ou restaure des fichiers',
          syntax: 'git checkout [branche/fichier]',
          when: 'Pour changer de branche',
          examples: ['git checkout main', 'git checkout -b nouvelle-branche', 'git checkout -- main.c'],
          workflow: ['git checkout -b pour créer et basculer', 'git checkout pour basculer entre branches'],
          tips: ['-b crée et bascule en une seule commande', 'git checkout -- fichier annule les modifications'],
          traps: ['Commit avant de changer de branche sinon tu perds tes modifications !'],
        },
        {
          name: 'git merge',
          description: 'Fusionne des branches',
          syntax: 'git merge [branche]',
          when: 'Pour intégrer une feature',
          examples: ['git merge ma-feature'],
          workflow: ['git checkout main', 'git merge ma-feature', 'Résoudre conflits si besoin'],
          tips: [],
          traps: ['Merge conflicts : Git ne peut pas fusionner automatiquement'],
        },
        {
          name: 'git clone',
          description: 'Clone un dépôt distant',
          syntax: 'git clone [url]',
          when: 'Pour récupérer un projet',
          examples: ['git clone https://github.com/user/repo.git', 'git clone git@github.com:user/repo.git'],
          workflow: [],
          tips: ['Clone via SSH (git@) si tu as configuré une clé SSH'],
          traps: [],
        },
        {
          name: 'git push',
          description: 'Envoie tes commits vers le serveur',
          syntax: 'git push [remote] [branche]',
          when: 'Pour sauvegarder sur GitHub',
          examples: ['git push', 'git push origin main', 'git push -u origin main'],
          workflow: [],
          tips: ['-u définit la branche upstream (à faire une fois)', 'Push régulièrement pour ne pas perdre ton code'],
          traps: ['git push --force est DANGEREUX (écrase l\'historique distant)'],
        },
        {
          name: 'git pull',
          description: 'Récupère et fusionne les changements distants',
          syntax: 'git pull [remote] [branche]',
          when: 'Pour synchroniser avec le serveur',
          examples: ['git pull', 'git pull origin main'],
          workflow: [],
          tips: ['git pull = git fetch + git merge', 'Fais un pull avant de push'],
          traps: ['Peut créer des conflits si tu as des modifications locales'],
        },
      ],
    },
    {
      level: 3,
      title: 'Niveau 3 : Gérer le chaos',
      description: 'Réparer les erreurs et situations complexes',
      icon: Zap,
      color: 'warning',
      commands: [
        {
          name: 'git reset',
          description: 'Annule des commits ou unstage des fichiers',
          syntax: 'git reset [options] [commit]',
          when: 'Pour annuler des erreurs',
          examples: ['git reset HEAD main.c', 'git reset --soft HEAD~1', 'git reset --hard HEAD~1'],
          workflow: [],
          tips: ['--soft : garde les modifications', '--hard : SUPPRIME tout (dangereux !)'],
          traps: ['git reset --hard est irréversible !'],
        },
        {
          name: 'git stash',
          description: 'Met de côté des modifications temporairement',
          syntax: 'git stash [options]',
          when: 'Pour changer de branche rapidement',
          examples: ['git stash', 'git stash pop', 'git stash list', 'git stash apply'],
          workflow: ['git stash pour sauvegarder', 'Change de branche', 'git stash pop pour récupérer'],
          tips: ['Utile pour tester quelque chose sans commit', 'git stash pop = apply + drop'],
          traps: [],
        },
        {
          name: 'git rebase',
          description: 'Réécrit l\'historique',
          syntax: 'git rebase [branche]',
          when: 'Pour avoir un historique linéaire',
          examples: ['git rebase main', 'git rebase -i HEAD~3'],
          workflow: [],
          tips: ['-i (interactive) pour réorganiser/modifier des commits', 'Utile pour nettoyer avant un push'],
          traps: ['Ne jamais rebase des commits déjà pushés !', 'Peut créer des conflits complexes'],
        },
        {
          name: 'git cherry-pick',
          description: 'Applique un commit spécifique',
          syntax: 'git cherry-pick [commit]',
          when: 'Pour récupérer un commit d\'une autre branche',
          examples: ['git cherry-pick abc123'],
          workflow: [],
          tips: ['Utile pour appliquer un fix sur plusieurs branches'],
          traps: [],
        },
        {
          name: 'git reflog',
          description: 'Journal de toutes les actions Git',
          syntax: 'git reflog',
          when: 'Pour retrouver un commit perdu',
          examples: ['git reflog', 'git reset --hard HEAD@{2}'],
          workflow: [],
          tips: ['Le filet de sécurité ultime !', 'Permet de récupérer presque tout'],
          traps: [],
        },
      ],
    },
  ]

  const currentLevel = levels.find(l => l.level === selectedLevel)!
  const currentCommand = currentLevel.commands.find(cmd => cmd.name === selectedCommand)

  const filteredLevels = levels.map(level => ({
    ...level,
    commands: level.commands.filter(cmd =>
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(level => level.commands.length > 0)

  const getLevelColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-primary/10 border-primary text-primary',
      success: 'bg-success/10 border-success text-success',
      warning: 'bg-warning/10 border-warning text-warning',
    }
    return colors[color]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">🌿 Git</h1>
        <p className="text-lg text-muted-foreground">
          Maîtrise Git par niveaux - du strict minimum au contrôle total
        </p>

        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher une commande Git..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Sélection de niveau */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levels.map((level) => {
          const Icon = level.icon
          return (
            <button
              key={level.level}
              onClick={() => {
                setSelectedLevel(level.level)
                setSelectedCommand(level.commands[0].name)
              }}
              className={`p-6 border rounded-lg text-left transition-all ${
                selectedLevel === level.level
                  ? getLevelColor(level.color)
                  : 'border-border hover:border-primary'
              }`}
            >
              <Icon className="w-8 h-8 mb-3" />
              <h3 className="font-bold mb-2">{level.title}</h3>
              <p className="text-sm opacity-90">{level.description}</p>
              <p className="text-xs mt-2 opacity-75">{level.commands.length} commandes</p>
            </button>
          )
        })}
      </div>

      {/* Layout : Liste + Détail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des commandes */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wide px-3">
            Commandes
          </h3>
          <div className="border rounded-lg p-2 space-y-1">
            {currentLevel.commands.map((cmd) => (
              <button
                key={cmd.name}
                onClick={() => setSelectedCommand(cmd.name)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  selectedCommand === cmd.name
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex-1">
                  <div className="font-mono font-bold text-sm">{cmd.name}</div>
                  <div className="text-xs opacity-90 line-clamp-1">{cmd.description}</div>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Détail de la commande */}
        {currentCommand && (
          <div className="lg:col-span-2 border rounded-lg p-6 space-y-6 h-fit sticky top-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <GitBranch className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold font-mono">{currentCommand.name}</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-3">{currentCommand.description}</p>
              {currentCommand.when && (
                <p className="text-sm bg-muted px-3 py-2 rounded-lg inline-block">
                  <strong>Quand l&apos;utiliser :</strong> {currentCommand.when}
                </p>
              )}
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

            {/* Workflow */}
            {currentCommand.workflow.length > 0 && (
              <div>
                <h3 className="font-bold mb-2">🔄 Workflow typique</h3>
                <div className="space-y-2">
                  {currentCommand.workflow.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-sm pt-0.5">{step}</span>
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
