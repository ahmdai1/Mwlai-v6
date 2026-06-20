'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ToolLogo from '../../components/ToolLogo'
import { tools, categories } from '../../lib/data'

export default function CategoriesPage() {
  const [ar, setAr] = useState(true)

  const catData = useMemo(() => {
    return categories.filter(c => c.id !== 'all').map(c => {
      const catTools = tools.filter(t => t.category === c.id)
      const top3 = catTools.sort((a,b) => b.trending_score - a.trending_score).slice(0, 3)
      const hasAffiliate = catTools.filter(t => t.affiliate_url).length
      return { ...c, count: catTools.length, top3, hasAffiliate }
    }).sort((a,b) => b.count - a.count)
  }, [])

  return (
    <div dir={ar ? 'rtl' : 'ltr'}>
      <Nav ar={ar} onLangToggle={() => setAr(p => !p)} />

      <div style={{ padding: '48px 24px 24px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
        <h1 style={{ fontFamily: "'Syne','Cairo',sans-serif", fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, marginBottom: 8 }}>
          {ar ? 'جميع التصنيفات' : 'All Categories'}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 15 }}>
          {ar ? `${categories.length - 1} تصنيف — ${tools.length} أداة AI` : `${categories.length - 1} categories — ${tools.length} AI tools`}
        </p>
      </div>

      <div style={{ maxWidth: 1300, margin: '32px auto 60px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
          {catData.map(c => (
            <Link key={c.id} href={`/tools?cat=${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 18, padding: 20, transition: 'all .25s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, fontSize: 22,
                    background: 'linear-gradient(135deg,var(--p3),var(--t2))',
                    border: '1px solid var(--border2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{ar ? c.ar : c.en}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 12 }}>
                      {c.count} {ar ? 'أداة' : 'tools'}
                      {c.hasAffiliate > 0 && (
                        <span style={{ color: 'var(--green)', marginRight: ar ? 0 : 6, marginLeft: ar ? 6 : 0 }}>
                          · {c.hasAffiliate} {ar ? 'عرض' : 'deals'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Top 3 tools */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {c.top3.map(t => (
                    <div key={t.id} style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)',
                      borderRadius: 8, padding: '4px 8px', fontSize: 12, color: 'var(--text2)'
                    }}>
                      <ToolLogo tool={t} size={18} radius={4} />
                      {ar ? t.name_ar : t.name_en}
                    </div>
                  ))}
                  {c.count > 3 && (
                    <div style={{
                      background: 'var(--p3)', border: '1px solid rgba(109,81,247,.2)',
                      borderRadius: 8, padding: '4px 8px', fontSize: 12, color: 'var(--p2)'
                    }}>+{c.count - 3}</div>
                  )}
                </div>

                {/* Arrow */}
                <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end', color: 'var(--dim)', fontSize: 14 }}>
                  {ar ? '← استعراض الكل' : 'View all →'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer ar={ar} />
    </div>
  )
}
