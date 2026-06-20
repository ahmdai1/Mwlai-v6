# 🧠 MWL AI — دليل المطور (Dashboard Guide)

> **القاعدة الذهبية:** كل حاجة ليها مكان واحد — مش هتحتاج تدور.

---

## 📁 هيكل المشروع — كل مجلد بيعمل إيه

```
mwlai/
│
├── 📋 config/
│   └── site.ts              ← ⭐ إعدادات الموقع كلها هنا (Analytics, SEO, Colors)
│
├── 📦 content/              ← ⭐ كل المحتوى هنا — مش في app/
│   ├── tools-data/          ← 800 أداة AI مقسّمة بالكاتيجوري
│   │   ├── chatbots.json    ← 80 أداة محادثة
│   │   ├── coding.json      ← 70 أداة برمجة
│   │   ├── image.json       ← 88 أداة صور
│   │   ├── video.json       ← 76 أداة فيديو
│   │   ├── audio.json       ← 51 أداة صوت
│   │   ├── productivity.json← 100 أداة إنتاجية
│   │   ├── writing.json     ← 28 أداة كتابة
│   │   ├── seo.json         ← 23 أداة SEO
│   │   ├── marketing.json   ← 36 أداة تسويق
│   │   ├── automation.json  ← 35 أداة أتمتة
│   │   ├── design.json      ← 36 أداة تصميم
│   │   ├── research.json    ← 38 أداة بحث
│   │   ├── education.json   ← 36 أداة تعليم
│   │   ├── business.json    ← 38 أداة أعمال
│   │   ├── ecommerce.json   ← 18 أداة تجارة
│   │   ├── hosting.json     ← 27 أداة استضافة
│   │   └── security.json    ← 20 أداة أمان
│   │
│   ├── blog/                ← ⭐ 23 مقالة SEO احترافية (MDX)
│   │   └── *.mdx            ← مراجعات، مقارنات، أدلة شاملة
│   │
│   ├── coupons/
│   │   └── active-coupons.json  ← الكوبونات النشطة
│   │
│   ├── affiliates/
│   │   └── affiliate-tools.json ← الأدوات اللي عندها affiliate links
│   │
│   └── blog/                ← مقالات البلوج (كل مقالة ملف JSON)
│       └── [مقالة].json
│
├── 🎨 app/                  ← صفحات الموقع (Next.js)
│   ├── page.tsx             ← الصفحة الرئيسية
│   ├── layout.tsx           ← Layout + SEO عام
│   ├── globals.css          ← التصميم الكامل
│   ├── sitemap.ts           ← Sitemap تلقائي
│   ├── robots.ts            ← Robots.txt
│   ├── tools/
│   │   ├── page.tsx         ← قائمة الأدوات
│   │   └── [slug]/page.tsx  ← صفحة أداة فردية
│   ├── coupons/page.tsx     ← صفحة الكوبونات
│   ├── categories/page.tsx  ← صفحة التصنيفات
│   └── blog/
│       ├── page.tsx         ← قائمة المقالات
│       └── [slug]/page.tsx  ← صفحة مقالة فردية
│
├── 🔧 components/           ← مكونات مشتركة
│   ├── Nav.tsx              ← شريط التنقل
│   ├── Footer.tsx           ← الفوتر
│   └── ToolLogo.tsx         ← لوجو الأداة
│
├── 📚 lib/                  ← utilities
│   ├── data.ts              ← يجمع كل الأدوات + helper functions
│   └── blog.ts              ← يحمّل مقالات البلوج + helper functions
│
└── ⚙️  config/
    └── site.ts              ← إعدادات الموقع المركزية
```

---

## 🎯 المهام الشائعة — كيف تعمل كل حاجة

### ➕ إضافة أداة جديدة
1. افتح الملف المناسب في `content/tools-data/`
   - مثلاً: أداة برمجة → `content/tools-data/coding.json`
2. أضف كائن JSON بنفس الـ schema:

```json
{
  "id": "tool-id",
  "name_ar": "اسم الأداة",
  "name_en": "Tool Name",
  "slug": "tool-id",
  "tagline_ar": "وصف قصير بالعربي",
  "tagline_en": "Short description in English",
  "desc_ar": "وصف متوسط بالعربي",
  "desc_en": "Medium description in English",
  "long_desc_ar": "وصف طويل بالعربي للـ SEO",
  "long_desc_en": "Long description in English for SEO",
  "category": "coding",
  "tags_ar": ["برمجة", "AI"],
  "tags_en": ["coding", "AI"],
  "pricing_type": "freemium",
  "price_starts": "$0",
  "price_pro": "$20/mo",
  "has_free_trial": true,
  "platforms": ["web", "desktop"],
  "website": "https://example.com",
  "monthly_visits": "1M+",
  "trending_score": 80,
  "rating": 4.5,
  "featured": false,
  "is_new": true,
  "launch_year": 2024,
  "alternatives": [],
  "integrations": [],
  "use_cases_ar": ["الاستخدام الأول", "الاستخدام التاني"],
  "use_cases_en": ["Use case 1", "Use case 2"],
  "affiliate_url": "",
  "coupon_code": "",
  "coupon_discount": "",
  "logo_url": ""
}
```

---

### 🎁 تعديل كوبون أو إضافة affiliate link
1. افتح `content/tools-data/[category].json`
2. دور على الأداة وعدّل الحقول:
   - `affiliate_url` — رابط الافلييت
   - `coupon_code` — كود الخصم (أو `"NO_CODE"` لو الخصم تلقائي)
   - `coupon_discount` — نص الخصم مثلاً `"خصم 20%"`

**أو** افتح `content/affiliates/affiliate-tools.json` للأدوات اللي عندها affiliate فقط.

---

### 📝 إضافة مقالة للبلوج
1. أنشئ ملف JSON جديد في `content/blog/` مثلاً: `افضل-ادوات-ai-للكتابة.json`
2. استخدم template موجود في `lib/blog.ts` → `BLOG_POST_TEMPLATE`
3. افتح `lib/blog.ts` وأضف السطرين دول:

```typescript
import post1 from '../content/blog/افضل-ادوات-ai-للكتابة.json'
// في allPostsRaw:
const allPostsRaw: BlogPost[] = [post1]
```

---

### ⚙️ تعديل إعدادات الموقع (Analytics, SEO)
افتح `config/site.ts` وعدّل:
- `googleAnalyticsId` — Google Analytics ID
- `googleVerification` — Search Console verification
- `toolsCount` — عدد الأدوات في الـ Hero

---

### 🎨 تغيير الألوان
في `config/site.ts` → قسم `COLORS`
أو في `app/globals.css` → المتغيرات في `:root`

---

## 🚀 النشر على Vercel

```bash
# تثبيت
npm install

# تجربة محلياً
npm run dev

# Build
npm run build
```

**GitHub → Vercel:**
```bash
git add .
git commit -m "feat: [وصف التغيير]"
git push
```
Vercel يعمل deploy تلقائي بعد كل push.

---

## 📊 Checklist ما قبل الإطلاق

- [ ] استبدل `GA_MEASUREMENT_ID` في `config/site.ts`
- [ ] استبدل `YOUR_GOOGLE_VERIFICATION_CODE` في `config/site.ts`
- [ ] أضف `og-image.png` (1200×630) في `public/`
- [ ] أضف `favicon.ico` في `public/`
- [ ] ربط الدومين mwlai.com في Vercel
- [ ] Submit Sitemap في Google Search Console
- [ ] اختبر كل الـ affiliate links

---

*آخر تحديث: يونيو 2026*
