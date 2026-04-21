'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CreditCard, 
  Send, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Coffee, 
  ShoppingBag, 
  Smartphone, 
  Zap, 
  User, 
  Plus,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Wallet,
  ShieldCheck
} from 'lucide-react'

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  icon: React.ReactNode;
  color: string;
}

interface Payee {
  id: string;
  name: string;
  type: string;
  icon: React.ReactNode;
}

const TRANSACTIONS: Transaction[] = [
  { id: 1, title: 'Netflix Subscription', amount: -499, category: 'Entertainment', date: '20 Apr, 2026', icon: <Zap size={18} />, color: '#E50914' },
  { id: 2, title: 'Salary Received', amount: 85000, category: 'Income', date: '18 Apr, 2026', icon: <TrendingUp size={18} />, color: '#10B981' },
  { id: 3, title: 'Starbucks Coffee', amount: -350, category: 'Food', date: '17 Apr, 2026', icon: <Coffee size={18} />, color: '#00704A' },
  { id: 4, title: 'Amazon Purchase', amount: -2499, category: 'Shopping', date: '15 Apr, 2026', icon: <ShoppingBag size={18} />, color: '#FF9900' },
  { id: 5, title: 'Mobile Recharge', amount: -799, category: 'Utilities', date: '14 Apr, 2026', icon: <Smartphone size={18} />, color: '#3B82F6' },
]

const PAYEES: Payee[] = [
  { id: '1', name: 'Electricity Board', type: 'Utility', icon: <Zap size={20} /> },
  { id: '2', name: 'Mobile Recharge', type: 'Service', icon: <Smartphone size={20} /> },
  { id: '3', name: 'John Doe', type: 'Savings AC', icon: <User size={20} /> },
  { id: '4', name: 'Sarah Wilson', type: 'Credit Card', icon: <CreditCard size={20} /> },
]

export default function PaymentsPage() {
  const [amount, setAmount] = useState('')
  const [selectedPayee, setSelectedPayee] = useState('')
  const [isPaying, setIsPaying] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handlePayment = () => {
    if (!amount || !selectedPayee) return
    setIsPaying(true)
    setTimeout(() => {
      setIsPaying(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      setAmount('')
      setSelectedPayee('')
    }, 2000)
  }

  return (
    <main className="payments-page">
      <div className="hero-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-title"
          >
            Smart <span>Payments</span>
          </motion.h1>
          <p className="page-subtitle">Instant, secure, and rewarding transfers at your fingertips.</p>
        </div>
      </div>

      <div className="container">
        <div className="payment-grid">
          {/* Left Column: Payment Controls */}
          <div className="payment-controls">
            <motion.div 
              className="glass-card main-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="card-header">
                <h3>Send Money Instantly</h3>
                <ShieldCheck size={20} className="secure-icon" />
              </div>

              <div className="form-sections">
                <div className="section">
                  <label>Select Payee</label>
                  <div className="payee-grid">
                    {PAYEES.map((payee) => (
                      <motion.div
                        key={payee.id}
                        className={`payee-card ${selectedPayee === payee.id ? 'active' : ''}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPayee(payee.id)}
                      >
                        <div className="payee-icon">{payee.icon}</div>
                        <span>{payee.name}</span>
                      </motion.div>
                    ))}
                    <motion.div className="payee-card add-new" whileHover={{ scale: 1.05 }}>
                      <div className="payee-icon"><Plus size={20} /></div>
                      <span>Add New</span>
                    </motion.div>
                  </div>
                </div>

                <div className="section">
                  <label>Enter Amount (₹)</label>
                  <div className="amount-input-wrapper">
                    <span className="currency">₹</span>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="amount-input"
                    />
                  </div>
                </div>

                <div className="section">
                  <label>Payment Mode</label>
                  <div className="payment-mode-selector">
                    <div className="mode-item active">
                      <Wallet size={18} />
                      <div className="mode-info">
                        <span>Savings Account</span>
                        <small>Bal: ₹1,24,500.00</small>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  className={`pay-btn ${isPaying ? 'loading' : ''}`}
                  onClick={handlePayment}
                  disabled={!amount || !selectedPayee || isPaying}
                >
                  {isPaying ? <div className="loader"></div> : (
                    <>
                      <span>Proceed to Pay</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div 
              className="glass-card small-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-item">
                <div className="stat-label">Daily Limit Remaining</div>
                <div className="stat-value">₹4,50,000 / ₹5,00,000</div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '90%' }}></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: History and Insights */}
          <div className="payment-insights">
            <motion.div 
              className="glass-card history-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="card-header">
                <h3>Recent Activity</h3>
                <button className="view-all">View All <ChevronRight size={16} /></button>
              </div>

              <div className="tx-list">
                {TRANSACTIONS.map((tx, i) => (
                  <motion.div 
                    key={tx.id}
                    className="tx-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="tx-icon-box" style={{ backgroundColor: `${tx.color}15`, color: tx.color }}>
                      {tx.icon}
                    </div>
                    <div className="tx-info">
                      <div className="tx-title">{tx.title}</div>
                      <div className="tx-meta">
                        <span><Clock size={12} /> {tx.date}</span>
                        <span className="dot"></span>
                        <span>{tx.category}</span>
                      </div>
                    </div>
                    <div className={`tx-amount ${tx.amount > 0 ? 'pos' : 'neg'}`}>
                      {tx.amount > 0 ? '+' : ''} ₹{Math.abs(tx.amount).toLocaleString()}
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
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <div className="success-icon-box">
                <CheckCircle2 size={64} className="success-icon" />
              </div>
              <h2>Payment Successful!</h2>
              <p>Your transaction of ₹{amount} has been processed.</p>
              <button className="done-btn" onClick={() => setShowSuccess(false)}>Done</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .payments-page {
          background: #f8fafc;
          min-height: 100vh;
          padding-bottom: 5rem;
        }
        .hero-header {
          background: var(--primary-burgundy);
          color: white;
          padding: 6rem 0 10rem;
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
          text-align: center;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5%;
        }
        .page-title {
          font-size: 3.5rem;
          font-weight: 300;
          margin-bottom: 1rem;
        }
        .page-title span {
          font-weight: 900;
          color: #ffcae0;
        }
        .page-subtitle {
          font-size: 1.1rem;
          opacity: 0.8;
        }

        .payment-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 2.5rem;
          margin-top: -6rem;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.5);
          margin-bottom: 2rem;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .card-header h3 {
          font-size: 1.4rem;
          color: var(--axis-text);
          font-weight: 800;
        }
        .secure-icon { color: var(--success); }

        .form-sections {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        label {
          display: block;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--axis-text-light);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .payee-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 1rem;
        }

        .payee-card {
          background: #f1f5f9;
          padding: 1.5rem 1rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
          text-align: center;
        }
        .payee-card span { font-size: 0.8rem; font-weight: 700; color: #475569; }
        .payee-icon {
          width: 44px;
          height: 44px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-burgundy);
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .payee-card.active {
          background: #fef2f2;
          border-color: var(--primary-burgundy);
        }
        .payee-card.active .payee-icon {
          background: var(--primary-burgundy);
          color: white;
        }
        .payee-card.add-new {
          border: 2px dashed #cbd5e1;
          background: transparent;
        }

        .amount-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .currency {
          position: absolute;
          left: 1.5rem;
          font-size: 2rem;
          font-weight: 900;
          color: var(--axis-text);
        }
        .amount-input {
          width: 100%;
          padding: 1.5rem 1.5rem 1.5rem 3.5rem;
          border-radius: 16px;
          border: 2px solid #e2e8f0;
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--axis-text);
          outline: none;
          transition: border-color 0.2s;
        }
        .amount-input:focus { border-color: var(--primary-burgundy); }

        .payment-mode-selector .mode-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.2rem;
          background: #f8fafc;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }
        .mode-item.active { border-color: var(--primary-burgundy); background: #fdf2f7; }
        .mode-info span { display: block; font-weight: 700; color: var(--axis-text); }
        .mode-info small { color: var(--axis-text-light); }

        .pay-btn {
          width: 100%;
          padding: 1.2rem;
          border-radius: 16px;
          background: var(--primary-burgundy);
          color: white;
          border: none;
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pay-btn:hover:not(:disabled) { background: var(--primary-hover); transform: translateY(-2px); }
        .pay-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .loader {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .stat-item .stat-label { font-size: 0.85rem; color: #64748b; margin-bottom: 0.5rem; }
        .stat-item .stat-value { font-weight: 800; font-size: 1.1rem; margin-bottom: 1rem; }
        .progress-bar { height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
        .progress { height: 100%; background: var(--primary-burgundy); border-radius: 4px; }

        .tx-list { display: flex; flex-direction: column; gap: 1rem; }
        .tx-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 16px;
          transition: background 0.2s;
        }
        .tx-item:hover { background: #f8fafc; }
        .tx-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tx-info { flex: 1; }
        .tx-title { font-weight: 700; color: var(--axis-text); margin-bottom: 0.25rem; }
        .tx-meta { display: flex; align-items: center; gap: 0.75rem; font-size: 0.75rem; color: #94a3b8; }
        .tx-meta .dot { width: 4px; height: 4px; background: #cbd5e1; border-radius: 50%; }
        .tx-amount { font-weight: 800; font-size: 1rem; }
        .tx-amount.pos { color: var(--success); }
        .tx-amount.neg { color: var(--danger); }

        .view-all { background: none; border: none; color: var(--primary-burgundy); font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.25rem; }

        .insight-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem; }
        .insight-item { display: flex; align-items: center; gap: 1rem; }
        .insight-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .insight-icon.pos { background: #ecfdf5; color: var(--success); }
        .insight-icon.neg { background: #fef2f2; color: var(--danger); }
        .insight-info small { display: block; color: #64748b; font-size: 0.75rem; }
        .insight-info strong { font-size: 1.1rem; color: var(--axis-text); }

        .success-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px); z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 2rem;
        }
        .success-card {
          background: white; padding: 4rem 2rem; border-radius: 32px;
          text-align: center; max-width: 400px; width: 100%;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .success-icon-box {
          width: 120px; height: 120px; background: #f0fdf4;
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 2rem;
        }
        .success-icon { color: var(--success); }
        .success-card h2 { font-size: 2rem; margin-bottom: 1rem; color: var(--axis-text); }
        .success-card p { color: #64748b; margin-bottom: 2.5rem; }
        .done-btn {
          width: 100%; padding: 1.2rem; border-radius: 16px;
          background: var(--axis-text); color: white; border: none;
          font-weight: 700; cursor: pointer;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 1024px) {
          .payment-grid { grid-template-columns: 1fr; }
          .page-title { font-size: 2.5rem; }
        }
      `}</style>
    </main>
  )
}
