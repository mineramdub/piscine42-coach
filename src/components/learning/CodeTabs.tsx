import CodeBlock from './CodeBlock'

export interface CodeExample {
  title: string
  code: string
  explanation: string
}

interface CodeTabsProps {
  examples: CodeExample[]
  language?: string
}

export default function CodeTabs({ examples, language = 'c' }: CodeTabsProps) {
  return (
    <div className="flex flex-wrap gap-4 items-start">
      {examples.map((example, index) => (
        <CodeBlock
          key={index}
          code={example.code}
          language={language}
          title={example.title}
          explanation={example.explanation}
        />
      ))}
    </div>
  )
}
