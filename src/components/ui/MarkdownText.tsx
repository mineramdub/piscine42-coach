import ReactMarkdown from 'react-markdown'
import CodeBlock from '@/components/learning/CodeBlock'
import TechTerm from '@/components/learning/TechTerm'
import { glossary } from '@/components/learning/TechTerm'

interface MarkdownTextProps {
  children: string
  className?: string
  inline?: boolean
}

export default function MarkdownText({ children, className = '', inline = false }: MarkdownTextProps) {
  // Détection ASCII art
  const containsAsciiArt = (text: string) => {
    return /[├└│]/.test(text)
  }

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          // Code blocks → CodeBlock component
          code({ node, inline: isInline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const codeString = String(children).replace(/\n$/, '')

            // Block code
            if (!isInline && match) {
              return (
                <CodeBlock
                  code={codeString}
                  language={match[1]}
                  showLineNumbers={false}
                />
              )
            }

            // Inline code: check if it's a glossary term
            const termKey = codeString.toLowerCase().trim()
            if (glossary[termKey]) {
              return <TechTerm>{codeString}</TechTerm>
            }

            // Regular inline code
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

          // Strong (bold)
          strong({ children }) {
            return <strong className="font-bold">{children}</strong>
          },

          // Em (italic)
          em({ children }) {
            return <em className="italic">{children}</em>
          },

          // Lists
          ul({ children }) {
            return <ul className="list-disc list-inside space-y-1">{children}</ul>
          },

          ol({ children }) {
            return <ol className="list-decimal list-inside space-y-1">{children}</ol>
          },

          li({ children }) {
            return <li className="text-sm">{children}</li>
          },

          // Links
          a({ href, children }) {
            return (
              <a
                href={href}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
