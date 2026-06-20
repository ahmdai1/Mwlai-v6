import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://mwlai.com'),
  title: { default: 'MWL AI — دليل أدوات الذكاء الاصطناعي العربي 2026', template: '%s | MWL AI' },
  description: 'أكبر دليل عربي لأدوات الذكاء الاصطناعي. 800+ أداة AI مع كوبونات وعروض حصرية. اكتشف ChatGPT وClaude وMidjourney والأدوات الأكثر شيوعاً في 2026.',
  keywords: 'أدوات ذكاء اصطناعي,AI tools,عربي,خليج,كوبونات AI,ChatGPT,Claude,Midjourney,أدوات AI 2026,دليل AI عربي',
  authors: [{ name: 'MWL AI', url: 'https://mwlai.com' }],
  creator: 'MWL AI',
  publisher: 'MWL AI',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    type: 'website', locale: 'ar_SA', alternateLocale: 'en_US',
    siteName: 'MWL AI',
    title: 'MWL AI — دليل أدوات الذكاء الاصطناعي العربي 2026',
    description: 'أكبر دليل عربي لأدوات AI — 800+ أداة مع كوبونات حصرية',
    url: 'https://mwlai.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MWL AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MWL AI — دليل أدوات الذكاء الاصطناعي',
    description: '800+ أداة AI مع كوبونات وعروض حصرية للسوق العربي',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://mwlai.com' },
  other: {
    'google-site-verification': 'YOUR_GOOGLE_VERIFICATION_CODE',
    'msvalidate.01': 'YOUR_BING_VERIFICATION_CODE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Structured Data - Organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MWL AI",
          "url": "https://mwlai.com",
          "description": "أكبر دليل عربي لأدوات الذكاء الاصطناعي",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://mwlai.com/tools?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "inLanguage": ["ar", "en"],
          "audience": { "@type": "Audience", "geographicArea": "Middle East" }
        })}} />
        {/* Google Analytics - replace GA_ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer=window.dataLayer||[];
          function gtag(){dataLayer.push(arguments);}
          gtag('js',new Date());
          gtag('config','GA_MEASUREMENT_ID');
        `}} />
      </head>
      <body>
        <div className="ai-bg"><div className="grid-lines" /></div>
        <div className="page-wrap">{children}</div>
        <Analytics />
      </body>
    </html>
  )
}
