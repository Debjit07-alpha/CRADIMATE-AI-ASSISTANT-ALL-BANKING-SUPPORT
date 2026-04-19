import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'CrediMate | Personal Loans, Home Loans & More',
  description: 'Apply for instant loans with CrediMate.',
}

function TopBar() {
  return (
    <header>
      <div className="top-strip">
        <div className="container">
          <span>Personal | Business | Corporate | NRI | Agri</span>
          <span>Support | Lodge a Complaint | About Us</span>
        </div>
      </div>
      <div className="main-nav">
        <Link href="/" className="logo">CrediMate</Link>
        <nav className="nav-links">
          <Link href="/explore" className="nav-link">Explore Products</Link>
          <Link href="/deals" className="nav-link">Grab Deals</Link>
          <Link href="/payments" className="nav-link">Make Payments</Link>
          <Link href="/chat" className="nav-link">AI Support</Link>
        </nav>
        <div className="nav-actions">
           <Link href="#" className="open-account-btn">Open Account</Link>
           <Link href="#" className="login-btn">Login</Link>
        </div>
      </div>
    </header>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TopBar />
        {children}
        <footer style={{ background: '#222', color: '#fff', padding: '3rem 5%', textAlign: 'center' }}>
          <p>© 2026 CrediMate Bank Ltd. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
