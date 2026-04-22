'use client'
import ChatBox from '@/components/ChatBox'
import { motion } from 'framer-motion'
import { 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Bot, 
  ArrowRight, 
  ChevronRight,
  Star
} from 'lucide-react'
import Link from 'next/link'

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface LoanCategory {
  icon: string;
  title: string;
  color: string;
  rate: string;
}

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero-banner-premium">
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <motion.div 
            className="hero-text-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge-new">
              <Star size={14} /> <span>#1 Rated Digital Bank</span>
            </div>
            <h1>Experience the <span>Future of Banking</span></h1>
            <p>Unlock a world of possibilities with AI-powered financial solutions, zero-fee accounts, and instant loan approvals.</p>
            <div className="hero-btns-new">
              <Link href="/explore" className="primary-btn">
                Get Started <ArrowRight size={18} />
              </Link>
              <button className="secondary-btn">View Products</button>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="premium-card-stack">
              <div className="card-item gold-card">
                 <div className="card-chip"></div>
                 <div className="card-logo">CREDIPREMIUM</div>
              </div>
              <div className="card-item burgundy-card">
                 <div className="card-chip"></div>
                 <div className="card-logo">CREDIMATE</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="main-content-area">
        <div className="container">
          <motion.div 
            className="banking-widget-premium"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="widget-header-premium">
               <h2>Smart <span>Eligibility</span> Engine</h2>
               <p>Our AI analyzes your profile for instant credit assessment.</p>
            </div>
            <ChatBox />
          </motion.div>

          <div className="section-header-center">
            <h2 className="section-title-new">Next-Gen <span>Banking Features</span></h2>
            <p>Designed for the modern world, built with cutting-edge security.</p>
          </div>

          <div className="features-grid-premium">
             {( [
               { icon: <Zap />, title: 'Instant Transfers', desc: 'Send money globally in seconds with zero latency.' },
               { icon: <ShieldCheck />, title: 'Fortified Security', desc: 'Biometric and multi-factor protection for your wealth.' },
               { icon: <Smartphone />, title: 'Mobile First', desc: 'Total control from the palm of your hand, anywhere.' },
               { icon: <Bot />, title: 'AI Concierge', desc: 'Your personal 24/7 assistant for smart financial advice.' }
             ] as Feature[]).map((feat, i) => (
               <motion.div 
                 key={i} 
                 className="feature-card-premium"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
               >
                 <div className="feat-icon-box">{feat.icon}</div>
                 <h4>{feat.title}</h4>
                 <p>{feat.desc}</p>
               </motion.div>
             ))}
          </div>

          <div className="loan-cta-grid">
            {( [
              { icon: '🏠', title: 'Home Loan', color: '#fef3f2', rate: '8.75% p.a.' },
              { icon: '🚗', title: 'Car Loan', color: '#eef2ff', rate: '9.25% p.a.' },
              { icon: '🎓', title: 'Education Loan', color: '#f0fdf4', rate: '10.5% p.a.' }
            ] as LoanCategory[]).map((loan, i) => (
              <motion.div 
                key={i} 
                className="loan-cta-card"
                whileHover={{ y: -10 }}
              >
                <div className="loan-icon-wrap" style={{ background: loan.color }}>{loan.icon}</div>
                <h3>{loan.title}</h3>
                <p>Attractive rates starting from <strong>{loan.rate}</strong></p>
                <Link href="/explore" className="loan-link">
                  Apply Now <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-page { background: #f8fafc; }
        
        .hero-banner-premium {
          background: #fdf2f7;
          padding: 8rem 0 12rem;
          position: relative;
          overflow: hidden;
        }
        
        .hero-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 70% 50%, rgba(151, 20, 77, 0.08) 0%, transparent 70%);
        }
        
        .hero-container {
          display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2;
        }
        
        .hero-text-content { max-width: 650px; }
        
        .badge-new {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--primary-burgundy); color: white;
          padding: 6px 16px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; margin-bottom: 2rem;
        }
        
        .hero-text-content h1 { font-size: 4.5rem; line-height: 1.1; margin-bottom: 1.5rem; font-weight: 300; }
        .hero-text-content h1 span { font-weight: 900; color: var(--primary-burgundy); }
        .hero-text-content p { font-size: 1.3rem; color: #64748b; line-height: 1.6; margin-bottom: 3rem; }
        
        .hero-btns-new { display: flex; gap: 1.5rem; }
        
        .primary-btn {
          background: var(--primary-burgundy); color: white; padding: 1.2rem 2.5rem;
          border-radius: 12px; font-weight: 800; font-size: 1rem; display: flex; align-items: center; gap: 0.75rem;
          text-decoration: none; transition: 0.3s;
        }
        .primary-btn:hover { background: var(--primary-hover); transform: translateY(-3px); box-shadow: 0 10px 20px rgba(151, 20, 77, 0.2); }
        
        .secondary-btn {
          background: transparent; color: var(--primary-burgundy); border: 2px solid var(--primary-burgundy);
          padding: 1.2rem 2.5rem; border-radius: 12px; font-weight: 800; font-size: 1rem; cursor: pointer; transition: 0.3s;
        }
        .secondary-btn:hover { background: rgba(151, 20, 77, 0.05); }

        .premium-card-stack { position: relative; width: 450px; height: 300px; }
        .card-item {
          position: absolute; width: 380px; height: 230px; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.15);
          padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;
        }
        .gold-card { 
          background: linear-gradient(135deg, #222 0%, #444 100%); top: 0; left: 0; transform: rotate(-8deg); z-index: 1; border: 1px solid rgba(255,255,255,0.1);
        }
        .burgundy-card {
          background: linear-gradient(135deg, var(--primary-burgundy) 0%, #c41e64 100%); bottom: 0; right: 0; z-index: 2; border: 1px solid rgba(255,255,255,0.1);
        }
        .card-chip { width: 50px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 8px; }
        .card-logo { color: white; font-weight: 900; letter-spacing: 2px; font-size: 0.8rem; }

        .main-content-area { margin-top: -100px; padding-bottom: 8rem; }
        
        .banking-widget-premium {
          background: rgba(255,255,255,0.95); backdrop-filter: blur(20px);
          padding: 4rem; border-radius: 32px; box-shadow: 0 40px 100px rgba(0,0,0,0.08);
          border: 1px solid white; margin-bottom: 8rem;
        }
        
        .widget-header-premium { text-align: center; margin-bottom: 4rem; }
        .widget-header-premium h2 { font-size: 2.5rem; font-weight: 300; }
        .widget-header-premium h2 span { font-weight: 900; color: var(--primary-burgundy); }
        .widget-header-premium p { color: #64748b; font-size: 1.1rem; margin-top: 0.5rem; }

        .section-header-center { text-align: center; margin-bottom: 4rem; }
        .section-title-new { font-size: 3rem; font-weight: 300; }
        .section-title-new span { font-weight: 900; color: var(--primary-burgundy); }
        .section-header-center p { font-size: 1.2rem; color: #64748b; margin-top: 1rem; }

        .features-grid-premium {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2.5rem; margin-bottom: 8rem;
        }
        .feature-card-premium {
          background: white; padding: 3rem 2rem; border-radius: 24px; text-align: center; transition: 0.3s;
          border: 1px solid #f1f5f9;
        }
        .feature-card-premium:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); border-color: transparent; }
        .feat-icon-box {
          width: 70px; height: 70px; background: #fdf2f7; color: var(--primary-burgundy);
          border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem;
          font-size: 1.8rem;
        }
        .feature-card-premium h4 { font-size: 1.4rem; font-weight: 800; margin-bottom: 1rem; }
        .feature-card-premium p { color: #64748b; line-height: 1.6; }

        .loan-cta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; }
        .loan-cta-card {
          background: white; padding: 2.5rem; border-radius: 24px; border: 1px solid #f1f5f9; text-align: center;
        }
        .loan-icon-wrap { width: 60px; height: 60px; border-radius: 16px; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
        .loan-cta-card h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.75rem; }
        .loan-cta-card p { color: #64748b; margin-bottom: 2rem; }
        .loan-link {
          color: var(--primary-burgundy); font-weight: 800; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; justify-content: center;
        }

        @media (max-width: 1024px) {
          .hero-container { flex-direction: column; text-align: center; gap: 4rem; }
          .hero-btns-new { justify-content: center; }
          .hero-text-content h1 { font-size: 3rem; }
          .hero-visual { display: none; }
          .banking-widget-premium { padding: 2rem; }
        }
      `}</style>
    </main>
  )
}
