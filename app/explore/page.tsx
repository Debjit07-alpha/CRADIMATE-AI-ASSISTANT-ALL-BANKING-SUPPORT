'use client'
import React from 'react'

export default function ExplorePage() {
  const categories = [
    { title: 'Accounts', items: ['Savings Account', 'Salary Account', 'Current Account', 'Fixed Deposits'] },
    { title: 'Loans', items: ['Personal Loan', 'Home Loan', 'Car Loan', 'Education Loan', 'Gold Loan'] },
    { title: 'Cards', items: ['Credit Cards', 'Debit Cards', 'Prepaid Cards', 'Commercial Cards'] },
    { title: 'Investments', items: ['Mutual Funds', 'Demat Account', 'Gold Investment', 'IPOs'] },
  ]

  return (
    <main className="main-content">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">Explore Our <strong>Financial Universe</strong></h1>
          <div className="sub-header-box">
            <p>Tailored financial solutions for every stage of your life.</p>
          </div>
        </div>

        <div className="explore-grid">
          {categories.map((cat, i) => (
            <div key={i} className="explore-card">
              <h3>{cat.title}</h3>
              <ul className="explore-list">
                {cat.items.map((item, j) => (
                  <li key={j}><a href="#">{item}</a></li>
                ))}
              </ul>
              <button className="explore-btn">View All</button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .page-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-title {
          font-size: 2.8rem;
          font-weight: 300;
          color: var(--axis-text);
          margin-bottom: 1rem;
        }
        .section-title strong {
          color: var(--primary-burgundy);
          font-weight: 900;
        }
        .sub-header-box {
          display: inline-block;
          border: 2px solid var(--primary-burgundy);
          padding: 10px 30px;
          border-radius: 50px;
          background: #fffafa;
        }
        .sub-header-box p {
          margin: 0;
          color: var(--primary-burgundy);
          font-weight: 700;
          font-size: 1.1rem;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .explore-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .explore-card {
          background: white;
          padding: 2rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow-md);
          border-top: 4px solid var(--primary-burgundy);
          transition: transform 0.3s;
        }
        .explore-card:hover { transform: translateY(-5px); }
        .explore-card h3 { color: var(--primary-burgundy); margin-bottom: 1.5rem; font-size: 1.4rem; }
        .explore-list { list-style: none; padding: 0; margin-bottom: 2rem; }
        .explore-list li { margin-bottom: 0.8rem; }
        .explore-list a { color: var(--axis-text); text-decoration: none; font-weight: 500; font-size: 0.95rem; }
        .explore-list a:hover { color: var(--primary-burgundy); }
        .explore-btn {
          background: var(--axis-gray);
          color: var(--primary-burgundy);
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 4px;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
        }
      `}</style>
    </main>
  )
}
