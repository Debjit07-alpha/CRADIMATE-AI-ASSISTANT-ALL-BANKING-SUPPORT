import { NextResponse } from 'next/server'
import { genAI } from '@/lib/gemini'

const systemInstruction = `You are the official AI Assistant for CrediMate.
Your job is to assist users with:
1. Loan inquiries (Personal, Home, Auto).
2. Interest rate details (Personal: starting at 10.49%, Home: starting at 8.75%).
3. Eligibility criteria and credit score requirements (ideal score is 750+).
4. General banking support.
Be highly professional, polite, concise, and helpful. Always talk like a premium bank representative.`

export async function POST(req: Request) {
  try {
    const { history, message } = await req.json()
    
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_key') {
      return NextResponse.json({ reply: 'Please configure your GEMINI_API_KEY in the .env.local file to activate my AI capabilities.' })
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction 
    })

    // Format history for Gemini SDK
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }))

    const chat = model.startChat({ history: formattedHistory })
    const result = await chat.sendMessage(message)
    const reply = result.response.text()

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ reply: 'Sorry, my server connection was interrupted. Please try again later.' }, { status: 500 })
  }
}
