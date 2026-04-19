export async function salesAgent(income:number,amount:number){
 if(amount < income*10){
   return {recommended:'Personal Loan',eligible:true}
 }
 return {recommended:'Lower Amount Suggested',eligible:false}
}
