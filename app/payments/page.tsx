'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  ArrowDownLeft,
  Coffee,
  ShoppingBag,
  Smartphone,
  Zap,
  User,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Wallet,
  ShieldCheck,
  CreditCard,
} from 'lucide-react'

interface Transaction {
  id: number
  title: string
  amount: number
  category: string
  date: string
  icon: React.ReactNode
  color: string
}

const TRANSACTIONS: Transaction[] = [
  { id: 1, title: 'Netflix Subscription',  amount: -499,   category: 'Entertainment', date: '20 Apr, 2026', icon: <Zap size={18} />,         color: '#E50914' },
  { id: 2, title: 'Salary Received',        amount: 85000,  category: 'Income',        date: '18 Apr, 2026', icon: <TrendingUp size={18} />,   color: '#10B981' },
  { id: 3, title: 'Starbucks Coffee',       amount: -350,   category: 'Food',          date: '17 Apr, 2026', icon: <Coffee size={18} />,       color: '#00704A' },
  { id: 4, title: 'Amazon Purchase',        amount: -2499,  category: 'Shopping',      date: '15 Apr, 2026', icon: <ShoppingBag size={18} />,  color: '#FF9900' },
  { id: 5, title: 'Mobile Recharge',        amount: -799,   category: 'Utilities',     date: '14 Apr, 2026', icon: <Smartphone size={18} />,  color: '#3B82F6' },
]

const PAYEES = [
  { value: 'Electricity Board', label: 'Electricity Board' },
  { value: 'Mobile Recharge',   label: 'Mobile Recharge'   },
  { value: 'John Doe',          label: 'John Doe (Savings AC)' },
  { value: 'Sarah Wilson',      label: 'Sarah Wilson (Credit Card)' },
]

export default function PaymentsPage() {
  const [amount,      setAmount]      = useState('')
  const [payee,       setPayee]       = useState('')
  const [isPaying,    setIsPaying]    = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [paidAmount,  setPaidAmount]  = useState('')

  const handlePayment = () => {
    if (!amount || !payee) return
    setIsPaying(true)
    setPaidAmount(amount)
    setTimeout(() => {
      setIsPaying(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3500)
      setAmount('')
      setPayee('')
    }, 2000)
  }

  return (
    <main className="payments-page">
      {/* ── Hero Header ── */}
      <div className="hero-header">
        <div className="container">
          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Smart <span>Payments</span>
          </motion.h1>
          <p className="page-subtitle">Instant, secure, and rewarding transfers at your fingertips.</p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container">
        <h2 className="section-title">
          Quick <strong>Payments</strong>
        </h2>

        <div className="payment-dashboard">
          {/* ── Left: Payment Form ── */}
          <motion.div
            className="glass-card payment-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card-header">
              <h3>Send Money Instantly</h3>
              <ShieldCheck size={20} className="secure-icon" />
            </div>

            <div className="form-sections">
              {/* Payee Select */}
              <div className="form-group">
                <label htmlFor="payee-select">Select Payee</label>
                <div className="select-wrapper">
                  <select
                    id="payee-select"
                    className="input-field"
                    value={payee}
                    onChange={(e) => setPayee(e.target.value)}
                  >
                    <option value="">Select a contact</option>
                    {PAYEES.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                  <ChevronRight size={18} className="select-arrow" />
                </div>
              </div>

              {/* Amount */}
              <div className="form-group">
                <label htmlFor="amount-input">Amount (₹)</label>
                <div className="amount-input-wrapper">
                  <span className="currency">₹</span>
                  <input
                    id="amount-input"
                    type="number"
                    className="amount-input"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              {/* Payment Mode */}
              <div className="form-group">
                <label>Payment Mode</label>
                <div className="mode-item active">
                  <Wallet size={18} />
                  <div className="mode-info">
                    <span>Savings Account</span>
                    <small>Bal: ₹1,24,500.00</small>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                className={`submit-btn${isPaying ? ' loading' : ''}`}
                onClick={handlePayment}
                disabled={!amount || !payee || isPaying}
              >
                {isPaying ? (
                  <div className="loader" />
                ) : (
                  <>
                    <span>Pay Now</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>

            {/* Daily Limit */}
            <div className="limit-bar">
              <div className="limit-labels">
                <span>Daily Limit Used</span>
                <span className="limit-val">₹50,000 / ₹5,00,000</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '10%' }} />
              </div>
            </div>
          </motion.div>

          {/* ── Right: Recent Transactions + Insights ── */}
          <div className="payment-insights">
            <motion.div
              className="glass-card history-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="card-header">
                <h3>Recent Transactions</h3>
                <button className="view-all">View All <ChevronRight size={16} /></button>
              </div>

              <div className="tx-list">
                {TRANSACTIONS.map((tx, i) => (
                  <motion.div
                    key={tx.id}
                    className="tx-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="tx-icon-box" style={{ backgroundColor: `${tx.color}18`, color: tx.color }}>
                      {tx.icon}
                    </div>
                    <div className="tx-info">
                      <div className="tx-title">{tx.title}</div>
                      <div className="tx-meta">
                        <Clock size={11} />
                        <span>{tx.date}</span>
                        <span className="dot" />
                        <span>{tx.category}</span>
                      </div>
                    </div>
                    <div className={`tx-amt ${tx.amount > 0 ? 'pos' : 'neg'}`}>
                      {tx.amount > 0 ? '+' : '-'} ₹{Math.abs(tx.amount).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="glass-card summary-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3>Spending Insight</h3>
              <div className="insight-grid">
                <div className="insight-item">
                  <div className="insight-icon neg"><TrendingDown size={18} /></div>
                  <div className="insight-info">
                    <small>Monthly Spent</small>
                    <strong>₹14,580</strong>
                  </div>
                </div>
                <div className="insight-item">
                  <div className="insight-icon pos"><TrendingUp size={18} /></div>
                  <div className="insight-info">
                    <small>Rewards Earned</small>
                    <strong>2,450 Pts</strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Success Overlay ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="success-card"
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
            >
              <div className="success-icon-box">
                <CheckCircle2 size={64} className="success-icon" />
              </div>
              <h2>Payment Successful!</h2>
              <p>Your transaction of <strong>₹{Number(paidAmount).toLocaleString()}</strong> has been processed.</p>
              <button className="done-btn" onClick={() => setShowSuccess(false)}>Done</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        /* ── Page Shell ── */
        .payments-page {
          background: #f8fafc;
          min-height: 100vh;
          padding-bottom: 5rem;
        }

        /* ── Hero ── */
        .hero-header {
          background: var(--primary-burgundy, #97144D);
          color: white;
          padding: 5rem 0 9rem;
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
          text-align: center;
        }
        .page-title {
          font-size: 3rem;
          font-weight: 300;
          margin-bottom: 0.75rem;
        }
        .page-title span { font-weight: 900; color: #ffcae0; }
        .page-subtitle { font-size: 1.1rem; opacity: 0.8; }

        /* ── Container ── */
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 5%;
        }

        /* ── Section Title ── */
        .section-title {
          font-size: 1.85rem;
          font-weight: 300;
          color: #1e293b;
          margin: 2.5rem 0 1.5rem;
        }
        .section-title strong {
          font-weight: 900;
          color: var(--primary-burgundy, #97144D);
        }

        /* ── Dashboard Grid ── */
        .payment-dashboard {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2.5rem;
        }

        /* ── Glass Card ── */
        .glass-card {
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.6);
          margin-bottom: 2rem;
        }

        /* ── Card Header ── */
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .card-header h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--primary-burgundy, #97144D);
        }
        .secure-icon { color: #10b981; }

        /* ── Form Sections ── */
        .form-sections { display: flex; flex-direction: column; gap: 1.75rem; }

        .form-group label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 0.6rem;
        }

        /* ── Select ── */
        .select-wrapper { position: relative; }
        .input-field {
          width: 100%;
          padding: 0.9rem 1.25rem;
          border-radius: 14px;
          border: 2px solid #e2e8f0;
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          background: #f8fafc;
          outline: none;
          appearance: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .input-field:focus { border-color: var(--primary-burgundy, #97144D); box-shadow: 0 0 0 3px rgba(151,20,77,0.08); }
        .select-arrow {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          color: #94a3b8;
          pointer-events: none;
        }

        /* ── Amount ── */
        .amount-input-wrapper { position: relative; display: flex; align-items: center; }
        .currency {
          position: absolute;
          left: 1.25rem;
          font-size: 1.8rem;
          font-weight: 900;
          color: #1e293b;
        }
        .amount-input {
          width: 100%;
          padding: 1.2rem 1.2rem 1.2rem 3.2rem;
          border-radius: 14px;
          border: 2px solid #e2e8f0;
          font-size: 2.2rem;
          font-weight: 900;
          color: #1e293b;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #f8fafc;
        }
        .amount-input:focus { border-color: var(--primary-burgundy, #97144D); box-shadow: 0 0 0 3px rgba(151,20,77,0.08); }

        /* ── Payment Mode ── */
        .mode-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.2rem;
          background: #f8fafc;
          border-radius: 14px;
          border: 2px solid #e2e8f0;
        }
        .mode-item.active { border-color: var(--primary-burgundy, #97144D); background: #fdf2f7; }
        .mode-info span { display: block; font-weight: 700; color: #1e293b; font-size: 0.95rem; }
        .mode-info small { color: #64748b; font-size: 0.8rem; }

        /* ── Submit Button ── */
        .submit-btn {
          width: 100%;
          padding: 1.1rem;
          border-radius: 14px;
          background: var(--primary-burgundy, #97144D);
          color: white;
          border: none;
          font-size: 1.05rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.3px;
        }
        .submit-btn:hover:not(:disabled) {
          background: #7a1040;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(151,20,77,0.35);
        }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── Spinner ── */
        .loader {
          width: 22px; height: 22px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* ── Daily Limit ── */
        .limit-bar { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #f1f5f9; }
        .limit-labels { display: flex; justify-content: space-between; font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem; }
        .limit-val { font-weight: 700; color: #1e293b; }
        .progress-bar { height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
        .progress { height: 100%; background: var(--primary-burgundy, #97144D); border-radius: 4px; transition: width 0.5s ease; }

        /* ── Tx List ── */
        .tx-list { display: flex; flex-direction: column; gap: 0.25rem; }
        .tx-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 0.75rem;
          border-radius: 14px;
          border-bottom: 1px solid #f1f5f9;
          transition: background 0.15s;
        }
        .tx-item:last-child { border-bottom: none; }
        .tx-item:hover { background: #f8fafc; }
        .tx-icon-box {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .tx-info { flex: 1; min-width: 0; }
        .tx-title { font-weight: 700; color: #1e293b; margin-bottom: 0.2rem; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .tx-meta { display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; color: #94a3b8; }
        .tx-meta .dot { width: 3px; height: 3px; background: #cbd5e1; border-radius: 50%; }
        .tx-amt { font-weight: 800; font-size: 0.95rem; white-space: nowrap; }
        .tx-amt.pos { color: #10b981; }
        .tx-amt.neg { color: #ef4444; }

        .view-all { background: none; border: none; color: var(--primary-burgundy, #97144D); font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.2rem; font-size: 0.85rem; }

        /* ── Spending Insight ── */
        .summary-card h3 { font-size: 1.1rem; font-weight: 800; color: var(--primary-burgundy, #97144D); margin-bottom: 1.25rem; }
        .insight-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .insight-item { display: flex; align-items: center; gap: 0.85rem; }
        .insight-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .insight-icon.pos { background: #ecfdf5; color: #10b981; }
        .insight-icon.neg { background: #fef2f2; color: #ef4444; }
        .insight-info small { display: block; color: #64748b; font-size: 0.72rem; }
        .insight-info strong { font-size: 1rem; color: #1e293b; font-weight: 800; }

        /* ── Success Overlay ── */
        .success-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 2rem;
        }
        .success-card {
          background: white; padding: 3.5rem 2.5rem; border-radius: 28px;
          text-align: center; max-width: 380px; width: 100%;
          box-shadow: 0 25px 60px rgba(0,0,0,0.2);
        }
        .success-icon-box {
          width: 110px; height: 110px; background: #f0fdf4;
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 1.75rem;
        }
        .success-icon { color: #10b981; }
        .success-card h2 { font-size: 1.75rem; margin-bottom: 0.75rem; color: #1e293b; }
        .success-card p { color: #64748b; margin-bottom: 2rem; font-size: 0.95rem; line-height: 1.6; }
        .done-btn {
          width: 100%; padding: 1.1rem; border-radius: 14px;
          background: var(--primary-burgundy, #97144D); color: white; border: none;
          font-weight: 700; cursor: pointer; font-size: 1rem;
          transition: background 0.2s;
        }
        .done-btn:hover { background: #7a1040; }

        /* ── Keyframes ── */
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .payment-dashboard { grid-template-columns: 1fr; }
          .page-title { font-size: 2.2rem; }
          .section-title { font-size: 1.5rem; }
        }
        @media (max-width: 480px) {
          .glass-card { padding: 1.75rem 1.25rem; }
          .amount-input { font-size: 1.6rem; }
        }
      `}</style>
    </main>
  )
}
