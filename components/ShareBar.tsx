'use client'
import { useState } from 'react'

interface Props { url: string; title: string; ar: boolean }

export default function ShareBar({ url, title, ar }: Props) {
  const [copied, setCopied] = useState(false)
  const full = `https://mwlai.com${url}`

  return (
    <div className="share-bar">
      <span style={{ fontSize:13, color:'var(--muted)', fontWeight:600 }}>{ar?'شارك:':'Share:'}</span>
      <button className="share-btn wa" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(title+'\n'+full)}`, '_blank')}>
        📱 WhatsApp
      </button>
      <button className="share-btn" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(full)}`, '_blank')}>
        🐦 X
      </button>
      <button className="share-btn" onClick={() => { navigator.clipboard.writeText(full); setCopied(true); setTimeout(()=>setCopied(false),2000) }}>
        {copied?'✓':'🔗'} {copied?(ar?'تم!':'Copied!'):(ar?'نسخ الرابط':'Copy Link')}
      </button>
    </div>
  )
}
