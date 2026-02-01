'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SectionContext {
  type: 'lesson' | 'theory' | 'prep' | 'exercise' | null
  title: string
  content: string
  stepNumber?: number
}

interface LearningContextType {
  currentSection: SectionContext | null
  setCurrentSection: (section: SectionContext | null) => void
}

const LearningContext = createContext<LearningContextType | undefined>(undefined)

export function LearningProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState<SectionContext | null>(null)

  return (
    <LearningContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </LearningContext.Provider>
  )
}

export function useLearning() {
  const context = useContext(LearningContext)
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider')
  }
  return context
}
