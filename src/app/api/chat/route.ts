import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(request: NextRequest) {
  try {
    const { messages, context } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // Construire le prompt système avec le contexte
    const systemPrompt = `Tu es un assistant pédagogique pour la Piscine 42. Tu aides les débutants en programmation C.

${context ? `CONTEXTE ACTUEL :
Type: ${context.type}
Titre: ${context.title}
${context.stepNumber ? `Étape: ${context.stepNumber}` : ''}

Contenu de la section:
${context.content}

---
` : ''}

Règles importantes :
- Réponds en français
- Sois pédagogue et encourage l'étudiant
- Donne des exemples concrets en C
- Si la question concerne le contenu de la section ci-dessus, réfère-toi y directement
- N'oublie pas que l'utilisateur est débutant : explique simplement
- Utilise des analogies si ça aide à comprendre
- Si l'étudiant demande la solution directe, encourage-le d'abord à réfléchir, puis donne des indices progressifs

Format de réponse :
- Reste concis (2-4 paragraphes max)
- Utilise des emojis pour rendre ça plus engageant (mais pas trop)
- Propose toujours un exemple de code si pertinent
`

    // Appel à l'API Claude
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages,
    })

    const assistantMessage = response.content[0]

    if (assistantMessage.type !== 'text') {
      return NextResponse.json(
        { error: 'Unexpected response type' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: assistantMessage.text,
      usage: response.usage,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    )
  }
}
