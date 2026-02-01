'use client'

import { Editor } from '@monaco-editor/react'
import { useState } from 'react'

interface CodeEditorProps {
  defaultValue?: string
  language?: string
  onChange?: (value: string | undefined) => void
  readOnly?: boolean
}

export default function CodeEditor({
  defaultValue = '',
  language = 'c',
  onChange,
  readOnly = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultValue)

  const handleChange = (value: string | undefined) => {
    setCode(value || '')
    onChange?.(value)
  }

  return (
    <div className="border rounded-lg overflow-hidden h-[500px]">
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={defaultValue}
        onChange={handleChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          readOnly,
        }}
      />
    </div>
  )
}
