'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavProps { ar: boolean; onLangToggle: () => void }

export default function Nav({ ar, onLangToggle }: NavProps) {
  const path = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark'|'light'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark'|'light'|null
    if (saved) { setTheme(saved); document.documentElement.setAttribute('data-theme', saved) }
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  const links = [
    { href: '/',           ar: 'الرئيسية',   en: 'Home'       },
    { href: '/tools',      ar: 'الأدوات',     en: 'Tools'      },
    { href: '/coupons',    ar: 'الكوبونات',   en: 'Coupons'    },
    { href: '/categories', ar: 'التصنيفات',   en: 'Categories' },
    { href: '/blog',       ar: 'المدونة',     en: 'Blog'       },
  ]

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">🧠 MWL AI</Link>
          <div className="nav-links">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={`nav-link${path===l.href?' active':''}`}>
                {ar ? l.ar : l.en}
              </Link>
            ))}
          </div>
          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button className="lang-btn" onClick={onLangToggle}>{ar ? 'EN' : 'عربي'}</button>
            <Link href="/coupons" className="nav-cta">{ar ? '🎁 العروض' : '🎁 Deals'}</Link>
            <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu" dir={ar ? 'rtl' : 'ltr'}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`mobile-link${path===l.href?' active':''}`}
              onClick={() => setMenuOpen(false)}>
              {ar ? l.ar : l.en}
            </Link>
          ))}
          <div style={{ display:'flex', gap:8, padding:'8px 0', borderTop:'1px solid var(--border)', marginTop:4 }}>
            <button className="lang-btn" style={{ flex:1 }} onClick={() => { onLangToggle(); setMenuOpen(false) }}>
              {ar ? 'English' : 'العربية'}
            </button>
            <button className="theme-toggle" onClick={toggleTheme}>{theme==='dark'?'☀️':'🌙'}</button>
          </div>
        </div>
      )}
    </>
  )
}
