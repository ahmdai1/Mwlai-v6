// ============================================================
// 📦 lib/data.ts — يجمع كل الأدوات من ملفات الكاتيجوري
// ============================================================
// مش محتاج تعدّل هنا — الأدوات في content/tools-data/

import chatbots    from '../content/tools-data/chatbots.json'
import coding      from '../content/tools-data/coding.json'
import image       from '../content/tools-data/image.json'
import video       from '../content/tools-data/video.json'
import audio       from '../content/tools-data/audio.json'
import productivity from '../content/tools-data/productivity.json'
import writing     from '../content/tools-data/writing.json'
import seo         from '../content/tools-data/seo.json'
import marketing   from '../content/tools-data/marketing.json'
import automation  from '../content/tools-data/automation.json'
import design      from '../content/tools-data/design.json'
import research    from '../content/tools-data/research.json'
import education   from '../content/tools-data/education.json'
import business    from '../content/tools-data/business.json'
import ecommerce   from '../content/tools-data/ecommerce.json'
import hosting     from '../content/tools-data/hosting.json'
import security    from '../content/tools-data/security.json'

export interface Tool {
  id: string; name_ar: string; name_en: string; slug: string;
  tagline_ar: string; tagline_en: string; desc_ar: string; desc_en: string;
  long_desc_ar: string; long_desc_en: string; category: string;
  tags_ar: string[]; tags_en: string[]; pricing_type: string;
  price_starts: string; price_pro: string; has_free_trial: boolean;
  platforms: string[]; website: string; monthly_visits: string;
  trending_score: number; rating: number; featured: boolean;
  is_new: boolean; launch_year: number; alternatives: string[];
  integrations: string[]; use_cases_ar: string[]; use_cases_en: string[];
  affiliate_url: string; coupon_code: string; coupon_discount: string;
  logo_url: string;
}

// ============================================================
// يجمع كل الكاتيجوريز تلقائياً
// ============================================================
const allRaw = [
  ...chatbots, ...coding, ...image, ...video, ...audio,
  ...productivity, ...writing, ...seo, ...marketing, ...automation,
  ...design, ...research, ...education, ...business, ...ecommerce,
  ...hosting, ...security,
]

export const tools: Tool[] = (allRaw as Tool[]).map(t => ({
  ...t,
  trending_score: Number(t.trending_score) || 75,
  rating: Number(t.rating) || 4.0,
})).sort((a, b) => {
  if (a.affiliate_url && !b.affiliate_url) return -1
  if (!a.affiliate_url && b.affiliate_url) return 1
  return b.trending_score - a.trending_score
})

// ============================================================
// Categories
// ============================================================
export const categories = [
  { id: 'all',        ar: 'الكل',          en: 'All',         icon: '🌐' },
  { id: 'chatbots',   ar: 'محادثة AI',     en: 'AI Chat',     icon: '💬' },
  { id: 'coding',     ar: 'برمجة',         en: 'Coding',      icon: '💻' },
  { id: 'image',      ar: 'توليد صور',     en: 'Images',      icon: '🎨' },
  { id: 'video',      ar: 'فيديو',         en: 'Video',       icon: '🎬' },
  { id: 'audio',      ar: 'صوت وموسيقى',   en: 'Audio',       icon: '🎵' },
  { id: 'writing',    ar: 'كتابة',         en: 'Writing',     icon: '✍️'  },
  { id: 'seo',        ar: 'SEO',           en: 'SEO',         icon: '📈' },
  { id: 'marketing',  ar: 'تسويق',         en: 'Marketing',   icon: '📢' },
  { id: 'automation', ar: 'أتمتة',         en: 'Automation',  icon: '⚡' },
  { id: 'design',     ar: 'تصميم',         en: 'Design',      icon: '🖌️' },
  { id: 'productivity',ar: 'إنتاجية',     en: 'Productivity', icon: '🚀' },
  { id: 'research',   ar: 'بحث',           en: 'Research',    icon: '🔬' },
  { id: 'education',  ar: 'تعليم',         en: 'Education',   icon: '📚' },
  { id: 'business',   ar: 'أعمال',         en: 'Business',    icon: '💼' },
  { id: 'ecommerce',  ar: 'تجارة',         en: 'E-Commerce',  icon: '🛒' },
  { id: 'hosting',    ar: 'استضافة',       en: 'Hosting',     icon: '🖥️' },
  { id: 'security',   ar: 'أمان',          en: 'Security',    icon: '🔒' },
]

// ============================================================
// Color utilities
// ============================================================
export const CAT_COLORS: Record<string, string> = {
  chatbots:    'linear-gradient(135deg,#10a37f,#1a7f64)',
  coding:      'linear-gradient(135deg,#6d51f7,#4a3aad)',
  image:       'linear-gradient(135deg,#f04060,#a0206c)',
  video:       'linear-gradient(135deg,#e8a020,#c07010)',
  audio:       'linear-gradient(135deg,#0dcbcb,#0898b8)',
  writing:     'linear-gradient(135deg,#3a8ef5,#1a5aad)',
  seo:         'linear-gradient(135deg,#0ec98a,#0a9060)',
  marketing:   'linear-gradient(135deg,#f04060,#6d51f7)',
  automation:  'linear-gradient(135deg,#e8a020,#0dcbcb)',
  design:      'linear-gradient(135deg,#6d51f7,#f04060)',
  productivity:'linear-gradient(135deg,#3a8ef5,#0dcbcb)',
  research:    'linear-gradient(135deg,#8b6fff,#0dcbcb)',
  education:   'linear-gradient(135deg,#0ec98a,#3a8ef5)',
  business:    'linear-gradient(135deg,#6d51f7,#3a8ef5)',
  ecommerce:   'linear-gradient(135deg,#0ec98a,#e8a020)',
  hosting:     'linear-gradient(135deg,#3a8ef5,#6d51f7)',
  security:    'linear-gradient(135deg,#f04060,#e8a020)',
  default:     'linear-gradient(135deg,#6d51f7,#0dcbcb)',
}

export const TOOL_COLORS: Record<string, string> = {
  chatgpt:      'linear-gradient(135deg,#10a37f,#1a7f64)',
  claude:       'linear-gradient(135deg,#d4792a,#c96e1f)',
  gemini:       'linear-gradient(135deg,#4285f4,#34a853)',
  deepseek:     'linear-gradient(135deg,#4e6ef2,#1565c0)',
  grok:         'linear-gradient(135deg,#1a1a2e,#444)',
  midjourney:   'linear-gradient(135deg,#1a1a1a,#333)',
  cursor:       'linear-gradient(135deg,#1e1e2e,#6d51f7)',
  canva:        'linear-gradient(135deg,#7c4dff,#00b5a3)',
  notion:       'linear-gradient(135deg,#111,#333)',
  shopify:      'linear-gradient(135deg,#5c6ac4,#95bf47)',
  hostinger:    'linear-gradient(135deg,#673de6,#9333ea)',
  gohighlevel:  'linear-gradient(135deg,#00a3ff,#0062ff)',
}

export function getColor(tool: Tool): string {
  return TOOL_COLORS[tool.id] || CAT_COLORS[tool.category] || CAT_COLORS.default
}

export function initials(name: string): string {
  const words = name.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, '').split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export function pricingClass(type: string): string {
  return { free: 'free-price', freemium: 'free-price' }[type] || ''
}

export function pricingLabel(t: Tool, ar: boolean): string {
  if (t.price_starts === '$0' || t.price_starts === '0' || t.pricing_type === 'free')
    return ar ? 'مجاني' : 'Free'
  if (t.pricing_type === 'freemium') return ar ? 'مجاني+' : 'Free+'
  return t.price_starts || (ar ? 'مدفوع' : 'Paid')
}

export function getCoupons(): Tool[] {
  return tools.filter(t => t.affiliate_url?.length > 0)
}

export function getTrending(n = 20): Tool[] {
  return [...tools].sort((a, b) => b.trending_score - a.trending_score).slice(0, n)
}

export function getByCategory(cat: string): Tool[] {
  if (cat === 'all') return tools
  return tools.filter(t => t.category === cat)
}

export function getRelated(tool: Tool, n = 6): Tool[] {
  return tools
    .filter(t => t.id !== tool.id && (t.category === tool.category || tool.alternatives.includes(t.id)))
    .sort((a, b) => b.trending_score - a.trending_score)
    .slice(0, n)
}

export function genSEO(tool: Tool, ar: boolean) {
  const name = ar ? tool.name_ar : tool.name_en
  const desc = ar ? tool.desc_ar : tool.desc_en
  return {
    title: ar
      ? `${name} — مراجعة وبديل وكوبونات 2026 | MWL AI`
      : `${name} — Review, Alternatives & Coupons 2026 | MWL AI`,
    description: desc.slice(0, 155),
    keywords: [
      tool.name_en, tool.name_ar, tool.category,
      ...(tool.tags_en || []), ...(tool.tags_ar || []),
      'AI tools 2026', 'أدوات ذكاء اصطناعي', 'مراجعة',
    ].join(', ')
  }
}
