import { loadExercisesByDay } from '@/lib/exercises/loader'
import LessonSection from '@/components/learning/LessonSection'
import TheorySection from '@/components/learning/TheorySection'
import PrepExercisesSection from '@/components/learning/PrepExercisesSection'
import ReviewSection from '@/components/learning/ReviewSection'

export default function AujourdhuiPage() {
  // Charger les exercices du jour 1 (par défaut)
  const currentDay = 4 // Simulation : jour 4 pour voir les rappels (printf de J+3)
  const exercises = loadExercisesByDay(1)
  const todayExercise = exercises.find(ex => ex.category === 'c') || exercises[0]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">🌊 Aujourd&apos;hui</h1>
          <div className="text-sm text-muted-foreground">
            Jour {currentDay} / 30
          </div>
        </div>

        {/* Barre de progression */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression globale</span>
            <span className="text-muted-foreground">3%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[3%]"></div>
          </div>
        </div>
      </div>

      {/* Section Rappels (Répétition espacée) */}
      <ReviewSection currentDay={currentDay} />

      {/* Section Apprentissage */}
      {todayExercise.learningContent && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold">📚 Apprends d'abord</h2>
            <span className="text-sm text-muted-foreground">
              Suis le cours avant de commencer l'exercice
            </span>
          </div>

          {/* Mini-cours interactif */}
          {todayExercise.learningContent.lesson && (
            <LessonSection lesson={todayExercise.learningContent.lesson} />
          )}

          {/* Théorie détaillée */}
          {todayExercise.learningContent.theory && (
            <TheorySection sections={todayExercise.learningContent.theory} />
          )}

          {/* Exercices préparatoires */}
          {todayExercise.learningContent.prepExercises && (
            <PrepExercisesSection exercises={todayExercise.learningContent.prepExercises} />
          )}

          {/* Séparateur */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm font-medium text-muted-foreground px-4">
              Maintenant, passe à l'exercice principal
            </span>
            <div className="flex-1 h-px bg-border"></div>
          </div>
        </div>
      )}

      {/* Mission du jour */}
      <div className="bg-primary/10 border border-primary rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold">🎯 Mission du jour</h2>
        {todayExercise ? (
          <div className="space-y-2">
            <p className="text-lg">
              Aujourd&apos;hui tu dois : <strong>{todayExercise.title}</strong>
            </p>
            <p className="text-muted-foreground">
              {todayExercise.description}
            </p>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                ⏱️ Temps estimé : {todayExercise.estimatedTime} min
              </span>
              <span className="flex items-center gap-1">
                🔥 Difficulté : {todayExercise.difficulty}/5
              </span>
              <span className="flex items-center gap-1">
                ⭐ Points : {todayExercise.points}
              </span>
            </div>
          </div>
        ) : (
          <p>Aucun exercice disponible pour aujourd&apos;hui</p>
        )}
      </div>

      {/* Objectifs d'apprentissage */}
      {todayExercise && todayExercise.learningObjectives && (
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold">📚 Ce que tu vas apprendre</h3>
          <ul className="space-y-2">
            {todayExercise.learningObjectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-success mt-1">✓</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Code starter */}
      {todayExercise && todayExercise.starterCode && (
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold">💻 Code de départ</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm font-mono">{todayExercise.starterCode}</code>
          </pre>
        </div>
      )}

      {/* Hints */}
      {todayExercise && todayExercise.hints && todayExercise.hints.length > 0 && (
        <div className="border border-warning bg-warning/10 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold">💡 Indices</h3>
          <ul className="space-y-2">
            {todayExercise.hints.map((hint, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-warning mt-1">•</span>
                <span>{hint}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tests */}
      {todayExercise && todayExercise.testCases && (
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold">🧪 Tests à valider</h3>
          <div className="space-y-3">
            {todayExercise.testCases
              .filter(test => test.visible)
              .map((test) => (
                <div key={test.id} className="bg-muted p-4 rounded-lg">
                  <p className="font-medium mb-2">{test.description}</p>
                  {test.stdin && (
                    <p className="text-sm text-muted-foreground">
                      Entrée : <code className="bg-background px-2 py-1 rounded">{test.stdin}</code>
                    </p>
                  )}
                  {test.expectedStdout && (
                    <p className="text-sm text-muted-foreground">
                      Sortie attendue : <code className="bg-background px-2 py-1 rounded">{test.expectedStdout}</code>
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        {todayExercise && (
          <a
            href={`/exercice/${todayExercise.id}`}
            className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center"
          >
            Commencer l&apos;exercice
          </a>
        )}
        <button className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors">
          Je suis bloquée 🆘
        </button>
      </div>
    </div>
  )
}
