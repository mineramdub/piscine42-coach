'use client'

import { GraduationCap, AlertTriangle, Lightbulb } from 'lucide-react'
import type { TheorySection as TheorySectionType } from '@/types/exercise'

interface TheorySectionProps {
  sections: TheorySectionType[]
}

export default function TheorySection({ sections }: TheorySectionProps) {
  return (
    <div className="border rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <GraduationCap className="w-6 h-6 text-success" />
        <h2 className="text-2xl font-bold">📚 Théorie détaillée</h2>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-xl font-bold border-l-4 border-success pl-3">
              {section.title}
            </h3>

            {/* Contenu */}
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line">{section.content}</div>
            </div>

            {/* Exemples de code */}
            {section.codeExamples && section.codeExamples.length > 0 && (
              <div className="space-y-3">
                {section.codeExamples.map((example, exIdx) => (
                  <div key={exIdx} className="bg-muted rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium">{example.title}</p>
                    <pre className="font-mono text-sm overflow-x-auto bg-background p-3 rounded">
                      <code>{example.code}</code>
                    </pre>
                    <p className="text-sm text-muted-foreground italic">
                      → {example.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Points clés */}
            {section.keyPoints && section.keyPoints.length > 0 && (
              <div className="bg-success/10 border border-success rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-success" />
                  <h4 className="font-bold text-success">Points clés à retenir</h4>
                </div>
                <ul className="space-y-2">
                  {section.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-sm">
                      <span className="text-success mt-1">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Erreurs courantes */}
            {section.commonMistakes && section.commonMistakes.length > 0 && (
              <div className="bg-warning/10 border border-warning rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <h4 className="font-bold text-warning">Erreurs courantes à éviter</h4>
                </div>
                <ul className="space-y-2">
                  {section.commonMistakes.map((mistake, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2 text-sm">
                      <span className="text-warning mt-1">⚠</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
