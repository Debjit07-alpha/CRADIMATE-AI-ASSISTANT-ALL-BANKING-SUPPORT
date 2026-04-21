'use client'
import { useState } from 'react'
import { generateSanctionLetter } from '@/lib/generatePDF'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Wallet, 
  Calculator, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  AlertCircle
} from 'lucide-react'

interface LoanResult {
  status: 'APPROVED' | 'REJECTED' | 'DOC_REQUIRED' | 'REVIEW_REQUIRED';
  reason: string;
}

export default function ChatBox() {
  const [form, setForm] = useState({ name: '', income: '', amount: '', credit_score: '' })
  const [result, setResult] = useState<LoanResult | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/loan-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          income: Number(form.income),
          amount: Number(form.amount),
          credit_score: Number(form.credit_score)
        })
      })
      setResult(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="premium-chat-box">
      <form onSubmit={submit} className="loan-form">
        <div className="form-grid">
          <div className="input-group">
            <label><User size={16} /> Full Name</label>
            <input 
              type="text"
              placeholder="Enter your name" 
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
          
          <div className="input-group">
            <label><TrendingUp size={16} /> Annual Income (₹)</label>
            <input 
              type="number"
              placeholder="e.g. 8,00,000" 
              required
              value={form.income}
              onChange={e => setForm({ ...form, income: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label><Wallet size={16} /> Loan Amount (₹)</label>
            <input 
              type="number"
              placeholder="e.g. 5,00,000" 
              required
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label><ShieldCheck size={16} /> Credit Score</label>
            <input 
              type="number"
              placeholder="e.g. 750" 
              required
              value={form.credit_score}
              onChange={e => setForm({ ...form, credit_score: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" className="calculate-btn" disabled={loading}>
          {loading ? (
            <div className="loader-dots">
              <span></span><span></span><span></span>
            </div>
          ) : (
            <>
              Check Eligibility <Calculator size={18} />
            </>
          )}
        </button>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`result-container result-${result.status}`}
            >
              <div className="result-header">
                {result.status === 'APPROVED' ? (
                  <CheckCircle2 className="status-icon success" size={32} />
                ) : result.status === 'REJECTED' ? (
                  <XCircle className="status-icon danger" size={32} />
                ) : (
                  <AlertCircle className="status-icon warning" size={32} />
                )}
                <div>
                  <h4>{(result.status || 'PROCESSING').replace('_', ' ')}</h4>
                  <p>{result.reason || 'Processing your request...'}</p>
                </div>
              </div>

              {result.status === 'APPROVED' && (
                <motion.button 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="download-pdf-btn"
                  onClick={(e) => { 
                    e.preventDefault(); 
                    generateSanctionLetter(form.name || 'Applicant', Number(form.amount)); 
                  }}
                >
                  <FileText size={18} /> Download Sanction Letter <ArrowRight size={16} />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <style jsx>{`
        .premium-chat-box {
          background: #ffffff;
          border-radius: 20px;
        }

        .loan-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .input-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: #475569;
        }

        .input-group input {
          padding: 1rem 1.25rem;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          outline: none;
          transition: all 0.2s;
        }

        .input-group input:focus {
          border-color: var(--primary-burgundy);
          box-shadow: 0 0 0 4px rgba(151, 20, 77, 0.05);
        }

        .calculate-btn {
          background: var(--primary-burgundy);
          color: white;
          padding: 1.2rem;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .calculate-btn:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(151, 20, 77, 0.2);
        }

        .calculate-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loader-dots {
          display: flex;
          gap: 4px;
        }
        .loader-dots span {
          width: 8px; height: 8px; background: white; border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .loader-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loader-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }

        .result-container {
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        .result-APPROVED { background: #f0fdf4; border-color: #bcf0da; }
        .result-REJECTED { background: #fef2f2; border-color: #fecaca; }
        .result-REVIEW_REQUIRED { background: #fffbeb; border-color: #fef3c7; }

        .result-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .status-icon.success { color: #10b981; }
        .status-icon.danger { color: #ef4444; }
        .status-icon.warning { color: #f59e0b; }

        .result-header h4 { font-size: 1.4rem; font-weight: 900; color: #1e293b; margin-bottom: 0.25rem; text-transform: uppercase; }
        .result-header p { color: #64748b; font-size: 0.95rem; font-weight: 500; }

        .download-pdf-btn {
          margin-top: 1.5rem;
          width: 100%;
          background: #1e293b;
          color: white;
          padding: 1rem;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: 0.2s;
        }

        .download-pdf-btn:hover { background: #0f172a; }

        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
