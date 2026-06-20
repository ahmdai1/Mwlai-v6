import type { Metadata } from 'next'
import { tools } from '../../../lib/data'
import CompareClient from './CompareClient'

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
  return Array.from(pairs.keys())
}

export async function generateStaticParams() {
  return getCompareSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const parts = slug.split('-vs-')
  const slug1 = parts[0]
  const slug2 = parts.slice(1).join('-vs-')
  const tool1 = tools.find(t => t.slug === slug1 || t.id === slug1)
  const tool2 = tools.find(t => t.slug === slug2 || t.id === slug2)

  if (!tool1 || !tool2) return { title: 'مقارنة غير موجودة' }

  const title = `${tool1.name_ar} vs ${tool2.name_ar} — أيهما أفضل في 2026؟`
  const description = `مقارنة شاملة بين ${tool1.name_ar} و${tool2.name_ar}. الأسعار والمميزات وأيهما يناسبك في 2026.`

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', url: `https://mwlai.com/compare/${slug}` },
    alternates: { canonical: `https://mwlai.com/compare/${slug}` },
  }
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <CompareClient slug={slug} />
}
