import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllPosts, getBlogPost, mdToHtml, getCatIcon } from '../../../lib/blog'
import { tools } from '../../../lib/data'
import type { Tool } from '../../../lib/data'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'مقالة غير موجودة' }
  return {
    title: post.title, description: post.description, keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: { title: post.title, description: post.description, type: 'article', publishedTime: post.date, url: `https://mwlai.com/blog/${post.slug}`, siteName: 'MWL AI', locale: 'ar_SA' },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
    alternates: { canonical: `https://mwlai.com/blog/${post.slug}` },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const related = allPosts.filter(p => p.slug !== slug && (p.category === post.category || p.featured)).slice(0, 3)
  const htmlContent = mdToHtml(post.content)
  const dateStr = new Date(post.date).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
  const icon = getCatIcon(post.category)

  // Find tools mentioned in article (by checking tool names in content)
  const mentionedTools = tools
    .filter(t => post.content.toLowerCase().includes(t.name_en.toLowerCase()) || post.content.includes(t.name_ar))
    .filter(t => t.affiliate_url)
    .slice(0, 4)

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"BlogPosting",
        "headline":post.title,"description":post.description,
        "author":{"@type":"Person","name":post.author},
        "datePublished":post.date,"dateModified":post.date,
        "url":`https://mwlai.com/blog/${post.slug}`,"inLanguage":"ar",
        "publisher":{"@type":"Organization","name":"MWL AI","url":"https://mwlai.com"},
        "keywords":post.keywords,
        "mainEntityOfPage":{"@type":"WebPage","@id":`https://mwlai.com/blog/${post.slug}`}
      })}} />

      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">🧠 MWL AI</Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">الرئيسية</Link>
            <Link href="/tools" className="nav-link">الأدوات</Link>
            <Link href="/blog" className="nav-link active">المدونة</Link>
            <Link href="/coupons" className="nav-link">الكوبونات</Link>
          </div>
          <div className="nav-right">
            <Link href="/coupons" className="nav-cta">🎁 العروض</Link>
          </div>
        </div>
      </nav>

      <div className="article-wrap">
        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--muted)', marginBottom:28, flexWrap:'wrap' }}>
          <Link href="/" style={{ color:'var(--muted)', textDecoration:'none' }}>الرئيسية</Link>
          <span>›</span>
          <Link href="/blog" style={{ color:'var(--muted)', textDecoration:'none' }}>المدونة</Link>
          <span>›</span>
          <span style={{ color:'var(--text2)' }}>{post.category}</span>
        </nav>

        {/* HEADER */}
        <header className="article-header">
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, flexWrap:'wrap' }}>
            <span className="blog-cat-badge">{icon} {post.category}</span>
            {post.featured && <span style={{ background:'rgba(245,158,11,.1)', border:'1px solid rgba(245,158,11,.2)', borderRadius:8, padding:'3px 10px', fontSize:11, color:'#f59e0b', fontWeight:700 }}>⭐ مقالة مميزة</span>}
          </div>
          <h1 className="article-title">{post.title}</h1>
          <p style={{ color:'var(--muted)', fontSize:16, lineHeight:1.7, marginBottom:20 }}>{post.description}</p>
          <div className="article-meta-row">
            <span>✍️ {post.author}</span>
            <span>📅 {dateStr}</span>
            <span>⏱ {post.readTime} دقائق قراءة</span>
            <span>🌐 <a href="https://mwlai.com" style={{ color:'var(--primary-light)', textDecoration:'none' }}>MWL AI</a></span>
          </div>
        </header>

        {/* ARTICLE BODY */}
        <article className="article-body" dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {/* AFFILIATE TOOLS CTA */}
        {mentionedTools.length > 0 && (
          <div style={{ margin:'40px 0', background:'linear-gradient(135deg,rgba(109,81,247,.08),rgba(13,203,203,.04))', border:'1px solid var(--border-accent)', borderRadius:18, padding:24 }}>
            <h3 style={{ fontFamily:"'Cairo',sans-serif", fontSize:17, fontWeight:700, marginBottom:16 }}>
              🎁 عروض حصرية على الأدوات المذكورة
            </h3>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:10 }}>
              {mentionedTools.map(t => (
                <a key={t.id} href={t.affiliate_url} target="_blank" rel="noopener noreferrer" style={{
                  background:'var(--card)', border:'1px solid var(--border-accent)',
                  borderRadius:12, padding:'12px 14px', textDecoration:'none',
                  display:'flex', alignItems:'center', gap:10, transition:'all .2s'
                }}>
                  <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{t.name_ar}</span>
                  {t.coupon_discount && <span style={{ fontSize:11, color:'var(--emerald)', fontWeight:700 }}>{t.coupon_discount}</span>}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* SHARE BAR */}
        <div className="share-bar">
          <span style={{ fontSize:13, color:'var(--muted)', fontWeight:600 }}>شارك المقالة:</span>
          {[
            { label:'واتساب', href:`https://wa.me/?text=${encodeURIComponent(post.title+' '+`https://mwlai.com/blog/${post.slug}`)}`, cls:'wa' },
            { label:'تويتر', href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://mwlai.com/blog/${post.slug}`)}`, cls:'' },
            { label:'LinkedIn', href:`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://mwlai.com/blog/${post.slug}`)}`, cls:'' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`share-btn ${s.cls}`}>{s.label}</a>
          ))}
        </div>

        {/* RELATED POSTS */}
        {related.length > 0 && (
          <div style={{ marginTop:48 }}>
            <h2 style={{ fontFamily:"'Cairo',sans-serif", fontSize:18, fontWeight:800, marginBottom:20, paddingBottom:10, borderBottom:'1px solid var(--border)' }}>
              📚 مقالات ذات صلة
            </h2>
            <div className="blog-grid" style={{ gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))' }}>
              {related.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
                  <div className="blog-cat-badge">{getCatIcon(p.category)} {p.category}</div>
                  <h3 className="blog-title" style={{ fontSize:14 }}>{p.title}</h3>
                  <div className="blog-meta"><span>⏱ {p.readTime} دقائق</span><span className="blog-read-more">←</span></div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop:40, textAlign:'center' }}>
          <Link href="/blog" style={{ color:'var(--muted)', textDecoration:'none', fontSize:14, display:'inline-flex', alignItems:'center', gap:6, padding:'10px 20px', border:'1px solid var(--border)', borderRadius:10 }}>
            → العودة لجميع المقالات
          </Link>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-bottom">
            <span className="footer-copy">© 2026 MWL AI — جميع الحقوق محفوظة</span>
            <div className="footer-badges">
              <span className="footer-badge">SEO 2026</span>
              <span className="footer-badge">GEO Ready</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
