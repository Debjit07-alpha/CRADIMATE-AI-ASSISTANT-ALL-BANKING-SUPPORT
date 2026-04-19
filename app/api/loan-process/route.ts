import {NextResponse} from 'next/server'
import {masterAgent} from '@/agents/masterAgent'
import {supabase} from '@/lib/supabase'

export async function POST(req:Request){
  try {
    const body=await req.json()
    const result=await masterAgent(body)

    // Only try to insert if the URL is valid, to prevent errors for users without keys
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http')) {
      const { error } = await supabase.from('loan_applications').insert({
        user_name:body.name,
        amount:body.amount,
        status:result.status,
        reason:result.reason
      })
      if (error) console.error("Supabase insert error:", error)
    }

    return NextResponse.json(result)
  } catch (err: any) {
    console.error("Loan process API error:", err)
    return NextResponse.json(
      { status: 'ERROR', reason: err.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
