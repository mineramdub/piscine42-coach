'use client'

import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Copy, Check, Terminal, FileCode2 } from 'lucide-react'
import MarkdownText from '@/components/ui/MarkdownText'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  title?: string
  explanation?: string
  showLineNumbers?: boolean
}

export default function CodeBlock({
  code,
  language = 'c',
  filename,
  title,
  explanation,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  // Extraction automatique du nom de fichier depuis le code
  const extractedFilename = code.match(/\/\/ Fichier : (.+)/)?.[1]
  const displayFilename = filename || extractedFilename

  // Suppression du commentaire fichier du code affiché
  const cleanCode = code.replace(/\/\/ Fichier : .+\n?/, '').trim()

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayTitle = title || displayFilename || 'Code'
  const Icon = language === 'bash' ? Terminal : FileCode2

  return (
    <div className="w-fit max-w-full border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">{displayTitle}</span>
          <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-muted rounded transition-colors"
          title="Copier le code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Code avec syntax highlighting */}
      <Highlight theme={themes.nightOwl} code={cleanCode} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto`}
            style={{ ...style, margin: 0, padding: '1rem' }}
          >
            <div className="flex flex-col gap-0">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex gap-4">
                  {showLineNumbers && (
                    <span className="select-none text-muted-foreground/50 text-right" style={{ minWidth: '2em' }}>
                      {i + 1}
                    </span>
                  )}
                  <span className="flex-1">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </pre>
        )}
      </Highlight>

      {/* Explanation */}
      {explanation && (
        <div className="px-4 py-3 bg-muted/30 border-t">
          <MarkdownText className="text-sm text-muted-foreground">{explanation}</MarkdownText>
        </div>
      )}
    </div>
  )
}
