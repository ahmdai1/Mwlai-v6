import { tools, categories } from '../lib/data'
import { getAllPosts } from '../lib/blog'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

function getCompareSlugs(): string[] {
  const pairs = new Map<string, boolean>()
  for (const t of tools) {
    for (const altId of t.alternatives || []) {
      const alt = tools.find(x => x.id === altId)
      if (!alt) continue
      const key = [t.slug, alt.slug].sort().join('-vs-')
      pairs.set(key, true)
    }
  }
  return Array.from(pairs.keys()).slice(0, 200) // top 200 compare pages
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mwlai.com'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                 lastModified: now, changeFrequency: 'daily',  priority: 1.0 },
    { url: `${base}/tools`,      lastModified: now, changeFrequency: 'daily',  priority: 0.9 },
    { url: `${base}/coupons`,    lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/blog`,       lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ]

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: p.featured ? 0.85 : 0.75,
  }))

  const toolPages: MetadataRoute.Sitemap = tools.map(t => ({
    url: `${base}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: t.featured ? 0.85 : t.trending_score > 85 ? 0.75 : 0.6,
  }))

  const comparePages: MetadataRoute.Sitemap = getCompareSlugs().map(slug => ({
    url: `${base}/compare/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const catPages: MetadataRoute.Sitemap = categories
    .filter(c => c.id !== 'all')
    .map(c => ({
      url: `${base}/tools?cat=${c.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))

  return [...staticPages, ...catPages, ...toolPages, ...comparePages, ...blogPages]
}
