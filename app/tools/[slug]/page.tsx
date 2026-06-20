import type { Metadata } from 'next'
import { tools } from '../../../lib/data'
import ToolClient from './ToolClient'

export async function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = tools.find(t => t.slug === slug || t.id === slug)
  if (!tool) return { title: 'الأداة غير موجودة' }

  const title = `${tool.name_ar} — مراجعة وبدائل وكوبونات 2026`
  const description = tool.desc_ar.slice(0, 155)
  const keywords = [tool.name_en, tool.name_ar, tool.category, ...(tool.tags_en || []), 'AI tools 2026', 'أدوات AI'].join(', ')

  return {
    title,
    description,
    keywords,
    openGraph: {
      title, description, type: 'article',
      url: `https://mwlai.com/tools/${tool.slug}`,
    },
    alternates: { canonical: `https://mwlai.com/tools/${tool.slug}` },
  }
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ToolClient slug={slug} />
}
