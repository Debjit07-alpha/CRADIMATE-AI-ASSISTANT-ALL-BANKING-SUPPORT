'use client'
import AiChat from '@/components/AiChat'
import { motion } from 'framer-motion'
import { MessageSquare, ShieldCheck, Zap, Info } from 'lucide-react'

export default function ChatPage() {
  return (
    <main className="chat-page">
      <div className="hero-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="page-title">AI <span>Concierge</span></h1>
            <p className="page-subtitle">Your 24/7 intelligent companion for all things banking and finance.</p>
          </motion.div>
        </div>
      </div>

      <div className="container chat-container">
        <div className="chat-layout">
          <div className="chat-sidebar">
             <motion.div 
               className="glass-card info-card"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
             >
               <div className="card-header-icon">
                 <Info size={24} />
               </div>
               <h3>Smart Assistant</h3>
               <p>Our AI can help you with a variety of tasks instantly.</p>
               <ul className="help-list">
                 <li><Zap size={16} /> Loan Eligibility</li>
                 <li><ShieldCheck size={16} /> Security Queries</li>
                 <li><MessageSquare size={16} /> Card Recommendations</li>
               </ul>
               <div className="sidebar-footer">
                 <small>Powered by Gemini 1.5 Pro</small>
               </div>
             </motion.div>
          </div>
          <div className="chat-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AiChat />
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chat-page {
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

        .chat-container {
          margin-top: -6rem;
        }

        .chat-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2.5rem;
          align-items: flex-start;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .info-card {
          text-align: center;
        }
        .card-header-icon {
          width: 50px;
          height: 50px;
          background: #fdf2f7;
          color: var(--primary-burgundy);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .info-card h3 {
          font-size: 1.4rem;
          margin-bottom: 0.75rem;
          color: var(--axis-text);
        }
        .info-card p {
          font-size: 0.9rem;
          color: var(--axis-text-light);
          margin-bottom: 2rem;
        }

        .help-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          text-align: left;
          margin-bottom: 2.5rem;
        }
        .help-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          color: #475569;
          font-size: 0.9rem;
        }

        .sidebar-footer {
          border-top: 1px solid #f1f5f9;
          padding-top: 1.5rem;
        }
        .sidebar-footer small {
          color: #94a3b8;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .chat-layout {
            grid-template-columns: 1fr;
          }
          .chat-sidebar {
            display: none;
          }
        }
      `}</style>
    </main>
  )
}
