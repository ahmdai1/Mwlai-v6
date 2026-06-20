'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../../components/Nav'
import ShareBar from '../../../components/ShareBar'
import StarRating from '../../../components/StarRating'
import Footer from '../../../components/Footer'
import ToolLogo from '../../../components/ToolLogo'
import { tools, getRelated, pricingLabel, categories, getColor, initials } from '../../../lib/data'
import type { Tool } from '../../../lib/data'

export default function ToolClient({ slug }: { slug: string }) {
  const [ar, setAr] = useState(true)
  const [modal, setModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const tool = tools.find(t => t.slug === slug || t.id === slug)

  if (!tool) return (
    <div dir="rtl">
      <Nav ar={true} onLangToggle={() => {}} />
      <div className="empty" style={{ marginTop: 80 }}>
        <div className="empty-icon">🔍</div>
        <div className="empty-title">الأداة غير موجودة</div>
        <Link href="/tools" style={{ color: 'var(--p2)', textDecoration: 'none', marginTop: 16, display: 'inline-block' }}>← العودة للأدوات</Link>
      </div>
    </div>
  )

  const related = getRelated(tool, 6)
  const cat = categories.find(c => c.id === tool.category)
  const hasAff = !!tool.affiliate_url
  const hasCode = tool.coupon_code && tool.coupon_code !== 'NO_CODE' && tool.coupon_code !== ''

  function reveal() {
    if (hasCode) {
      navigator.clipboard.writeText(tool!.coupon_code).catch(() => {})
      setCopied(true)
    }
    setTimeout(() => window.open(tool!.affiliate_url, '_blank'), 500)
  }

  const seoTitle = ar
    ? `${tool.name_ar} — مراجعة وبدائل وكوبونات 2026 | MWL AI`
    : `${tool.name_en} — Review, Alternatives & Coupons 2026 | MWL AI`

  return (
    <div dir={ar ? 'rtl' : 'ltr'}>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name_en,
        "alternateName": tool.name_ar,
        "description": tool.desc_en,
        "applicationCategory": tool.category,
        "offers": {
          "@type": "Offer",
          "price": tool.price_starts === '$0' ? '0' : tool.price_starts,
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tool.rating,
          "bestRating": 5,
          "ratingCount": Math.floor(tool.trending_score * 100)
        },
        "url": tool.website,
        "inLanguage": ["ar", "en"],
        "dateModified": "2026-06-09"
      })}} />

      <Nav ar={ar} onLangToggle={() => setAr(p => !p)} />

      <div className="tool-page">
        {/* BREADCRUMB */}
        <nav className="breadcrumb" aria-label="breadcrumb">
          <Link href="/">{ar ? 'الرئيسية' : 'Home'}</Link>
          <span>›</span>
          <Link href="/tools">{ar ? 'الأدوات' : 'Tools'}</Link>
          <span>›</span>
          <Link href={`/tools?cat=${tool.category}`}>{cat ? (ar ? cat.ar : cat.en) : tool.category}</Link>
          <span>›</span>
          <span style={{ color: 'var(--text2)' }}>{ar ? tool.name_ar : tool.name_en}</span>
        </nav>

        {/* HERO CARD */}
        <div className="tool-hero-card">
          <div className="tool-hero-top">
            <ToolLogo tool={tool} size={80} radius={20} />
            <div className="tool-header-info">
              <h1 className="tool-name">{ar ? tool.name_ar : tool.name_en}</h1>
              <p className="tool-tagline">{ar ? tool.tagline_ar : tool.tagline_en}</p>
              <div className="tool-actions">
                {hasAff ? (
                  <button className="btn-go" onClick={() => setModal(true)}>
                    🎁 {ar ? 'احصل على العرض' : 'Get Deal'} {tool.coupon_discount && `— ${tool.coupon_discount}`}
                  </button>
                ) : (
                  <a href={tool.website} target="_blank" rel="noopener noreferrer" className="btn-go">
                    🌐 {ar ? 'زيارة الموقع' : 'Visit Website'} →
                  </a>
                )}
                {hasAff && (
                  <a href={tool.website} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    🌐 {ar ? 'الموقع الرسمي' : 'Official Site'}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* STAR RATING */}
          <div style={{ marginTop: 16 }}>
            <StarRating toolId={tool.id} baseRating={tool.rating || 4.2} ar={ar} />
          </div>

          {/* SHARE BAR */}
          <div style={{ marginTop: 14 }}>
            <ShareBar url={`/tools/${tool.slug}`} title={ar ? `${tool.name_ar} — ${tool.tagline_ar}` : `${tool.name_en} — ${tool.tagline_en}`} ar={ar} />
          </div>

          {/* META CHIPS */}
          <div className="tool-meta-row">
            {[
              { icon: '💰', label: ar ? 'السعر' : 'Price', val: pricingLabel(tool, ar) },
              { icon: '📊', label: ar ? 'الشعبية' : 'Score', val: `${tool.trending_score}/100` },
              { icon: '⭐', label: ar ? 'التقييم' : 'Rating', val: `${tool.rating}/5` },
              { icon: '📅', label: ar ? 'الإطلاق' : 'Launched', val: String(tool.launch_year) },
              { icon: '👥', label: ar ? 'الزيارات' : 'Visits', val: tool.monthly_visits },
              ...(tool.has_free_trial ? [{ icon: '🆓', label: ar ? 'تجربة مجانية' : 'Free Trial', val: ar ? 'متاحة' : 'Available' }] : []),
            ].map(m => (
              <div key={m.label} className="meta-chip">
                <span>{m.icon}</span>
                <span style={{ color: 'var(--dim)', fontSize: 11 }}>{m.label}:</span>
                <strong>{m.val}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="tool-section">
          <h2 className="tool-section-h">📝 {ar ? 'عن الأداة' : 'About'}</h2>
          <p className="tool-desc">{ar ? (tool.long_desc_ar || tool.desc_ar) : (tool.long_desc_en || tool.desc_en)}</p>
        </div>

        {/* USE CASES */}
        {(tool.use_cases_ar?.length > 0 || tool.use_cases_en?.length > 0) && (
          <div className="tool-section">
            <h2 className="tool-section-h">🎯 {ar ? 'حالات الاستخدام' : 'Use Cases'}</h2>
            <div className="uc-list">
              {(ar ? tool.use_cases_ar : tool.use_cases_en).map((uc, i) => (
                <div key={i} className="uc-item">
                  <div className="uc-dot" />
                  <span>{uc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INFO GRID */}
        <div className="tool-section">
          <h2 className="tool-section-h">📋 {ar ? 'معلومات الأداة' : 'Tool Info'}</h2>
          <div className="info-grid">
            {[
              { l: ar ? 'نوع التسعير' : 'Pricing', v: ar ? { free: 'مجاني', freemium: 'مجاني+', paid: 'مدفوع', subscription: 'اشتراك' }[tool.pricing_type] || tool.pricing_type : tool.pricing_type },
              { l: ar ? 'يبدأ من' : 'Starts at', v: tool.price_starts },
              { l: ar ? 'الفئة' : 'Category', v: cat ? (ar ? cat.ar : cat.en) : tool.category },
              { l: ar ? 'تجربة مجانية' : 'Free Trial', v: tool.has_free_trial ? (ar ? 'نعم' : 'Yes') : (ar ? 'لا' : 'No') },
              { l: ar ? 'سنة الإطلاق' : 'Launch Year', v: String(tool.launch_year) },
              { l: ar ? 'الزيارات الشهرية' : 'Monthly Visits', v: tool.monthly_visits },
            ].map(i => (
              <div key={i.l} className="info-box">
                <div className="info-label">{i.l}</div>
                <div className="info-val">{i.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PLATFORMS */}
        {tool.platforms?.length > 0 && (
          <div className="tool-section">
            <h2 className="tool-section-h">📱 {ar ? 'المنصات المتاحة' : 'Available Platforms'}</h2>
            <div className="platform-row">
              {tool.platforms.map(p => (
                <span key={p} className="platform-tag">
                  {{ web: '🌐 Web', ios: '📱 iOS', android: '🤖 Android', desktop: '💻 Desktop', api: '⚙️ API', vscode: '📝 VS Code', chrome: '🌐 Chrome', discord: '💬 Discord' }[p] || p}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* TAGS */}
        {(tool.tags_ar?.length > 0 || tool.tags_en?.length > 0) && (
          <div className="tool-section">
            <h2 className="tool-section-h">🏷️ {ar ? 'الوسوم' : 'Tags'}</h2>
            <div className="tag-row">
              {(ar ? tool.tags_ar : tool.tags_en).filter(Boolean).map((tag, i) => (
                <span key={i} className="tag-pill">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* COUPON */}
        {hasAff && (
          <div className="tool-section">
            <h2 className="tool-section-h">🎁 {ar ? 'العرض الحصري' : 'Exclusive Deal'}</h2>
            <div style={{
              background: 'linear-gradient(135deg,rgba(109,81,247,.1),rgba(13,203,203,.05))',
              border: '1px solid var(--border2)', borderRadius: 16, padding: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <ToolLogo tool={tool} size={56} radius={14} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                    {ar ? tool.name_ar : tool.name_en}
                    {tool.coupon_discount && (
                      <span style={{ color: 'var(--green)', marginRight: ar ? 0 : 8, marginLeft: ar ? 8 : 0 }}>
                        — {tool.coupon_discount}
                      </span>
                    )}
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: 13 }}>
                    {ar ? tool.desc_ar.slice(0, 100) + '...' : tool.desc_en.slice(0, 100) + '...'}
                  </div>
                </div>
                <button className="btn-go" onClick={() => setModal(true)}>
                  🎁 {ar ? 'احصل على العرض' : 'Get Deal'} →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ALTERNATIVES / RELATED */}
        {related.length > 0 && (
          <div className="tool-section">
            <h2 className="tool-section-h">🔄 {ar ? 'أدوات مشابهة' : 'Similar Tools'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12 }}>
              {related.map(r => (
                <Link key={r.id} href={`/tools/${r.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 12, padding: 14, display: 'flex', gap: 12,
                    alignItems: 'center', transition: 'border-color .2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border2)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <ToolLogo tool={r} size={40} radius={10} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{ar ? r.name_ar : r.name_en}</div>
                      <div style={{ color: 'var(--muted)', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ar ? r.tagline_ar : r.tagline_en}
                      </div>
                    </div>
                    <span style={{ color: 'var(--dim)', fontSize: 14 }}>{ar ? '←' : '→'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer ar={ar} />

      {/* COUPON MODAL */}
      {modal && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <button className="modal-x" onClick={() => setModal(false)}>✕</button>
            <div className="modal-logo"><ToolLogo tool={tool} size={72} radius={18} /></div>
            <div className="modal-title">
              {ar ? tool.name_ar : tool.name_en}
              {tool.coupon_discount && <div style={{ fontSize: 14, color: 'var(--green)', fontWeight: 700, marginTop: 4 }}>{tool.coupon_discount}</div>}
            </div>
            {hasCode ? (
              <>
                <div className="code-el" onClick={() => { navigator.clipboard.writeText(tool.coupon_code).catch(() => {}); setCopied(true) }}>{tool.coupon_code}</div>
                <p className={`copy-hint${copied ? ' ok' : ''}`}>{copied ? (ar ? '✓ تم النسخ!' : '✓ Copied!') : (ar ? 'اضغط للنسخ' : 'Click to copy')}</p>
              </>
            ) : (
              <div className="nocode-box">✅ {ar ? 'لا تحتاج كود — الخصم يُطبّق تلقائياً' : 'No code needed — discount auto-applied'}</div>
            )}
            <button className="go-btn" onClick={reveal}>🚀 {ar ? `الذهاب إلى ${tool.name_ar}` : `Go to ${tool.name_en}`} →</button>
            <p className="modal-sub">{tool.price_starts} · {ar ? 'يفتح في تبويب جديد' : 'Opens in new tab'}</p>
          </div>
        </div>
      )}
    </div>
  )
}
