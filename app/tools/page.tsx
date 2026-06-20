'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ToolLogo from '../../components/ToolLogo'
import { tools, categories, pricingLabel, pricingClass } from '../../lib/data'
import type { Tool } from '../../lib/data'

const PAGE_SIZE = 30

function ToolsContent() {
  const params = useSearchParams()
  const [ar, setAr] = useState(true)
  const [q, setQ] = useState(params.get('q') || '')
  const [cat, setCat] = useState(params.get('cat') || 'all')
  const [sort, setSort] = useState(params.get('sort') || 'trending')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState<Tool | null>(null)
  const [copied, setCopied] = useState(false)

  const filtered = useMemo(() => {
    let list = cat === 'all' ? [...tools] : tools.filter(t => t.category === cat)
    if (q.trim()) {
      const lq = q.toLowerCase()
      list = list.filter(t =>
        t.name_ar.includes(q) || t.name_en.toLowerCase().includes(lq) ||
        t.tagline_ar.includes(q) || t.tagline_en.toLowerCase().includes(lq) ||
        t.category.includes(lq)
      )
    }
    if (sort === 'rating') list.sort((a,b) => b.rating - a.rating)
    else if (sort === 'new') list.sort((a,b) => b.launch_year - a.launch_year)
    else list.sort((a,b) => {
      if (a.affiliate_url && !b.affiliate_url) return -1
      if (!a.affiliate_url && b.affiliate_url) return 1
      return b.trending_score - a.trending_score
    })
    return list
  }, [q, cat, sort])

  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page])

  function reveal(t: Tool) {
    if (t.coupon_code && t.coupon_code !== 'NO_CODE' && t.coupon_code !== '') {
      navigator.clipboard.writeText(t.coupon_code).catch(() => {})
      setCopied(true)
    }
    setTimeout(() => window.open(t.affiliate_url, '_blank'), 500)
  }

  return (
    <div dir={ar ? 'rtl' : 'ltr'}>
      <Nav ar={ar} onLangToggle={() => setAr(p => !p)} />

      {/* PAGE HEADER */}
      <div className="cat-header" style={{
        background: 'linear-gradient(180deg,rgba(109,81,247,.1),transparent)',
        borderBottom: '1px solid var(--border)', padding: '40px 24px 28px', textAlign: 'center'
      }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🤖</div>
        <h1 style={{ fontFamily: "'Syne','Cairo',sans-serif", fontSize: 'clamp(22px,4vw,34px)', fontWeight: 800, marginBottom: 8 }}>
          {ar ? 'جميع أدوات الذكاء الاصطناعي' : 'All AI Tools'}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 15 }}>
          {ar ? `800+ أداة مرتّبة حسب الشعبية — الأدوات ذات العروض تظهر أولاً`
               : `${tools.length}+ tools ranked by popularity — deal tools appear first`}
        </p>
      </div>

      {/* SEARCH + SORT */}
      <div style={{ maxWidth: 1300, margin: '24px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <div className="search-box" style={{ flex: 1, minWidth: 240 }}>
            <div className="search-icon-wrap">🔍</div>
            <input className="search-input" value={q}
              onChange={e => { setQ(e.target.value); setPage(1) }}
              placeholder={ar ? 'ابحث عن أداة...' : 'Search tools...'}
            />
            {q && <button className="search-clear" onClick={() => setQ('')}>✕</button>}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
            <option value="trending">{ar ? '🔥 الأكثر شيوعاً' : '🔥 Trending'}</option>
            <option value="rating">{ar ? '⭐ الأعلى تقييماً' : '⭐ Top Rated'}</option>
            <option value="new">{ar ? '🆕 الأحدث' : '🆕 Newest'}</option>
          </select>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="filters-scroll" style={{ marginBottom: 24 }}>
          {categories.map(c => (
            <button key={c.id} className={`fbt${cat===c.id?' on':''}`}
              onClick={() => { setCat(c.id); setPage(1) }}>
              {c.icon} {ar ? c.ar : c.en}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="tools-section" style={{ marginTop: 0 }}>
        <div className="grid-meta">
          <span className="grid-label">
            {q ? (ar ? `نتائج "${q}"` : `Results for "${q}"`) : (ar ? 'الأدوات' : 'Tools')}
          </span>
          <span className="grid-count">{filtered.length} {ar ? 'أداة' : 'tools'}</span>
        </div>

        {paginated.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">{ar ? 'لا نتائج' : 'No results'}</div>
          </div>
        ) : (
          <>
            <div className="tools-grid">
              {paginated.map(t => (
                <ToolCard key={t.id} tool={t} ar={ar} onAff={() => { setModal(t); setCopied(false) }} />
              ))}
            </div>
            {paginated.length < filtered.length && (
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <button onClick={() => setPage(p => p+1)} style={{
                  background:'var(--card)',border:'1px solid var(--border2)',
                  color:'var(--text2)',padding:'12px 32px',borderRadius:12,
                  fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:'inherit'
                }}>
                  {ar ? `تحميل ${Math.min(PAGE_SIZE, filtered.length-paginated.length)} أداة أخرى` 
                       : `Load ${Math.min(PAGE_SIZE, filtered.length-paginated.length)} more`}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer ar={ar} />

      {modal && (
        <CouponModal tool={modal} ar={ar} copied={copied}
          onClose={() => setModal(null)}
          onReveal={() => reveal(modal)}
          onCopy={() => { navigator.clipboard.writeText(modal.coupon_code).catch(()=>{}); setCopied(true) }}
        />
      )}
    </div>
  )
}

function ToolCard({ tool, ar, onAff }: { tool: Tool; ar: boolean; onAff: () => void }) {
  const hasAff = !!tool.affiliate_url
  const free = ['free','freemium'].includes(tool.pricing_type)
  const content = (
    <>
      <div className="tc-top">
        <ToolLogo tool={tool} size={48} radius={13} />
        <div className="tc-info">
          <div className="tc-name">{ar ? tool.name_ar : tool.name_en}</div>
          <div className="tc-tag">{ar ? tool.tagline_ar : tool.tagline_en}</div>
          <div className="tc-badges">
            {tool.featured && <span className="bdg bdg-feat">⭐</span>}
            {tool.is_new && <span className="bdg bdg-new">🆕</span>}
            {tool.trending_score >= 92 && <span className="bdg bdg-hot">🔥</span>}
            {free && <span className="bdg bdg-free">{ar?'مجاني':'Free'}</span>}
            {hasAff && <span className="bdg bdg-aff">💰 {ar?'عرض':'Deal'}</span>}
          </div>
        </div>
      </div>
      <p className="tc-desc">{ar ? tool.desc_ar : tool.desc_en}</p>
      <div className="tc-foot">
        <span className={`tc-price ${free?'free-price':hasAff?'aff-price':''}`}>
          {pricingLabel(tool,ar)}
        </span>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          <span style={{fontSize:10,color:'var(--gold)'}}>
            {'★'.repeat(Math.min(5,Math.round(tool.rating)))}
          </span>
          <span className="tc-arrow">{ar?'←':'→'}</span>
        </div>
      </div>
    </>
  )
  if (hasAff) return <div className={`tc aff-tool${tool.featured?' featured':''}`} onClick={onAff}>{content}</div>
  return <Link href={`/tools/${tool.slug}`} className={`tc${tool.featured?' featured':''}`}>{content}</Link>
}

function CouponModal({ tool, ar, copied, onClose, onReveal, onCopy }:
  { tool:Tool; ar:boolean; copied:boolean; onClose:()=>void; onReveal:()=>void; onCopy:()=>void }) {
  const hasCode = tool.coupon_code && tool.coupon_code !== 'NO_CODE' && tool.coupon_code !== ''
  return (
    <div className="modal-bg" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-x" onClick={onClose}>✕</button>
        <div className="modal-logo"><ToolLogo tool={tool} size={72} radius={18} /></div>
        <div className="modal-title">
          {ar ? tool.name_ar : tool.name_en}
          {tool.coupon_discount && <div style={{fontSize:14,color:'var(--green)',fontWeight:700,marginTop:4}}>{tool.coupon_discount}</div>}
        </div>
        {hasCode ? (
          <>
            <div className="code-el" onClick={onCopy}>{tool.coupon_code}</div>
            <p className={`copy-hint${copied?' ok':''}`}>{copied?(ar?'✓ تم النسخ!':'✓ Copied!'):(ar?'اضغط للنسخ':'Click to copy')}</p>
          </>
        ) : (
          <div className="nocode-box">✅ {ar?'الخصم يُطبّق تلقائياً':'Discount auto-applied'}</div>
        )}
        <button className="go-btn" onClick={onReveal}>🚀 {ar?`الذهاب إلى ${tool.name_ar}`:`Go to ${tool.name_en}`} →</button>
        <p className="modal-sub">{tool.price_starts} · {ar?'يفتح في تبويب جديد':'Opens in new tab'}</p>
      </div>
    </div>
  )
}

export default function ToolsPage() {
  return <Suspense fallback={<div style={{textAlign:'center',padding:80,color:'var(--muted)'}}>Loading...</div>}><ToolsContent /></Suspense>
}
