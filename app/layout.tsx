import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'CrediMate | Personal Loans, Home Loans & More',
  description: 'Apply for instant loans with CrediMate.',
}

function TopBar() {
  return (
    <header className="topbar">
      <Link href="/" className="logo">CrediMate</Link>
      <nav className="nav-links">
        <Link href="#" className="nav-link">Explore Products</Link>
        <Link href="#" className="nav-link">Grab Deals</Link>
        <Link href="#" className="nav-link">Make Payments</Link>
        <Link href="/chat" className="nav-link">AI Support</Link>
      </nav>
      <Link href="#" className="login-btn">Login</Link>
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
