import {salesAgent} from './salesAgent'
import {verificationAgent} from './verificationAgent'
import {underwritingAgent} from './underwritingAgent'

interface LoanData {
  income: number;
  amount: number;
  credit_score: number;
  name?: string;
}

export async function masterAgent(data: LoanData) {
 const sales=await salesAgent(data.income,data.amount)
 if(!sales.eligible) return {status:'REJECTED',reason:'Amount too high'}

 const verify=await verificationAgent(data.credit_score)
 if(!verify.verified) return {status:'REJECTED',reason:'Verification failed'}

 return underwritingAgent(data.credit_score)
}
