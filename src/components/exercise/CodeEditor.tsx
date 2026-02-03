'use client'

import { Editor } from '@monaco-editor/react'

interface CodeEditorProps {
  value?: string
  defaultValue?: string
  language?: string
  onChange?: (value: string | undefined) => void
  readOnly?: boolean
}

export default function CodeEditor({
  value,
  defaultValue = '',
  language = 'c',
  onChange,
  readOnly = false,
}: CodeEditorProps) {
  return (
    <div className="border rounded-lg overflow-hidden h-[500px]">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
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
