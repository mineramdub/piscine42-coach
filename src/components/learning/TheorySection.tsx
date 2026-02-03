'use client'

import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { GraduationCap, AlertTriangle, Lightbulb, X, List } from 'lucide-react'
import type { TheorySection as TheorySectionType } from '@/types/exercise'
import CodeBlock from './CodeBlock'
import CodeTabs from './CodeTabs'
import TechTerm from './TechTerm'
import Aphorism from './Aphorism'
import { glossary } from './TechTerm'

interface TheorySectionProps {
  sections: TheorySectionType[]
  aphorismIndex?: number
}

export default function TheorySection({ sections, aphorismIndex = 0 }: TheorySectionProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [indexOpen, setIndexOpen] = useState(true)
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  // IntersectionObserver pour détecter la section active
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const element = sectionRefs.current.get(section.title)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.title)
            }
          })
        },
        {
          rootMargin: '-100px 0px -70% 0px',
          threshold: 0,
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sections])

  const scrollToSection = (title: string) => {
    const element = sectionRefs.current.get(title)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Détection ASCII art dans les paragraphes
  const containsAsciiArt = (text: string) => {
    return /[├└│]/.test(text)
  }

  return (
    <>
      <div className="border rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-success" />
          <h2 className="text-2xl font-bold">📚 Théorie détaillée</h2>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) sectionRefs.current.set(section.title, el)
              }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold border-l-4 border-success pl-3">
                {section.title}
              </h3>

              {/* Contenu avec Markdown */}
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    // Code blocks → CodeBlock component
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      const codeString = String(children).replace(/\n$/, '')

                      if (!inline && match) {
                        return (
                          <CodeBlock
                            code={codeString}
                            language={match[1]}
                          />
                        )
                      }

                      // Inline code: check if it's a glossary term
                      const termKey = codeString.toLowerCase().trim()
                      if (glossary[termKey]) {
                        return <TechTerm>{codeString}</TechTerm>
                      }

                      return (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                          {children}
                        </code>
                      )
                    },

                    // Pre: wrapper transparent
                    pre({ children }) {
                      return <>{children}</>
                    },

                    // Paragraphs: detect ASCII art
                    p({ children }) {
                      const text = String(children)
                      if (containsAsciiArt(text)) {
                        return <pre className="whitespace-pre font-mono text-sm">{children}</pre>
                      }
                      return <p>{children}</p>
                    },
                  }}
                >
                  {section.content}
                </ReactMarkdown>
              </div>

              {/* Exemples de code via CodeTabs */}
              {section.codeExamples && section.codeExamples.length > 0 && (
                <CodeTabs examples={section.codeExamples} language="c" />
              )}

              {/* Points clés + Erreurs courantes en flex wrap */}
              <div className="flex flex-wrap gap-4 items-start">
                {/* Points clés */}
                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className="w-fit max-w-full bg-success/10 border border-success rounded-lg p-4">
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
                  <div className="w-fit max-w-full bg-warning/10 border border-warning rounded-lg p-4">
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
            </div>
          ))}
        </div>
      </div>

      {/* Index flottant (desktop uniquement) */}
      {indexOpen ? (
        <div className="hidden lg:block fixed right-4 top-24 z-40 w-64 bg-background/95 backdrop-blur border rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-bold">Index</h3>
            <button
              onClick={() => setIndexOpen(false)}
              className="p-1 hover:bg-muted rounded transition-colors"
              aria-label="Fermer l'index"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Aphorisme (en premier) */}
          <div className="p-4">
            <Aphorism index={aphorismIndex} />
          </div>

          {/* Liste des sections */}
          <div className="p-4 border-t pt-4 max-h-96 overflow-y-auto">
            <nav className="space-y-2">
              {sections.map((section, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(section.title)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    activeSection === section.title
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'hover:bg-muted'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      ) : (
        // Bouton pour réouvrir l'index
        <button
          onClick={() => setIndexOpen(true)}
          className="hidden lg:block fixed right-4 top-24 z-40 p-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:opacity-90 transition-opacity"
          aria-label="Ouvrir l'index"
        >
          <List className="w-5 h-5" />
        </button>
      )}
    </>
  )
}
