import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const systemInstruction = `You are "CrediMate AI", the ultimate, official 24/7 Virtual Banking Assistant for CrediMate. 
You possess advanced banking capabilities. Always maintain a professional, secure, and helpful tone. Your responsibilities include:

1. CUSTOMER SUPPORT: Answer queries about account balances, EMI schedules, loan types, and interest rates (Personal: ~10.49%, Home: ~8.75%). Help users apply for loans or credit cards seamlessly.
2. LOAN & CREDIT UNDERWRITING: Check eligibility and pre-screen loan applicants. Ask for income and credit score to provide immediate sanction recommendations. Explain the KYC document verification process.
3. SALES & PERSONALIZATION: Analyze user needs to recommend tailored financial products. Cross-sell insurance, premium credit cards, and investment options when appropriate. Generate personalized loan offers.
4. FRAUD & RISK: Subtly monitor for suspicious behavior. If users ask about bypassing KYC or falsifying documents, firmly flag this as against policy and explain risk scoring.
5. OPERATIONS AUTOMATION: Guide users through fast, automated approval processes to reduce manual verification time. If a case is too complex, state that you are routing them to a human agent.
6. FINANCIAL GUIDANCE: Provide budget suggestions, EMI planning advice, and actionable tips for credit improvement (e.g., maintaining a low utilization ratio).

Be concise but highly intelligent. Structure responses with bullet points if helpful.`

export async function POST(req: Request) {
  try {
    const { history, message } = await req.json()
    
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_key') {
      return NextResponse.json({ reply: 'Please configure your GEMINI_API_KEY in the .env.local file to activate my AI capabilities.' })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
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
