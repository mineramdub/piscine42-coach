import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

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
    const systemInstruction = `Tu es un assistant pédagogique pour la Piscine 42. Tu aides les débutants en programmation C.

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

    // Convertir les messages au format Gemini (user/model au lieu de user/assistant)
    const geminiMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }))

    // Initialiser le modèle avec les instructions système
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction,
    })

    // Créer une session de chat
    const chat = model.startChat({
      history: geminiMessages.slice(0, -1), // Tous les messages sauf le dernier
    })

    // Envoyer le dernier message
    const lastMessage = messages[messages.length - 1]
    const result = await chat.sendMessage(lastMessage.content)
    const response = result.response
    const text = response.text()

    return NextResponse.json({
      message: text,
      usage: {
        // Gemini ne fournit pas toujours les détails d'usage
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    )
  }
}
