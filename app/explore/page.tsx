'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  HandCoins, 
  CreditCard, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  ChevronRight,
  Star,
  CheckCircle2
} from 'lucide-react'
import Image from 'next/image'

interface Product {
  title: string;
  image: string;
  description: string;
}

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  products: Product[];
  color: string;
  reverse?: boolean;
}

const HoverCard = ({ product }: { product: Product }) => (
  <motion.div 
    className="featured-card"
    whileHover="hover"
    initial="rest"
  >
    <div className="card-image-wrapper">
      <Image 
        src={product.image} 
        alt={product.title} 
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="card-image"
        style={{ objectFit: 'cover' }}
      />
      <div className="card-overlay">
        <motion.div 
          className="hover-content"
          variants={{
            rest: { opacity: 0, y: 20 },
            hover: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="hover-title">{product.title}</h3>
          <p className="hover-desc">{product.description}</p>
          <div className="hover-actions">
            <button className="know-more-btn">Know More</button>
            <button className="apply-now-btn">Apply Now</button>
          </div>
        </motion.div>
        <motion.div 
          className="rest-content"
          variants={{
            rest: { opacity: 1 },
            hover: { opacity: 0 }
          }}
        >
          <h3 className="rest-title">{product.title}</h3>
          <div className="rest-icon-circle">
            <ChevronRight size={20} />
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
)

const CategorySection = ({ title, icon, subtitle, products, color, reverse = false }: CategoryProps) => (
  <section className={`category-block ${reverse ? 'reverse' : ''}`}>
    <div className="container">
      <div className="category-info">
        <div className="badge" style={{ backgroundColor: `${color}20`, color: color }}>
          {icon}
          <span>{title}</span>
        </div>
        <h2 className="cat-title">{title} <strong>Solutions</strong></h2>
        <p className="cat-subtitle">{subtitle}</p>
        <div className="feature-list">
          <div className="feature-item"><CheckCircle2 size={18} /> Instant digital processing</div>
          <div className="feature-item"><CheckCircle2 size={18} /> Best-in-class interest rates</div>
          <div className="feature-item"><CheckCircle2 size={18} /> 24/7 dedicated support</div>
        </div>
      </div>
      <div className="products-grid">
        {products.map((p, i) => (
          <HoverCard key={i} product={p} />
        ))}
      </div>
    </div>
  </section>
)

export default function ExplorePage() {
  const loanProducts: Product[] = [
    {
      title: 'Home Loan',
      image: '/images/loans.png',
      description: 'Own your dream home with interest rates starting at 8.5% and zero processing fees.',
    },
    {
      title: 'Personal Loan',
      image: '/images/personal_loan.png',
      description: 'Quick collateral-free loans up to ₹40 Lakhs with instant approval for your personal needs.',
    }
  ]

  const accountProducts: Product[] = [
    {
      title: 'Savings Account',
      image: '/images/accounts.png',
      description: 'High-yield savings with up to 7% interest and premium lifestyle privileges.',
    },
    {
      title: 'Corporate Account',
      image: '/images/accounts.png',
      description: 'Seamless business banking with advanced treasury and payroll management tools.',
    }
  ]

  const cardProducts: Product[] = [
    {
      title: 'Credit Cards',
      image: '/images/cards.png',
      description: 'Unlimited rewards and airport lounge access with our metal-edition luxury cards.',
    },
    {
      title: 'Debit Cards',
      image: '/images/cards.png',
      description: 'Worldwide acceptance and contactless payments with enhanced security layers.',
    }
  ]

  const investmentProducts: Product[] = [
    {
      title: 'Mutual Funds',
      image: '/images/investments.png',
      description: 'Diversify your portfolio with expert-picked funds and automated SIP planning.',
    },
    {
      title: 'Smart IPOs',
      image: '/images/investments.png',
      description: 'Get early access to high-potential public offerings with one-click bidding.',
    }
  ]

  return (
    <main className="explore-page">
      <div className="hero-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-title"
          >
            Financial <span>Universe</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="page-subtitle"
          >
            Discover tailored banking solutions designed to empower your journey and secure your future.
          </motion.p>
          <div className="hero-stats">
            <div className="stat"><ShieldCheck size={18} /> Trusted by 10M+ Users</div>
            <div className="stat"><Star size={18} /> 4.9/5 App Rating</div>
            <div className="stat"><Globe size={18} /> Global Network</div>
          </div>
        </div>
      </div>

      <CategorySection 
        title="Loans" 
        icon={<HandCoins />} 
        color="#97144D"
        subtitle="Empowering your dreams with flexible and instant financing options."
        products={loanProducts}
      />

      <CategorySection 
        title="Accounts" 
        icon={<Building2 />} 
        color="#C41E64"
        subtitle="Smart banking tailored for your personal and professional growth."
        products={accountProducts}
        reverse={true}
      />

      <CategorySection 
        title="Cards" 
        icon={<CreditCard />} 
        color="#7a0e3c"
        subtitle="A world of privileges and rewards in the palm of your hand."
        products={cardProducts}
      />

      <CategorySection 
        title="Investments" 
        icon={<TrendingUp />} 
        color="#4a0725"
        subtitle="Wealth management solutions to grow your future, today."
        products={investmentProducts}
        reverse={true}
      />

      <section className="cta-bottom">
        <div className="container">
          <h2>Ready to start your <strong>Banking Journey?</strong></h2>
          <p>Talk to our AI Assistant for personalized recommendations.</p>
          <button className="chat-cta">Talk to CrediMate <Zap size={20} /></button>
        </div>
      </section>

      <style jsx>{`
        .explore-page {
          background: #fff;
          color: #333;
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 5%;
        }
        
        /* Hero Banner */
        .hero-header {
          background: var(--primary-burgundy);
          color: white;
          padding: 8rem 0;
          text-align: center;
          clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
        }
        .page-title {
          font-size: 4rem;
          font-weight: 300;
          margin-bottom: 1.5rem;
        }
        .page-title span {
          font-weight: 900;
          color: #ffcae0;
        }
        .page-subtitle {
          font-size: 1.3rem;
          opacity: 0.9;
          max-width: 700px;
          margin: 0 auto 3rem;
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .stat { display: flex; align-items: center; gap: 0.75rem; }

        /* Category Blocks */
        .category-block {
          padding: 6rem 0;
        }
        .category-block.reverse .container {
          flex-direction: row-reverse;
        }
        .category-block .container {
          display: flex;
          align-items: center;
          gap: 5rem;
        }
        .category-info {
          flex: 1;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          font-weight: 800;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2rem;
        }
        .cat-title {
          font-size: 3rem;
          font-weight: 300;
          margin-bottom: 1.5rem;
          color: #222;
        }
        .cat-title strong {
          color: #97144D;
          font-weight: 900;
        }
        .cat-subtitle {
          font-size: 1.2rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }
        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .feature-item {
          display: flex;
          align-items: center; gap: 1rem;
          font-weight: 700; color: #444;
        }

        .products-grid {
          flex: 1.5;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        /* Hover Card Styles */
        .featured-card {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 4/5;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .card-image-wrapper { width: 100%; height: 100%; position: relative; }
        .featured-card :global(.card-image) { transition: transform 0.6s !important; }
        .featured-card:hover :global(.card-image) { transform: scale(1.1); }
        .card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
          display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem;
          transition: background 0.3s;
          z-index: 10;
        }
        .featured-card:hover .card-overlay { background: rgba(0,0,0,0.75); }
        .rest-content {
          display: flex; justify-content: space-between; align-items: center;
          position: absolute; bottom: 2rem; left: 2rem; right: 2rem;
        }
        .rest-title { color: white; font-size: 1.5rem; font-weight: 900; }
        .rest-icon-circle { background: white; color: #333; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .hover-content { display: flex; flex-direction: column; gap: 1rem; }
        .hover-title { color: white; font-size: 1.8rem; font-weight: 900; }
        .hover-desc { color: rgba(255,255,255,0.9); font-size: 0.95rem; line-height: 1.5; }
        .hover-actions { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
        .know-more-btn { background: white; color: #97144D; border: none; padding: 0.75rem 1.25rem; border-radius: 10px; font-weight: 700; cursor: pointer; }
        .apply-now-btn { background: #97144D; color: white; border: none; padding: 0.75rem 1.25rem; border-radius: 10px; font-weight: 700; cursor: pointer; }

        /* CTA Bottom */
        .cta-bottom {
          background: #f8f9fa;
          padding: 8rem 0;
          text-align: center;
        }
        .cta-bottom h2 { font-size: 3rem; font-weight: 300; margin-bottom: 1rem; }
        .cta-bottom strong { font-weight: 900; color: #97144D; }
        .cta-bottom p { font-size: 1.2rem; color: #666; margin-bottom: 3rem; }
        .chat-cta {
          background: #97144D; color: white; border: none; padding: 1.2rem 3rem;
          border-radius: 50px; font-size: 1.1rem; font-weight: 700; cursor: pointer;
          display: inline-flex; align-items: center; gap: 1rem; transition: transform 0.2s;
        }
        .chat-cta:hover { transform: scale(1.05); }

        @media (max-width: 1024px) {
          .category-block .container { flex-direction: column !important; text-align: center; }
          .products-grid { width: 100%; grid-template-columns: 1fr; }
          .main-title { font-size: 2.5rem; }
          .hero-stats { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </main>
  )
}
