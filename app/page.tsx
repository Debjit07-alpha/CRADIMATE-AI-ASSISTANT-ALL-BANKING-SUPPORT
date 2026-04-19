import ChatBox from '@/components/ChatBox'

export default function Home() {
  return (
    <main>
      <section className="hero-banner-new">
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <div className="hero-text-content">
            <div className="badge">Limited Offer</div>
            <h1>Open a <strong>Digital Savings Account</strong> in minutes</h1>
            <p>Enjoy up to 7%* interest p.a. and ₹0 maintenance charges. Start your digital banking journey today.</p>
            <div className="hero-btns">
              <button className="apply-btn-new">Open Account Now</button>
              <button className="know-more-btn">Know More</button>
            </div>
          </div>
          <div className="hero-image-placeholder">
            {/* Visual element representing digital banking */}
            <div className="card-stack">
              <div className="card-mock gold"></div>
              <div className="card-mock burgundy"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="main-content">
        <div className="container">
          <div className="banking-widget-new">
            <div className="widget-header">
               <h2>Check Your <strong>Loan Eligibility</strong></h2>
               <p>Instant approval based on your credit profile</p>
            </div>
            <ChatBox />
          </div>

          <h2 className="section-title">Experience <strong>Next-Gen Banking</strong></h2>
          <div className="features-grid">
             <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h4>Instant Transfers</h4>
                <p>Send money via IMPS, RTGS, or NEFT in seconds.</p>
             </div>
             <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <h4>Secure Banking</h4>
                <p>Multi-factor authentication for every transaction.</p>
             </div>
             <div className="feature-item">
                <div className="feature-icon">📱</div>
                <h4>Mobile First</h4>
                <p>Manage everything from the CrediMate App.</p>
             </div>
             <div className="feature-item">
                <div className="feature-icon">🤖</div>
                <h4>AI Assistant</h4>
                <p>24/7 intelligent support for all your queries.</p>
             </div>
          </div>

          <div className="loan-grid">
            <div className="loan-card-new">
              <div className="card-image-sub" style={{background: '#fef3f2'}}>🏠</div>
              <h3>Home Loan</h3>
              <p>Build your dream home with interest rates starting at 8.75% p.a. Zero prepayment charges.</p>
              <a href="#" className="loan-card-link">Apply Now →</a>
            </div>
            <div className="loan-card-new">
              <div className="card-image-sub" style={{background: '#eef2ff'}}>🚗</div>
              <h3>Car Loan</h3>
              <p>Drive home your favorite car with up to 100% on-road funding and quick processing.</p>
              <a href="#" className="loan-card-link">Apply Now →</a>
            </div>
            <div className="loan-card-new">
              <div className="card-image-sub" style={{background: '#f0fdf4'}}>🎓</div>
              <h3>Education Loan</h3>
              <p>Invest in your future with flexible repayment options and tax benefits under Section 80E.</p>
              <a href="#" className="loan-card-link">Apply Now →</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
