import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, getCatIcon } from '../../lib/blog'

export const metadata: Metadata = {
  title: 'مدونة MWL AI — مقالات وأدلة الذكاء الاصطناعي 2026',
  description: '23+ مقالة احترافية عن أدوات الذكاء الاصطناعي — مراجعات ومقارنات وأدلة عملية للسوق العربي والخليجي.',
  keywords: 'مدونة AI عربي, مقالات ذكاء اصطناعي, دليل AI 2026, مراجعات أدوات AI',
  alternates: { canonical: 'https://mwlai.com/blog' },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const featured = posts.filter(p => p.featured)
  const rest = posts.filter(p => !p.featured)

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"Blog",
        "name":"MWL AI Blog","url":"https://mwlai.com/blog","inLanguage":"ar",
        "blogPost": posts.slice(0,10).map(p=>({
          "@type":"BlogPosting","headline":p.title,"description":p.description,
          "url":`https://mwlai.com/blog/${p.slug}`,"datePublished":p.date,
          "author":{"@type":"Person","name":p.author}
        }))
      })}} />

      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">🧠 MWL AI</Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">الرئيسية</Link>
            <Link href="/tools" className="nav-link">الأدوات</Link>
            <Link href="/blog" className="nav-link active">المدونة</Link>
            <Link href="/coupons" className="nav-link">الكوبونات</Link>
            <Link href="/categories" className="nav-link">التصنيفات</Link>
          </div>
          <div className="nav-right">
            <Link href="/coupons" className="nav-cta">🎁 العروض</Link>
          </div>
        </div>
      </nav>

      <div className="cat-hero">
        <span className="cat-icon">📝</span>
        <h1 className="cat-title">مدونة MWL AI</h1>
        <p className="cat-desc">أعمق محتوى عربي عن أدوات الذكاء الاصطناعي — {posts.length} مقالة متخصصة</p>
      </div>

      <div style={{ maxWidth: 1200, margin: '32px auto', padding: '0 24px 80px' }}>
        {featured.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans','Cairo',sans-serif", fontSize:18, fontWeight:800, marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
              ⭐ مقالات مميزة
            </h2>
            <div className="blog-grid">
              {featured.map(p => <PostCard key={p.slug} post={p} featured />)}
            </div>
          </section>
        )}

        <section>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans','Cairo',sans-serif", fontSize:18, fontWeight:800, marginBottom:20 }}>
            📚 جميع المقالات
          </h2>
          <div className="blog-grid">
            {rest.map(p => <PostCard key={p.slug} post={p} />)}
          </div>
        </section>

        <div style={{ marginTop:64, textAlign:'center', background:'var(--card)', border:'1px solid var(--border-accent)', borderRadius:24, padding:'40px 24px' }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🎁</div>
          <h3 style={{ fontFamily:"'Plus Jakarta Sans','Cairo',sans-serif", fontSize:22, fontWeight:800, marginBottom:8 }}>كوبونات وعروض AI حصرية</h3>
          <p style={{ color:'var(--muted)', marginBottom:20 }}>16 كوبون محدّث — يونيو 2026</p>
          <Link href="/coupons" className="btn-primary" style={{ display:'inline-flex' }}>🎁 عرض جميع الكوبونات →</Link>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-bottom">
            <span className="footer-copy">© 2026 MWL AI</span>
            <div className="footer-badges">
              <span className="footer-badge">23 مقالة</span>
              <span className="footer-badge">SEO 2026</span>
              <span className="footer-badge">GEO Ready</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function PostCard({ post: p, featured }: { post: ReturnType<typeof getAllPosts>[0]; featured?: boolean }) {
  const icon = getCatIcon(p.category)
  const dateStr = new Date(p.date).toLocaleDateString('ar-SA',{year:'numeric',month:'long',day:'numeric'})
  return (
    <Link href={`/blog/${p.slug}`} className="blog-card" style={featured?{borderColor:'rgba(245,158,11,.25)'}:{}}>
      <div className="blog-cat-badge">{icon} {p.category}</div>
      {featured && <span style={{ position:'absolute', top:14, left:14, background:'rgba(245,158,11,.1)', border:'1px solid rgba(245,158,11,.2)', borderRadius:6, padding:'2px 8px', fontSize:10, color:'#f59e0b', fontWeight:700 }}>⭐ مميز</span>}
      <h2 className="blog-title">{p.title}</h2>
      <p className="blog-excerpt">{p.description}</p>
      <div className="blog-meta">
        <span>{dateStr} · ⏱ {p.readTime} دقائق</span>
        <span className="blog-read-more">اقرأ المقالة ←</span>
      </div>
    </Link>
  )
}
