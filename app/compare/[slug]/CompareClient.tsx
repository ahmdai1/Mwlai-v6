'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import ToolLogo from '../../../components/ToolLogo'
import { tools, pricingLabel, categories } from '../../../lib/data'

export default function CompareClient({ slug }: { slug: string }) {
  const [ar, setAr] = useState(true)

  const parts = slug.split('-vs-')
  const slug1 = parts[0]
  const slug2 = parts.slice(1).join('-vs-')
  const tool1 = tools.find(t => t.slug === slug1 || t.id === slug1)
  const tool2 = tools.find(t => t.slug === slug2 || t.id === slug2)

  if (!tool1 || !tool2) return (
    <div dir="rtl">
      <Nav ar={true} onLangToggle={() => {}} />
      <div className="empty" style={{ marginTop: 80 }}>
        <div className="empty-icon">⚔️</div>
        <div className="empty-title">لم يتم العثور على الأداتين</div>
        <Link href="/tools" style={{ color:'var(--p2)', textDecoration:'none', marginTop:16, display:'inline-block' }}>← العودة للأدوات</Link>
      </div>
    </div>
  )

  const cat1 = categories.find(c => c.id === tool1.category)
  const cat2 = categories.find(c => c.id === tool2.category)

  const rows = [
    { label_ar: 'السعر',          label_en: 'Price',        v1: pricingLabel(tool1, ar),    v2: pricingLabel(tool2, ar),    win: tool1.price_starts <= tool2.price_starts ? 1 : 2 },
    { label_ar: 'شعبية الترند',   label_en: 'Trending',     v1: `${tool1.trending_score}/100`, v2: `${tool2.trending_score}/100`, win: tool1.trending_score > tool2.trending_score ? 1 : 2 },
    { label_ar: 'التقييم',        label_en: 'Rating',       v1: `${tool1.rating}/5 ⭐`,       v2: `${tool2.rating}/5 ⭐`,       win: tool1.rating > tool2.rating ? 1 : 2 },
    { label_ar: 'تجربة مجانية',   label_en: 'Free Trial',   v1: tool1.has_free_trial ? '✓' : '✗', v2: tool2.has_free_trial ? '✓' : '✗', win: tool1.has_free_trial && !tool2.has_free_trial ? 1 : !tool1.has_free_trial && tool2.has_free_trial ? 2 : 0 },
    { label_ar: 'سنة الإطلاق',    label_en: 'Launch Year',  v1: String(tool1.launch_year),    v2: String(tool2.launch_year),    win: 0 },
    { label_ar: 'الزيارات الشهرية', label_en: 'Monthly Visits', v1: tool1.monthly_visits, v2: tool2.monthly_visits, win: 0 },
    { label_ar: 'التصنيف',        label_en: 'Category',     v1: ar ? cat1?.ar : cat1?.en,    v2: ar ? cat2?.ar : cat2?.en,    win: 0 },
  ]

  const score1 = tool1.trending_score + tool1.rating * 5 + (tool1.has_free_trial ? 5 : 0)
  const score2 = tool2.trending_score + tool2.rating * 5 + (tool2.has_free_trial ? 5 : 0)
  const winner = score1 > score2 ? tool1 : tool2

  return (
    <div dir={ar ? 'rtl' : 'ltr'}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: `${tool1.name_en} vs ${tool2.name_en} 2026`,
        description: `Comparison between ${tool1.name_en} and ${tool2.name_en}`,
        url: `https://mwlai.com/compare/${slug}`,
        datePublished: '2026-06-01',
        author: { '@type': 'Organization', name: 'MWL AI' }
      })}} />

      <Nav ar={ar} onLangToggle={() => setAr(p => !p)} />

      <div className="tool-page">
        {/* BREADCRUMB */}
        <nav className="breadcrumb">
          <Link href="/">{ar ? 'الرئيسية' : 'Home'}</Link>
          <span>›</span>
          <Link href="/tools">{ar ? 'الأدوات' : 'Tools'}</Link>
          <span>›</span>
          <span style={{ color: 'var(--text2)' }}>{ar ? 'مقارنة' : 'Compare'}</span>
        </nav>

        <div style={{ textAlign:'center', padding:'24px 0 32px' }}>
          <div className="hero-eyebrow"><span className="dot"/>⚔️ {ar ? 'مقارنة شاملة 2026' : 'Full Comparison 2026'}</div>
          <h1 style={{ fontSize:'clamp(24px,4vw,40px)', fontWeight:800, margin:'12px 0 8px', letterSpacing:-1 }}>
            {ar ? tool1.name_ar : tool1.name_en}
            <span style={{ color:'var(--muted)', margin:'0 16px', fontWeight:400 }}>vs</span>
            {ar ? tool2.name_ar : tool2.name_en}
          </h1>
          <p style={{ color:'var(--muted)', fontSize:15 }}>
            {ar ? 'أيهما يناسبك؟ مقارنة الأسعار والمميزات والتقييمات' : 'Which suits you? Price, features, and ratings comparison'}
          </p>
        </div>

        {/* TOOL HEADERS */}
        <div className="compare-grid" style={{ marginBottom:32 }}>
          {[tool1, tool2].map((t, i) => (
            <div key={t.id} className="tool-hero-card" style={{ textAlign:'center', padding:20 }}>
              <ToolLogo tool={t} size={64} radius={16} />
              <div style={{ fontWeight:800, fontSize:18, margin:'12px 0 4px' }}>{ar ? t.name_ar : t.name_en}</div>
              <div style={{ color:'var(--muted)', fontSize:13, marginBottom:12 }}>{ar ? t.tagline_ar : t.tagline_en}</div>
              <div style={{ fontSize:20, fontWeight:800, color:'var(--p2)', marginBottom:12 }}>{pricingLabel(t, ar)}</div>
              <a href={t.affiliate_url || t.website} target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-block', background:'var(--card)', border:'1px solid var(--border2)',
                  color:'var(--text2)', padding:'8px 16px', borderRadius:10, fontSize:13, fontWeight:600,
                  textDecoration:'none', transition:'all .2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor='var(--p)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='var(--border2)'}>
                {ar ? 'زيارة ↗' : 'Visit ↗'}
              </a>
            </div>
          ))}
          <div className="compare-vs">VS</div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="tool-section">
          <h2 className="tool-section-h">📊 {ar ? 'مقارنة المواصفات' : 'Specs Comparison'}</h2>
          <div style={{ overflowX:'auto' }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{ width:'30%' }}>{ar ? 'المعيار' : 'Criteria'}</th>
                  <th style={{ textAlign:'center' }}>{ar ? tool1.name_ar : tool1.name_en}</th>
                  <th style={{ textAlign:'center' }}>{ar ? tool2.name_ar : tool2.name_en}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td style={{ color:'var(--muted)', fontWeight:600 }}>{ar ? row.label_ar : row.label_en}</td>
                    <td style={{ textAlign:'center', fontWeight: row.win===1?700:400, color: row.win===1?'#10b981':'var(--text)', background: row.win===1?'rgba(16,185,129,.05)':'transparent' }}>
                      {row.win===1 && '✓ '}{row.v1}
                    </td>
                    <td style={{ textAlign:'center', fontWeight: row.win===2?700:400, color: row.win===2?'#10b981':'var(--text)', background: row.win===2?'rgba(16,185,129,.05)':'transparent' }}>
                      {row.win===2 && '✓ '}{row.v2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* WINNER */}
        <div className="compare-winner-card">
          <div style={{ fontSize:32, marginBottom:12 }}>🏆</div>
          <h2 style={{ fontSize:20, fontWeight:800, marginBottom:8 }}>
            {ar ? 'الأفضل بشكل عام:' : 'Overall Winner:'}
            <span style={{ color:'var(--p2)', marginRight:ar?8:0, marginLeft:ar?0:8 }}>
              {ar ? winner.name_ar : winner.name_en}
            </span>
          </h2>
          <p style={{ color:'var(--muted)', fontSize:14, marginBottom:20 }}>{ar ? winner.tagline_ar : winner.tagline_en}</p>
          <a href={winner.affiliate_url || winner.website} target="_blank" rel="noopener noreferrer" className="btn-go" style={{ display:'inline-flex', textDecoration:'none' }}>
            🚀 {ar ? `جرّب ${winner.name_ar}` : `Try ${winner.name_en}`} →
          </a>
        </div>

        {/* RELATED COMPARISONS */}
        <div className="tool-section">
          <h2 className="tool-section-h">🔄 {ar ? 'مقارنات مشابهة' : 'Similar Comparisons'}</h2>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {(tool1.alternatives||[]).slice(0,3).map(altId => {
              const alt = tools.find(t => t.id === altId)
              if (!alt) return null
              return (
                <Link key={altId} href={`/compare/${tool1.slug}-vs-${alt.slug}`}
                  style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:10, padding:'8px 14px', fontSize:13, color:'var(--text2)', textDecoration:'none' }}>
                  {tool1.name_en} vs {alt.name_en}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <Footer ar={ar} />
    </div>
  )
}
