import Link from 'next/link'
export default function NotFound() {
  return (
    <div dir="rtl" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:24, background:'var(--bg)' }}>
      <div style={{ fontSize:72, marginBottom:20 }}>🤖</div>
      <h1 style={{ fontSize:56, fontWeight:900, color:'var(--text)', marginBottom:8, letterSpacing:-2 }}>404</h1>
      <p style={{ fontSize:18, color:'var(--muted)', marginBottom:32 }}>الصفحة غير موجودة</p>
      <Link href="/" style={{ background:'linear-gradient(135deg,#7c3aed,#6d28d9)', color:'#fff', padding:'12px 28px', borderRadius:12, fontWeight:700, fontSize:15, textDecoration:'none' }}>
        ← الرجوع للرئيسية
      </Link>
    </div>
  )
}
