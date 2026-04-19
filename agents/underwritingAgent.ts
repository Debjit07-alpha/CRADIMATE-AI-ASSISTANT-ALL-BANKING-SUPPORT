export async function underwritingAgent(score:number){
 if(score>750){
   return {status:'APPROVED',reason:'Instant Approval'}
 }
 if(score>=650){
   return {status:'DOC_REQUIRED',reason:'Upload Salary Slip'}
 }
 return {status:'REJECTED',reason:'Low Credit Score'}
}
