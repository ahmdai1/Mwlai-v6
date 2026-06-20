'use client'
import { useState, useEffect } from 'react'

interface Props { toolId: string; baseRating: number; ar: boolean }

export default function StarRating({ toolId, baseRating, ar }: Props) {
  const [user, setUser] = useState(0)
  const [hover, setHover] = useState(0)
  const [saved, setSaved] = useState(false)
  const [total, setTotal] = useState(Math.floor(baseRating * 180))

  useEffect(() => {
    const v = localStorage.getItem(`rating_${toolId}`)
    if (v) { setUser(+v); setSaved(true) }
  }, [toolId])

  function rate(n: number) {
    if (saved) return
    setUser(n); setSaved(true); setTotal(t => t+1)
    localStorage.setItem(`rating_${toolId}`, String(n))
  }

  const display = saved ? ((baseRating*total + user)/(total+1)).toFixed(1) : baseRating.toFixed(1)
  const active = hover || user || Math.round(baseRating)

  return (
    <div className="star-wrap">
      <div className="stars">
        {[1,2,3,4,5].map(n => (
          <span key={n} className={`star${n<=active?' filled':''}`}
            onMouseEnter={() => !saved && setHover(n)}
            onMouseLeave={() => !saved && setHover(0)}
            onClick={() => rate(n)}
            style={{ cursor: saved?'default':'pointer' }}>★</span>
        ))}
      </div>
      <span style={{ fontSize:15, fontWeight:800, color:'#f59e0b' }}>{display}</span>
      <span className="rating-count">({total.toLocaleString()} {ar?'تقييم':'ratings'})</span>
      {saved && <span style={{ fontSize:12, color:'#10b981', fontWeight:600 }}>✓ {ar?'شكراً!':'Thanks!'}</span>}
      {!saved && <span style={{ fontSize:12, color:'var(--muted)' }}>{ar?'قيّم الأداة':'Rate this tool'}</span>}
    </div>
  )
}
