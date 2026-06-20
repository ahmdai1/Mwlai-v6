'use client'
import { useState } from 'react'

export default function Newsletter({ ar }: { ar: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'ok'|'err'>('idle')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) { setStatus('err'); return }
    const saved = JSON.parse(localStorage.getItem('nl_emails')||'[]')
    saved.push({ email, date: new Date().toISOString() })
    localStorage.setItem('nl_emails', JSON.stringify(saved))
    setStatus('ok'); setEmail('')
  }

  return (
    <div className="newsletter-section">
      <div className="newsletter-card">
        <div style={{ fontSize:32, marginBottom:10 }}>📬</div>
        <div className="newsletter-title">{ar ? 'ابق محدّثاً بأحدث أدوات AI' : 'Stay Updated on Latest AI Tools'}</div>
        <div className="newsletter-sub">{ar ? 'أهم الأدوات والكوبونات أسبوعياً، بدون سبام' : 'Best tools and coupons weekly, no spam'}</div>
        {status === 'ok' ? (
          <div style={{ background:'rgba(16,185,129,.12)', border:'1px solid rgba(16,185,129,.3)', borderRadius:12, padding:'14px 20px', color:'#34d399', fontWeight:700 }}>
            ✅ {ar ? 'تم التسجيل! شكراً 🎉' : 'Subscribed! Thank you 🎉'}
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={submit}>
            <input className="newsletter-input" type="email" value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle') }}
              placeholder={ar ? 'بريدك الإلكتروني...' : 'Your email...'} dir={ar?'rtl':'ltr'} />
            <button type="submit" className="newsletter-btn">{ar ? 'اشترك' : 'Subscribe'}</button>
          </form>
        )}
        {status === 'err' && <p style={{ fontSize:12, color:'#f87171', marginTop:6 }}>{ar?'أدخل بريداً صحيحاً':'Enter a valid email'}</p>}
        <p className="newsletter-note">🔒 {ar ? 'لن نرسل سبام — إلغاء الاشتراك في أي وقت' : 'No spam — unsubscribe anytime'}</p>
      </div>
    </div>
  )
}
