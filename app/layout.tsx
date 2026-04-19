import './globals.css'
import Link from 'next/link'
import { Landmark, Briefcase, Tag, CreditCard, MessageSquare, User, LogIn } from 'lucide-react'

export const metadata = {
  title: 'CrediMate | Professional AI Banking Platform',
  description: 'Experience premium banking with AI-powered loan assistance and smart financial management.',
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: '#97144D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

function TopBar() {
  return (
    <header>
      <div className="top-strip">
        <div className="container">
          <div className="top-left">
            <span>Personal</span>
            <span>Business</span>
            <span>Corporate</span>
            <span>NRI</span>
          </div>
          <div className="top-right">
            <span>Support</span>
            <span>About Us</span>
          </div>
        </div>
      </div>
      <div className="main-nav">
        <Link href="/" className="logo">
           <Landmark size={28} className="logo-icon" />
           <span>CrediMate</span>
        </Link>
        <nav className="nav-links">
          <Link href="/explore" className="nav-link"><Briefcase size={16} /> Explore</Link>
          <Link href="/deals" className="nav-link"><Tag size={16} /> Deals</Link>
          <Link href="/payments" className="nav-link"><CreditCard size={16} /> Payments</Link>
          <Link href="/chat" className="nav-link"><MessageSquare size={16} /> AI Assistant</Link>
        </nav>
        <div className="nav-actions">
           <Link href="#" className="open-account-btn">
             <User size={16} /> Open Account
           </Link>
           <Link href="#" className="login-btn">
             <LogIn size={16} /> Login
           </Link>
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
