'use client'
import { useState, useMemo } from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ToolLogo from '../../components/ToolLogo'
import { getCoupons, tools } from '../../lib/data'
import type { Tool } from '../../lib/data'

const COUPON_CATS = [
  { id:'all', ar:'الكل', en:'All', icon:'🌐' },
  { id:'hosting', ar:'استضافة', en:'Hosting', icon:'🖥️' },
  { id:'marketing', ar:'تسويق', en:'Marketing', icon:'📢' },
  { id:'image', ar:'صور AI', en:'AI Images', icon:'🎨' },
  { id:'ecommerce', ar:'تجارة', en:'E-Commerce', icon:'🛒' },
  { id:'security', ar:'أمان', en:'Security', icon:'🔒' },
  { id:'education', ar:'تعليم', en:'Education', icon:'📚' },
  { id:'audio', ar:'صوت', en:'Audio', icon:'🎵' },
]

export default function CouponsPage() {
  const [ar, setAr] = useState(true)
  const [cat, setCat] = useState('all')
  const [modal, setModal] = useState<Tool | null>(null)
  const [copied, setCopied] = useState(false)

  const allCoupons = useMemo(() => getCoupons(), [])
  const filtered = useMemo(() =>
    cat === 'all' ? allCoupons : allCoupons.filter(t => t.category === cat),
    [cat, allCoupons]
  )

  function reveal(t: Tool) {
    if (t.coupon_code && t.coupon_code !== 'NO_CODE' && t.coupon_code !== '') {
      navigator.clipboard.writeText(t.coupon_code).catch(() => {})
      setCopied(true)
    }
    setTimeout(() => window.open(t.affiliate_url, '_blank'), 500)
  }

  const topDiscount = allCoupons.find(t => t.coupon_discount?.includes('75')) 
  const totalSaved = allCoupons.length

  return (
    <div dir={ar ? 'rtl' : 'ltr'}>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "AI Tools Coupons 2026",
        "description": "Exclusive AI tools coupons and deals",
        "numberOfItems": allCoupons.length,
        "itemListElement": allCoupons.slice(0, 10).map((t, i) => ({
          "@type": "ListItem", "position": i + 1,
          "item": {
            "@type": "Offer",
            "name": t.name_en,
            "description": t.desc_en,
            "url": t.affiliate_url,
            "discount": t.coupon_discount,
          }
        }))
      })}} />

      <Nav ar={ar} onLangToggle={() => setAr(p => !p)} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="dot" /> {ar ? 'كوبونات موثّقة 2026' : 'Verified Coupons 2026'}
        </div>
        <h1>
          {ar ? (<><span className="grad">كوبونات وعروض AI</span><br />حصرية ومحدّثة</>)
             : (<><span className="grad">Exclusive AI Coupons</span><br />& Fresh Deals</>)}
        </h1>
        <p>
          {ar ? 'كل الكوبونات موثّقة ومحدّثة — اضغط للكشف والنسخ والانتقال للموقع تلقائياً'
             : 'All coupons verified and updated — click to reveal, copy, and auto-navigate'}
        </p>
        <div className="hero-stats">
          <div className="stat"><span className="stat-n">{allCoupons.length}</span><span className="stat-l">{ar ? 'كوبون نشط' : 'Active Coupons'}</span></div>
          <div className="stat"><span className="stat-n">75%</span><span className="stat-l">{ar ? 'أعلى خصم' : 'Top Discount'}</span></div>
          <div className="stat"><span className="stat-n">$0</span><span className="stat-l">{ar ? 'تكلفة التوفير' : 'Cost to Save'}</span></div>
          <div className="stat"><span className="stat-n">2026</span><span className="stat-l">{ar ? 'محدّث' : 'Updated'}</span></div>
        </div>
      </section>

      {/* FILTERS */}
      <div className="filters-bar" style={{ marginTop: 24 }}>
        <div className="filters-scroll">
          {COUPON_CATS.map(c => (
            <button key={c.id} className={`fbt${cat === c.id ? ' on' : ''}`} onClick={() => setCat(c.id)}>
              {c.icon} {ar ? c.ar : c.en}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="tools-section">
        <div className="grid-meta">
          <span className="grid-label">{filtered.length} {ar ? 'كوبون' : 'coupons'}</span>
        </div>
        <div className="coupon-grid">
          {filtered.map(t => (
            <CouponCard key={t.id} tool={t} ar={ar}
              onReveal={() => { setModal(t); setCopied(false); reveal(t) }} />
          ))}
        </div>
      </div>

      <Footer ar={ar} />

      {modal && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal">
            <button className="modal-x" onClick={() => setModal(null)}>✕</button>
            <div className="modal-logo"><ToolLogo tool={modal} size={72} radius={18} /></div>
            <div className="modal-title">
              {ar ? modal.name_ar : modal.name_en}
              {modal.coupon_discount && <div style={{ fontSize: 14, color: 'var(--green)', fontWeight: 700, marginTop: 4 }}>{modal.coupon_discount}</div>}
            </div>
            {modal.coupon_code && modal.coupon_code !== 'NO_CODE' && modal.coupon_code !== '' ? (
              <>
                <div className="code-el" onClick={() => { navigator.clipboard.writeText(modal.coupon_code).catch(() => {}); setCopied(true) }}>{modal.coupon_code}</div>
                <p className={`copy-hint${copied ? ' ok' : ''}`}>{copied ? '✓ تم النسخ!' : 'اضغط للنسخ'}</p>
              </>
            ) : (
              <div className="nocode-box">✅ {ar ? 'الخصم يُطبّق تلقائياً' : 'Discount auto-applied'}</div>
            )}
            <button className="go-btn" onClick={() => window.open(modal.affiliate_url, '_blank')}>
              🚀 {ar ? `الذهاب إلى ${modal.name_ar}` : `Go to ${modal.name_en}`} →
            </button>
            <p className="modal-sub">{modal.price_starts} · {ar ? 'فُتح تلقائياً' : 'Auto-opened'}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function CouponCard({ tool, ar, onReveal }: { tool: Tool; ar: boolean; onReveal: () => void }) {
  const hasCode = tool.coupon_code && tool.coupon_code !== 'NO_CODE' && tool.coupon_code !== ''
  function mask(code: string) {
    if (!code || code === 'NO_CODE') return ar ? '— بدون كود —' : '— No code —'
    return code.slice(0, 3) + '•'.repeat(Math.max(3, code.length - 3))
  }
  return (
    <div className={`cc${tool.featured ? ' feat' : ''}`}>
      <div className="cc-top">
        <div className="cc-logo"><ToolLogo tool={tool} size={46} radius={12} /></div>
        <div>
          <div className="cc-name">{ar ? tool.name_ar : tool.name_en}</div>
          {tool.coupon_discount && <div className="cc-disc">{tool.coupon_discount}</div>}
        </div>
      </div>
      <p className="cc-desc">{ar ? tool.desc_ar : tool.desc_en}</p>
      <div className="success-row">
        <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: 11 }}>✅ {ar ? 'موثّق' : 'Verified'}</span>
        <span style={{ fontSize: 11 }}>{tool.trending_score}%</span>
      </div>
      <div className="success-bar">
        <div className={`sfill ${tool.trending_score >= 70 ? 'sg' : tool.trending_score >= 40 ? 'sy' : 'sr'}`}
          style={{ width: `${tool.trending_score}%` }} />
      </div>
      <div className="cc-bottom">
        <div className="code-mask" onClick={onReveal}>{mask(tool.coupon_code)}</div>
        <button className="reveal-btn" onClick={onReveal}>{ar ? 'كشف →' : 'Reveal →'}</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--dim)' }}>
        <span>{tool.price_starts}</span>
        <span>{ar ? 'يفتح رابط الخصم تلقائياً' : 'Auto-opens discount link'}</span>
      </div>
    </div>
  )
}
