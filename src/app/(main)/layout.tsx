import NavBar from '@/components/layout/NavBar'
import { LearningProvider } from '@/contexts/LearningContext'
import FloatingChatButton from '@/components/chat/FloatingChatButton'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LearningProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
        <FloatingChatButton />
      </div>
    </LearningProvider>
  )
}
