'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Tag, 
  Plane, 
  Home, 
  ShoppingBag, 
  TrendingUp, 
  Gift, 
  Clock, 
  Zap,
  ChevronRight,
  Sparkles
} from 'lucide-react'

const DEALS = [
  { 
    id: 1, 
    title: '10% Cashback', 
    desc: 'On all flights booked via CrediMate Cards. Max cashback up to ₹5000.', 
    tag: 'Limited Time',
    icon: <Plane size={24} />,
    color: '#3B82F6',
    expiry: 'Ends in 2 days'
  },
  { 
    id: 2, 
    title: 'Zero Processing Fee', 
    desc: 'On Home Loans above ₹50 Lakhs. Exclusive offer for premier members.', 
    tag: 'Hot Deal',
    icon: <Home size={24} />,
    color: '#97144D',
    expiry: 'Valid till 30 Apr'
  },
  { 
    id: 3, 
    title: 'Amazon Voucher ₹500', 
    desc: 'On your first credit card transaction of ₹1000 or more.', 
    tag: 'New User',
    icon: <ShoppingBag size={24} />,
    color: '#FF9900',
    expiry: 'One time use'
  },
  { 
    id: 4, 
    title: 'Extra 0.5% Interest', 
    desc: 'Special FD rates for Senior Citizens on tenures above 1 year.', 
    tag: 'Best Seller',
    icon: <TrendingUp size={24} />,
    color: '#10B981',
    expiry: 'Limited Offer'
  },
]

export default function DealsPage() {
  return (
    <main className="deals-page">
      <div className="hero-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="badge"><Sparkles size={14} /> Personalized for You</div>
            <h1 className="page-title">Exclusive <span>Deals</span></h1>
            <p className="page-subtitle">Handpicked rewards and premium offers designed to elevate your lifestyle.</p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="deals-container">
          <div className="deals-grid">
            {DEALS.map((deal, i) => (
              <motion.div 
                key={deal.id} 
                className="deal-card-premium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="deal-header">
                  <div className="deal-icon-box" style={{ backgroundColor: `${deal.color}15`, color: deal.color }}>
                    {deal.icon}
                  </div>
                  <div className="deal-tag-new">{deal.tag}</div>
                </div>
                
                <div className="deal-body">
                  <h3>{deal.title}</h3>
                  <p>{deal.desc}</p>
                </div>

                <div className="deal-footer">
                  <div className="deal-expiry">
                    <Clock size={14} />
                    <span>{deal.expiry}</span>
                  </div>
                  <button className="claim-btn-new">
                    Claim Offer <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="referral-banner"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="referral-content">
              <Gift size={48} className="gift-icon" />
              <div className="text">
                <h2>Refer & Earn <strong>₹1000</strong></h2>
                <p>Invite your friends to CrediMate and get rewarded for every successful account opening.</p>
              </div>
            </div>
            <button className="refer-btn">Invite Friends <Zap size={18} /></button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .deals-page {
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
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.15);
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
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
          max-width: 600px;
          margin: 0 auto;
        }

        .deals-container {
          margin-top: -6rem;
        }

        .deals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .deal-card-premium {
          background: white;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(0,0,0,0.03);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .deal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .deal-icon-box {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .deal-tag-new {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: #f1f5f9;
          padding: 4px 12px;
          border-radius: 50px;
          color: #475569;
        }

        .deal-body {
          flex: 1;
        }

        .deal-body h3 {
          font-size: 1.4rem;
          color: var(--axis-text);
          margin-bottom: 0.75rem;
          font-weight: 800;
        }

        .deal-body p {
          font-size: 0.95rem;
          color: var(--axis-text-light);
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .deal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid #f1f5f9;
        }

        .deal-expiry {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #94a3b8;
        }

        .claim-btn-new {
          background: none;
          border: none;
          color: var(--primary-burgundy);
          font-weight: 800;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: transform 0.2s;
        }
        .claim-btn-new:hover { transform: translateX(5px); }

        .referral-banner {
          background: linear-gradient(135deg, var(--primary-burgundy) 0%, #c41e64 100%);
          color: white;
          padding: 3rem;
          border-radius: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 20px 40px rgba(151, 20, 77, 0.2);
        }

        .referral-content {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .gift-icon { opacity: 0.8; }

        .referral-content h2 { font-size: 2rem; font-weight: 300; }
        .referral-content h2 strong { font-weight: 900; }
        .referral-content p { opacity: 0.9; font-size: 1.1rem; margin-top: 0.5rem; max-width: 500px; }

        .refer-btn {
          background: white;
          color: var(--primary-burgundy);
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: transform 0.2s;
        }
        .refer-btn:hover { transform: scale(1.05); }

        @media (max-width: 768px) {
          .referral-banner { flex-direction: column; text-align: center; gap: 2rem; }
          .referral-content { flex-direction: column; gap: 1rem; }
          .page-title { font-size: 2.5rem; }
        }
      `}</style>
    </main>
  )
}
