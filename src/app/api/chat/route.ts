import { NextRequest, NextResponse } from 'next/server'

// Mock responses
const assistantResponses = {
  javascript: [
    "🤖 Ah, JavaScript! Have you verified that you are using `const` and `let` correctly instead of `var`? Sometimes the scope problems can be misleading.",
    "🤖 With JavaScript, it's always good to check if you are handling promises correctly. Have you verified that you are using async/await or .then()/.catch() correctly?",
    "🤖 Have you tried using console.log() to debug step by step? Sometimes the solution becomes clearer when you see exactly what values you have at each point.",
  ],
  react: [
    "🤖 In React, many problems are solved by thinking about the data flow. Are you passing the props correctly down?",
    "🤖 Have you considered if you need to use useEffect? Remember that React re-renders when the state or props change.",
    "🤖 The React hooks have specific rules. Are you calling them always in the same order and at the top level of the component?",
  ],
  css: [
    "🤖 With CSS, sometimes the problem is in the specificity. Have you tried inspecting the element in the browser's dev tools?",
    "🤖 Flexbox and Grid can solve many layout problems. Have you considered which one would be more appropriate for your case?",
    "🤖 Are you using the correct units? rem, em, px, %, vh, vw... each one has its purpose.",
  ],
  python: [
    "🤖 In Python, many errors come from the indentation. Have you verified that all the lines are correctly aligned?",
    "🤖 Are you handling the exceptions appropriately? A try/except can save you from many headaches.",
    "🤖 Python is very expressive. Sometimes rewriting the code in a simpler and more readable way helps to find the error.",
  ],
  general: [
    "🤖 Have you tried explaining the problem step by step? Sometimes just verbalizing it helps to find the solution.",
    "🤖 What did you expect to happen vs what is actually happening? This difference usually points to where the problem is.",
    "🤖 Have you tried simplifying the problem? Sometimes creating a minimal example helps to isolate the issue.",
    "🤖 Have you reviewed the official documentation? Often it has examples that can illuminate the path.",
    "🤖 Does it work in a different environment? Sometimes the problem is in the configuration, not in the code.",
    "🤖 Have you tried commenting out parts of the code to isolate where the problem is?",
    "🤖 Think & Code works because it forces us to be methodical. What have you tried so far?",
  ]
}

// Función para detectar el contexto/tecnología de la pregunta
function detectContext(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('javascript') || lowerMessage.includes('js') || 
      lowerMessage.includes('node') || lowerMessage.includes('npm')) {
    return 'javascript'
  }
  if (lowerMessage.includes('react') || lowerMessage.includes('jsx') || 
      lowerMessage.includes('hook') || lowerMessage.includes('component')) {
    return 'react'
  }
  if (lowerMessage.includes('css') || lowerMessage.includes('style') || 
      lowerMessage.includes('flexbox') || lowerMessage.includes('grid')) {
    return 'css'
  }
  if (lowerMessage.includes('python') || lowerMessage.includes('django') || 
      lowerMessage.includes('flask') || lowerMessage.includes('pip')) {
    return 'python'
  }
  
  return 'general'
}

function generateAssistantResponse(message: string): string {
  const context = detectContext(message)
  const responses = assistantResponses[context as keyof typeof assistantResponses]
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)]
  
  if (message.toLowerCase().includes('error') || message.toLowerCase().includes('falla')) {
    return `🤖 I see that you have an error. ${randomResponse}\n\nCan you share the exact error message? That would help me guide you better.`
  }
  
  if (message.toLowerCase().includes('no funciona') || message.toLowerCase().includes('no anda')) {
    return `🤖 I understand your frustration. ${randomResponse}\n\nWhat specific behavior did you expect vs what is actually happening?`
  }
  
  if (message.toLowerCase().includes('como') || message.toLowerCase().includes('cómo')) {
    return `🤖 ¡Good question! ${randomResponse}\n\nHave you tried looking for examples in the official documentation of the technology you are using?`
  }
  
  return randomResponse
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    const response = generateAssistantResponse(message)
    
    return NextResponse.json({ response })
    
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Assistant API is working! 🤖',
    endpoints: {
      POST: 'Send a message to get assistant advice'
    }
  })
}