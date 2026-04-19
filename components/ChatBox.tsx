'use client'
import {useState} from 'react'
import { generateSanctionLetter } from '@/lib/generatePDF'

export default function ChatBox(){
 const [form,setForm]=useState({name:'',income:'',amount:'',credit_score:''})
 const [result,setResult]=useState<any>(null)
 const [loading,setLoading]=useState(false)

 async function submit(e: React.FormEvent){
   e.preventDefault()
   setLoading(true)
   setResult(null)
   try {
     const res=await fetch('/api/loan-process',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        ...form,
        income:Number(form.income),
        amount:Number(form.amount),
        credit_score:Number(form.credit_score)
      })
     })
     setResult(await res.json())
   } catch(err) {
     console.error(err)
   } finally {
     setLoading(false)
   }
 }

 return (
  <div>
    <form onSubmit={submit} className="form-grid">
      <div className="form-group">
        <label>Full Name</label>
        <input 
          type="text"
          className="input-field"
          placeholder="Enter your name" 
          required
          value={form.name}
          onChange={e=>setForm({...form,name:e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Annual Income (₹)</label>
        <input 
          type="number"
          className="input-field"
          placeholder="e.g. 500000" 
          required
          value={form.income}
          onChange={e=>setForm({...form,income:e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Loan Amount Required (₹)</label>
        <input 
          type="number"
          className="input-field"
          placeholder="e.g. 100000" 
          required
          value={form.amount}
          onChange={e=>setForm({...form,amount:e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Credit Score</label>
        <input 
          type="number"
          className="input-field"
          placeholder="e.g. 750" 
          required
          value={form.credit_score}
          onChange={e=>setForm({...form,credit_score:e.target.value})}
        />
      </div>
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? <span className="spinner"></span> : 'Calculate Eligibility'}
      </button>

      {result && (
        <div className={`result-card result-${result.status}`}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{result.status.replace('_', ' ')}</h2>
          <p>{result.reason}</p>
          {result.status === 'APPROVED' && (
            <button 
              className="apply-btn" 
              style={{marginTop: '1.5rem', background: '#97144D', color: 'white'}}
              onClick={(e) => { e.preventDefault(); generateSanctionLetter(form.name || 'Applicant', Number(form.amount)); }}
            >
              📄 Download Sanction Letter
            </button>
          )}
        </div>
      )}
    </form>
  </div>
 )
}
