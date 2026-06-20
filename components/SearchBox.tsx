'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { tools, getColor, initials, pricingLabel } from '../lib/data'
import type { Tool } from '../lib/data'

interface Props { value: string; onChange: (v: string) => void; ar: boolean; placeholder?: string }

export default function SearchBox({ value, onChange, ar, placeholder }: Props) {
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const suggestions: Tool[] = value.trim().length >= 1
    ? tools.filter(t => {
        const q = value.toLowerCase()
        return t.name_ar.includes(q) || t.name_en.toLowerCase().includes(q) ||
          (t.tags_en || []).some(g => g.toLowerCase().includes(q))
      }).slice(0, 7)
    : []

  const show = focused && suggestions.length > 0

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setFocused(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div ref={ref} className="search-wrap" style={{ position: 'relative' }}>
      <span className="search-icon">🔍</span>
      <input className="search-input" type="text" value={value} autoComplete="off"
        onChange={e => { onChange(e.target.value) }}
        onFocus={() => setFocused(true)}
        placeholder={placeholder || (ar ? 'ابحث عن أداة AI...' : 'Search AI tools...')} />
      {value && (
        <button onClick={() => { onChange(''); setFocused(false) }}
          style={{ position:'absolute', [ar?'left':'right']:14, top:'50%', transform:'translateY(-50%)',
            background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontSize:16 }}>✕</button>
      )}
      {show && (
        <div className="search-suggestions">
          {suggestions.map(t => (
            <Link key={t.id} href={`/tools/${t.slug}`} className="suggestion-item"
              onClick={() => { onChange(ar ? t.name_ar : t.name_en); setFocused(false) }}>
              <div className="suggestion-logo" style={{ background: getColor(t) }}>
                <img src={t.logo_url} alt={t.name_en}
                  onError={e => { const el = e.currentTarget; el.style.display='none'; if(el.parentElement) el.parentElement.innerHTML = initials(t.name_en) }} />
              </div>
              <div>
                <div className="suggestion-name">{ar ? t.name_ar : t.name_en}</div>
                <div className="suggestion-meta">{t.category} · {pricingLabel(t, ar)}</div>
              </div>
              {t.affiliate_url && <span className="bdg bdg-aff" style={{ marginRight:'auto', marginLeft:'auto', flexShrink:0 }}>💰</span>}
            </Link>
          ))}
          <div style={{ padding:'8px 16px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:12, color:'var(--muted)' }}>{suggestions.length} {ar?'نتيجة':'results'}</span>
            <Link href={`/tools?q=${encodeURIComponent(value)}`} onClick={() => setFocused(false)}
              style={{ fontSize:12, color:'var(--p2)', textDecoration:'none', fontWeight:600 }}>
              {ar ? 'عرض الكل ←' : 'View all →'}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
