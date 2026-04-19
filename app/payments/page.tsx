'use client'
import React, { useState } from 'react'

export default function PaymentsPage() {
  const [amount, setAmount] = useState('')
  const [payee, setPayee] = useState('')

  return (
    <main className="main-content">
      <div className="container">
        <h1 className="section-title">Quick <strong>Payments</strong></h1>
        
        <div className="payment-dashboard">
          <div className="payment-form">
            <h3>Send Money Instantly</h3>
            <div className="form-group">
              <label>Select Payee</label>
              <select className="input-field" value={payee} onChange={e => setPayee(e.target.value)}>
                <option value="">Select a contact</option>
                <option value="Electricity Board">Electricity Board</option>
                <option value="Mobile Recharge">Mobile Recharge</option>
                <option value="John Doe">John Doe (Savings AC)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Amount (₹)</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="Enter amount" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
              />
            </div>
            <button className="submit-btn" onClick={() => alert('Payment Successful!')}>Pay Now</button>
          </div>

          <div className="payment-history">
            <h3>Recent Transactions</h3>
            <div className="tx-list">
              <div className="tx-item">
                <span>Netflix Subscription</span>
                <span className="tx-amt neg">- ₹499</span>
              </div>
              <div className="tx-item">
                <span>Salary Received</span>
                <span className="tx-amt pos">+ ₹85,000</span>
              </div>
              <div className="tx-item">
                <span>Starbucks Coffee</span>
                <span className="tx-amt neg">- ₹350</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container { max-width: 1000px; margin: 0 auto; }
        .payment-dashboard {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          margin-top: 2rem;
        }
        .payment-form, .payment-history {
          background: white;
          padding: 2.5rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow-md);
        }
        h3 { color: var(--primary-burgundy); margin-bottom: 2rem; font-size: 1.3rem; }
        .tx-list { display: flex; flex-direction: column; gap: 1.2rem; }
        .tx-item {
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid #eee;
          font-weight: 500;
        }
        .tx-amt.neg { color: var(--danger); }
        .tx-amt.pos { color: var(--success); }
        @media (max-width: 768px) {
          .payment-dashboard { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
