import ChatBox from '@/components/ChatBox'

export default function Home() {
  return (
    <main>
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Experience <strong>Instant Approvals</strong> with CrediMate</h1>
          <p>Get Personal Loans up to ₹40 Lakhs with minimal documentation and attractive interest rates. Apply online in minutes.</p>
          <button className="apply-btn">Apply Now</button>
        </div>
      </section>

      <section className="main-content">
        <div className="banking-widget">
          <h2>Check Your <strong>Eligibility</strong></h2>
          <ChatBox />
        </div>

        <h2 className="section-title">Explore Our <strong>Products</strong></h2>
        <div className="loan-grid">
          <div className="loan-card">
            <h3>Personal Loan</h3>
            <p>Fulfill your dreams with our instant personal loans. Enjoy flexible repayment tenures up to 60 months.</p>
            <a href="#" className="loan-card-link">Know More →</a>
          </div>
          <div className="loan-card">
            <h3>Home Loan</h3>
            <p>Build your dream home with interest rates starting at 8.75% p.a. Zero prepayment charges.</p>
            <a href="#" className="loan-card-link">Know More →</a>
          </div>
          <div className="loan-card">
            <h3>Auto Loan</h3>
            <p>Drive home your favorite car with up to 100% on-road funding and quick processing.</p>
            <a href="#" className="loan-card-link">Know More →</a>
          </div>
        </div>
      </section>
    </main>
  )
}
