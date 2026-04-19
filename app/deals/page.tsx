'use client'
import React from 'react'

export default function DealsPage() {
  const deals = [
    { title: '10% Cashback', desc: 'On all flights booked via CrediMate Cards', tag: 'Limited Time' },
    { title: 'Zero Processing Fee', desc: 'On Home Loans above ₹50 Lakhs', tag: 'Hot Deal' },
    { title: 'Amazon Voucher ₹500', desc: 'On your first credit card transaction', tag: 'New User' },
    { title: 'Extra 0.5% Interest', desc: 'For Senior Citizens on Fixed Deposits', tag: 'Best Seller' },
  ]

  return (
    <main className="main-content">
      <div className="container">
        <h1 className="section-title">Grab <strong>Exclusive Deals</strong></h1>
        <p style={{ textAlign: 'center', color: 'var(--axis-text-light)', marginBottom: '3rem' }}>
          Handpicked rewards and offers just for you.
        </p>

        <div className="deals-grid">
          {deals.map((deal, i) => (
            <div key={i} className="deal-card">
              <div className="deal-tag">{deal.tag}</div>
              <h3>{deal.title}</h3>
              <p>{deal.desc}</p>
              <button className="claim-btn">Claim Offer</button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .container { max-width: 1200px; margin: 0 auto; }
        .deals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .deal-card {
          background: linear-gradient(135deg, #fff 0%, #fff5f8 100%);
          padding: 2.5rem 2rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow-md);
          position: relative;
          text-align: center;
          border: 1px solid #ffeef4;
        }
        .deal-tag {
          position: absolute;
          top: 15px;
          right: 15px;
          background: var(--primary-burgundy);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .deal-card h3 { color: var(--axis-text); margin-bottom: 1rem; font-size: 1.5rem; }
        .deal-card p { color: var(--axis-text-light); font-size: 0.95rem; margin-bottom: 2rem; height: 3rem; }
        .claim-btn {
          background: var(--primary-burgundy);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }
        .claim-btn:hover { background: var(--primary-hover); transform: scale(1.05); }
      `}</style>
    </main>
  )
}
