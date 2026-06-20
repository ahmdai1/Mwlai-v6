'use client'
import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ToolLogo from '../components/ToolLogo'
import { tools, categories, getTrending, pricingLabel, pricingClass, getRelated } from '../lib/data'
import SearchBox from '../components/SearchBox'
import Newsletter from '../components/Newsletter'
import type { Tool } from '../lib/data'

const PAGE_SIZE = 24

export default function Home() {
  const [ar, setAr] = useState(true)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState<Tool | null>(null)
  const [copied, setCopied] = useState(false)

  const trending = useMemo(() => getTrending(16), [])

  const filtered = useMemo(() => {
    let list = cat === 'all' ? tools : tools.filter(t => t.category === cat)
    if (q.trim()) {
      const lq = q.toLowerCase()
      list = list.filter(t =>
        t.name_ar.includes(q) || t.name_en.toLowerCase().includes(lq) ||
        t.tagline_ar.includes(q) || t.tagline_en.toLowerCase().includes(lq) ||
        t.category.includes(lq) || (t.tags_en || []).some(g => g.toLowerCase().includes(lq))
      )
    }
    return list
  }, [q, cat])

  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page])
  const hasMore = paginated.length < filtered.length

  const openModal = useCallback((t: Tool) => { setModal(t); setCopied(false) }, [])
  const closeModal = useCallback(() => setModal(null), [])

  function reveal(t: Tool) {
    if (t.coupon_code && t.coupon_code !== 'NO_CODE' && t.coupon_code !== '') {
      navigator.clipboard.writeText(t.coupon_code).catch(() => {})
      setCopied(true)
    }
    setTimeout(() => window.open(t.affiliate_url, '_blank'), 500)
  }

  const catCount = useMemo(() => {
    const m: Record<string, number> = {}
    tools.forEach(t => { m[t.category] = (m[t.category] || 0) + 1 })
    return m
  }, [])

  return (
    <div dir={ar ? 'rtl' : 'ltr'}>
      <Nav ar={ar} onLangToggle={() => setAr(p => !p)} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="dot" /> {ar ? 'محدّث يونيو 2026' : 'Updated June 2026'}
        </div>
        <h1>
          {ar ? (<><span className="grad">اكتشف أفضل</span><br />أدوات الذكاء الاصطناعي</>)
             : (<><span className="grad">Discover the Best</span><br />AI Tools in 2026</>)}
        </h1>
        <p>
          {ar ? 'دليلك الشامل لـ 800+ أداة AI مع كوبونات وعروض حصرية — مرتّبة حسب الشعبية والتريند في السوق العربي والخليجي'
             : 'Your complete guide to 800+ AI tools with exclusive coupons — ranked by popularity and trending in Arab & Gulf markets'}
        </p>
        <div className="hero-stats">
          {[
            { n: '800+', l: ar ? 'أداة AI' : 'AI Tools' },
            { n: '16', l: ar ? 'عرض أفلييت' : 'Affiliate Deals' },
            { n: '18', l: ar ? 'تصنيف' : 'Categories' },
            { n: '2026', l: ar ? 'محدّث' : 'Updated' },
          ].map(s => (
            <div key={s.l} className="stat">
              <span className="stat-n">{s.n}</span>
              <span className="stat-l">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH */}
      <div style={{ maxWidth: 680, margin: '32px auto 0', padding: '0 20px' }}>
        <div className="search-box">
          <div className="search-icon-wrap">🔍</div>
          <input className="search-input" value={q}
            onChange={e => { setQ(e.target.value); setPage(1) }}
            placeholder={ar ? 'ابحث عن أداة AI...' : 'Search AI tools...'}
          />
          {q && <button className="search-clear" onClick={() => setQ('')}>✕</button>}
        </div>
      </div>

      {/* FILTERS */}
      <div className="filters-bar" style={{ marginTop: 24 }}>
        <div className="filters-scroll">
          {categories.map(c => (
            <button key={c.id}
              className={`fbt${cat === c.id ? ' on' : ''}`}
              onClick={() => { setCat(c.id); setPage(1) }}>
              {c.icon} {ar ? c.ar : c.en}
              {c.id !== 'all' && catCount[c.id] ? (
                <span style={{ marginRight: ar ? 4 : 0, marginLeft: ar ? 0 : 4, opacity: .6, fontSize: 10 }}>
                  {catCount[c.id]}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* TRENDING — only when no search/filter */}
      {!q && cat === 'all' && (
        <section className="trending-section">
          <div className="section-head">
            <h2 className="section-title">
              🔥 {ar ? 'الأدوات الأكثر تريند' : 'Most Trending Tools'}
              <span className="section-badge">{ar ? 'LIVE 2026' : 'LIVE 2026'}</span>
            </h2>
            <Link href="/tools?sort=trending" className="see-all">
              {ar ? 'عرض الكل ←' : '→ View all'}
            </Link>
          </div>
          <div className="trending-scroll">
            {trending.map(t => (
              <TrendCard key={t.id} tool={t} ar={ar} onAff={() => openModal(t)} />
            ))}
          </div>
        </section>
      )}

      {/* AFFILIATE SPOTLIGHT — only on homepage no filter */}
      {!q && cat === 'all' && (
        <section className="trending-section" style={{ marginTop: 32 }}>
          <div className="section-head">
            <h2 className="section-title">
              💰 {ar ? 'عروض وكوبونات حصرية' : 'Exclusive Deals & Coupons'}
              <span className="section-badge" style={{ background: 'rgba(14,201,138,.12)', color: 'var(--green)' }}>
                {ar ? 'وفّر الآن' : 'SAVE NOW'}
              </span>
            </h2>
            <Link href="/coupons" className="see-all">{ar ? 'كل الكوبونات ←' : '→ All coupons'}</Link>
          </div>
          <div className="trending-scroll">
            {tools.filter(t => t.affiliate_url).slice(0, 12).map(t => (
              <AffCard key={t.id} tool={t} ar={ar} onReveal={() => openModal(t)} />
            ))}
          </div>
        </section>
      )}

      {/* MAIN GRID */}
      <section className="tools-section">
        <div className="grid-meta">
          <span className="grid-label">
            {q ? (ar ? `نتائج: "${q}"` : `Results: "${q}"`)
               : cat !== 'all' ? (ar ? categories.find(c=>c.id===cat)?.ar : categories.find(c=>c.id===cat)?.en)
               : (ar ? 'جميع الأدوات' : 'All Tools')}
          </span>
          <span className="grid-count">{filtered.length} {ar ? 'أداة' : 'tools'}</span>
        </div>
        {paginated.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">{ar ? 'لا توجد نتائج' : 'No results'}</div>
            <p>{ar ? 'جرّب كلمة بحث مختلفة' : 'Try a different search term'}</p>
          </div>
        ) : (
          <>
            <div className="tools-grid">
              {paginated.map(t => (
                <ToolCard key={t.id} tool={t} ar={ar}
                  onAff={() => openModal(t)} />
              ))}
            </div>
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <button onClick={() => setPage(p => p + 1)}
                  style={{
                    background: 'var(--card)', border: '1px solid var(--border2)',
                    color: 'var(--text2)', padding: '12px 32px', borderRadius: 12,
                    fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all .2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--p)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border2)')}
                >
                  {ar ? `تحميل المزيد (${filtered.length - paginated.length} متبقي)` 
                       : `Load more (${filtered.length - paginated.length} remaining)`}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer ar={ar} />

      {modal && (
        <CouponModal tool={modal} ar={ar} copied={copied}
          onClose={closeModal} onReveal={() => reveal(modal)} onCopy={() => {
            navigator.clipboard.writeText(modal.coupon_code).catch(() => {})
            setCopied(true)
          }} />
      )}
    </div>
  )
}

/* TREND CARD */
function TrendCard({ tool, ar, onAff }: { tool: Tool; ar: boolean; onAff: () => void }) {
  const hasAff = !!tool.affiliate_url
  const content = (
    <>
      {tool.trending_score >= 93 && <span className="trend-badge">🔥 HOT</span>}
      <ToolLogo tool={tool} size={44} radius={12} />
      <div className="trend-name">{ar ? tool.name_ar : tool.name_en}</div>
      <div className="trend-tag">{ar ? tool.tagline_ar : tool.tagline_en}</div>
      <div className="trend-score">
        <span>{tool.trending_score}</span>
        <div className="score-bar"><div className="score-fill" style={{ width: `${tool.trending_score}%` }} /></div>
      </div>
    </>
  )
  if (hasAff) return <div className="trend-card" onClick={onAff}>{content}</div>
  return <Link href={`/tools/${tool.slug}`} className="trend-card">{content}</Link>
}

/* AFF CARD (horizontal scroll deals) */
function AffCard({ tool, ar, onReveal }: { tool: Tool; ar: boolean; onReveal: () => void }) {
  return (
    <div className="trend-card" onClick={onReveal}
      style={{ borderColor: 'rgba(109,81,247,.3)', minWidth: 210 }}>
      <ToolLogo tool={tool} size={44} radius={12} />
      <div className="trend-name">{ar ? tool.name_ar : tool.name_en}</div>
      {tool.coupon_discount && (
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginTop: 4 }}>
          {tool.coupon_discount}
        </div>
      )}
      <div style={{
        marginTop: 8, background: 'var(--t)', color: '#001a1a',
        fontSize: 11, fontWeight: 800, padding: '4px 10px',
        borderRadius: 8, display: 'inline-block'
      }}>
        {ar ? 'احصل على العرض' : 'Get Deal'} →
      </div>
    </div>
  )
}

/* TOOL CARD */
function ToolCard({ tool, ar, onAff }: { tool: Tool; ar: boolean; onAff: () => void }) {
  const hasAff = !!tool.affiliate_url
  const free = tool.pricing_type === 'free' || tool.pricing_type === 'freemium'
  const content = (
    <>
      <div className="tc-top">
        <ToolLogo tool={tool} size={48} radius={13} />
        <div className="tc-info">
          <div className="tc-name">{ar ? tool.name_ar : tool.name_en}</div>
          <div className="tc-tag">{ar ? tool.tagline_ar : tool.tagline_en}</div>
          <div className="tc-badges">
            {tool.featured && <span className="bdg bdg-feat">⭐ {ar ? 'مميز' : 'Top'}</span>}
            {tool.is_new && <span className="bdg bdg-new">🆕 {ar ? 'جديد' : 'New'}</span>}
            {tool.trending_score >= 92 && <span className="bdg bdg-hot">🔥</span>}
            {free && <span className="bdg bdg-free">{ar ? 'مجاني' : 'Free'}</span>}
            {hasAff && <span className="bdg bdg-aff">💰 {ar ? 'عرض' : 'Deal'}</span>}
          </div>
        </div>
      </div>
      <p className="tc-desc">{ar ? tool.desc_ar : tool.desc_en}</p>
      <div className="tc-foot">
        <span className={`tc-price ${free ? 'free-price' : hasAff ? 'aff-price' : ''}`}>
          {pricingLabel(tool, ar)}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="tc-rating">{'★'.repeat(Math.min(5, Math.round(tool.rating)))}</span>
          <span className="tc-arrow">{ar ? '←' : '→'}</span>
        </div>
      </div>
    </>
  )
  if (hasAff) return (
    <div className={`tc aff-tool${tool.featured ? ' featured' : ''}`} onClick={onAff}>{content}</div>
  )
  return (
    <Link href={`/tools/${tool.slug}`} className={`tc${tool.featured ? ' featured' : ''}`}>{content}</Link>
  )
}

/* COUPON MODAL */
function CouponModal({ tool, ar, copied, onClose, onReveal, onCopy }:
  { tool: Tool; ar: boolean; copied: boolean; onClose: () => void; onReveal: () => void; onCopy: () => void }) {
  const hasCode = tool.coupon_code && tool.coupon_code !== 'NO_CODE' && tool.coupon_code !== ''
  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-x" onClick={onClose}>✕</button>
        <div className="modal-logo"><ToolLogo tool={tool} size={72} radius={18} /></div>
        <div className="modal-title">
          {ar ? tool.name_ar : tool.name_en}
          {tool.coupon_discount && (
            <div style={{ fontSize: 14, color: 'var(--green)', fontWeight: 700, marginTop: 4 }}>
              {tool.coupon_discount}
            </div>
          )}
        </div>
        {hasCode ? (
          <>
            <div className="code-el" onClick={onCopy}>{tool.coupon_code}</div>
            <p className={`copy-hint${copied ? ' ok' : ''}`}>
              {copied ? (ar ? '✓ تم النسخ!' : '✓ Copied!') : (ar ? 'اضغط للنسخ' : 'Click to copy')}
            </p>
          </>
        ) : (
          <div className="nocode-box">
            ✅ {ar ? 'لا تحتاج كود — الخصم يُطبّق تلقائياً' : 'No code needed — discount auto-applied'}
          </div>
        )}
        <button className="go-btn" onClick={onReveal}>
          🚀 {ar ? `الذهاب إلى ${tool.name_ar}` : `Go to ${tool.name_en}`} →
        </button>
        <p className="modal-sub">
          {tool.price_starts} · {ar ? 'يفتح في تبويب جديد' : 'Opens in new tab'}
        </p>
      </div>
    </div>
  )
}
