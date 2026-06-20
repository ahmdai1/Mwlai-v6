// ============================================================
// ⚙️  SITE CONFIG — كل إعدادات الموقع في مكان واحد
// ============================================================
// عدّل هنا فقط — مش محتاج تروح لأي ملف تاني

export const SITE = {
  // --- معلومات أساسية ---
  name: 'MWL AI',
  tagline_ar: 'أكبر دليل عربي لأدوات الذكاء الاصطناعي',
  tagline_en: 'Largest Arabic AI Tools Directory',
  url: 'https://mwlai.com',
  locale: 'ar_SA',

  // --- Google & Analytics ---
  // ⚠️ استبدل القيم دي بالكودات الحقيقية
  googleAnalyticsId: 'G-7X05LBKCKF',         // من analytics.google.com
  googleVerification: '<meta name="google-site-verification" content="L3GTPIj7d5Wt6-SB4HJbpVm5xdAK9AS9kFTGyNAdBGs" />',  // من Search Console
  bingVerification: 'YOUR_BING_VERIFICATION_CODE',      // من Bing Webmaster

  // --- SEO ---
  defaultDescription_ar: 'أكبر دليل عربي لأدوات الذكاء الاصطناعي. 800+ أداة AI مع كوبونات وعروض حصرية. اكتشف ChatGPT وClaude وMidjourney والأدوات الأكثر شيوعاً في 2026.',
  defaultDescription_en: 'Largest Arabic AI tools directory. 800+ AI tools with exclusive coupons. Discover ChatGPT, Claude, Midjourney and the most popular tools in 2026.',
  defaultKeywords: 'أدوات ذكاء اصطناعي,AI tools,عربي,خليج,كوبونات AI,ChatGPT,Claude,Midjourney,أدوات AI 2026,دليل AI عربي',

  // --- Social ---
  twitterHandle: '@mwlai',
  ogImage: '/og-image.png',

  // --- Stats (تُعرض في الـ Hero) ---
  toolsCount: '800+',
  categoriesCount: '17',
  updatedYear: '2026',
} as const

// ============================================================
// 💰 AFFILIATE CONFIG — كل برامج الافلييت في مكان واحد
// ============================================================
// عدّل الـ tracking IDs هنا لو اتغيرت

export const AFFILIATE = {
  // Impact
  hostinger: {
    baseUrl: 'https://hostinger.com',
    trackingId: '',  // أضف tracking ID هنا
    network: 'impact',
  },
  // ClickBank
  clickbank: {
    hoplink: '',  // hoplink prefix
    network: 'clickbank',
  },
  // GoHighLevel
  gohighlevel: {
    refCode: '',
    network: 'direct',
  },
  // Snov.io
  snovio: {
    refCode: '',
    network: 'direct',
  },
  // GetResponse
  getresponse: {
    refCode: '',
    network: 'direct',
  },
  // Skylum
  skylum: {
    network: 'impact',
    trackingId: '4032044',
  },
  // SentryPC
  sentrypc: {
    refCode: '',
    network: 'direct',
  },
} as const

// ============================================================
// 🎨 COLORS — ألوان الموقع
// ============================================================
// عدّل هنا بدل ما تدور في globals.css

export const COLORS = {
  primary: '#6d51f7',    // بنفسجي
  secondary: '#0dcbcb',  // تركوازي
  background: '#07070f', // خلفية
  card: '#0d0d1a',
  green: '#0ec98a',
  red: '#f04060',
  gold: '#e8a020',
} as const
