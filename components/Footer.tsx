import Link from 'next/link'
interface FooterProps { ar: boolean }
export default function Footer({ ar }: FooterProps) {
  const cols = [
    { title: ar ? 'الأدوات' : 'Tools', links: [
      { href: '/tools?cat=chatbots', label: ar ? 'محادثة AI' : 'AI Chat' },
      { href: '/tools?cat=coding', label: ar ? 'برمجة' : 'Coding' },
      { href: '/tools?cat=image', label: ar ? 'توليد صور' : 'Images' },
      { href: '/tools?cat=video', label: ar ? 'فيديو' : 'Video' },
      { href: '/tools?cat=audio', label: ar ? 'صوت' : 'Audio' },
    ]},
    { title: ar ? 'روابط سريعة' : 'Quick Links', links: [
      { href: '/blog', label: ar ? 'المدونة' : 'Blog' },
      { href: '/coupons', label: ar ? 'الكوبونات والعروض' : 'Coupons & Deals' },
      { href: '/categories', label: ar ? 'التصنيفات' : 'Categories' },
      { href: '/tools?sort=trending', label: ar ? 'الأكثر شيوعاً' : 'Trending' },
      { href: '/tools?sort=new', label: ar ? 'أحدث الأدوات' : 'Newest' },
    ]},
    { title: ar ? 'عروض الاستضافة' : 'Hosting Deals', links: [
      { href: '/tools/hostinger', label: 'Hostinger — خصم 75%' },
      { href: '/tools/namecheap', label: 'Namecheap — .com $5.98' },
      { href: '/tools/cloudways', label: 'Cloudways — 3 أشهر مجاناً' },
      { href: '/tools/fastcomet', label: 'FastComet — خصم 70%' },
    ]},
  ]
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo">🧠 MWL AI</Link>
            <p style={{color:'var(--muted)',fontSize:13,lineHeight:1.7,maxWidth:220,marginTop:8}}>
              {ar ? 'أكبر دليل عربي لأدوات الذكاء الاصطناعي. 800+ أداة مع كوبونات وعروض حصرية.'
                  : 'Largest Arabic AI tools directory. 800+ tools with exclusive coupons.'}
            </p>
          </div>
          {cols.map(col => (
            <div key={col.title} className="footer-col">
              <h4>{col.title}</h4>
              <div className="footer-links-list">
                {col.links.map(l => <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>)}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 MWL AI — {ar ? 'جميع الحقوق محفوظة' : 'All rights reserved'}</span>
          <div className="footer-badges">
            {['800+ Tools','SEO 2026','GEO Ready','Arabic First'].map(b => (
              <span key={b} className="footer-badge">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
