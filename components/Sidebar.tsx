'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'AI Chat Assistant', path: '/chat', icon: '🤖' },
    { name: 'Applications', path: '#', icon: '📁' },
    { name: 'Settings', path: '#', icon: '⚙️' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">CrediMate.ai</div>
      <nav>
        {links.map((link) => (
          <Link 
            key={link.name} 
            href={link.path}
            className={`nav-link ${pathname === link.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{link.icon}</span>
            {link.name}
          </Link>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
        <p>Support: 1-800-CREDIT</p>
        <p>© 2026 CrediMate</p>
      </div>
    </aside>
  )
}
