'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import ChatPanel from './ChatPanel'

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center z-40 group"
          aria-label="Ouvrir le chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></span>

          {/* Tooltip */}
          <div className="absolute right-full mr-3 bg-background border rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <p className="text-sm font-medium">Pose une question sur le cours</p>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full">
              <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-background"></div>
            </div>
          </div>
        </button>
      )}

      {/* Panel de chat */}
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
