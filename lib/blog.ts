// ============================================================
// 📝 lib/blog.ts — يحمّل مقالات البلوج من content/blog/
// ============================================================
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  title_en: string
  description: string
  keywords: string
  category: string
  date: string
  author: string
  readTime: number
  featured: boolean
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(file => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug: data.slug || file.replace('.mdx', ''),
        title: data.title || '',
        title_en: data.title_en || '',
        description: data.description || '',
        keywords: data.keywords || '',
        category: data.category || 'عام',
        date: data.date || '2026-06-09',
        author: data.author || 'فريق MWL AI',
        readTime: data.readTime || 5,
        featured: data.featured || false,
        content,
      } as BlogPost
    })
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const file = path.join(BLOG_DIR, `${slug}.mdx`)
    if (!fs.existsSync(file)) return null
    const { data, content } = matter(fs.readFileSync(file, 'utf-8'))
    return {
      slug: data.slug || slug,
      title: data.title || '',
      title_en: data.title_en || '',
      description: data.description || '',
      keywords: data.keywords || '',
      category: data.category || 'عام',
      date: data.date || '2026-06-09',
      author: data.author || 'فريق MWL AI',
      readTime: data.readTime || 5,
      featured: data.featured || false,
      content,
    }
  } catch { return null }
}

export function getFeaturedPosts(n = 3): BlogPost[] {
  return getAllPosts().filter(p => p.featured).slice(0, n)
}

export function getCatIcon(cat: string): string {
  const icons: Record<string, string> = {
    'مقارنات': '⚡', 'قوائم': '📋', 'برمجة': '💻', 'فيديو': '🎬',
    'استضافة': '🖥️', 'صور': '🎨', 'تسويق': '📢', 'SEO': '📈',
    'تقنية': '🔧', 'ربح': '💰', 'أتمتة': '🤖', 'صوت': '🎵',
    'إنتاجية': '🚀', 'تصميم': '🖌️', 'تعليم': '📚', 'محتوى': '✍️',
  }
  return icons[cat] || '📝'
}

export function mdToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^\|(.+)\|$/gm, match => {
      if (match.includes('---')) return ''
      const cells = match.split('|').filter(c => c.trim())
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>'
    })
    .replace(/^---+$/gm, '<hr/>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .split('\n').map(line => {
      if (line.startsWith('<h') || line.startsWith('<pre') || line.startsWith('<li') ||
          line.startsWith('<tr') || line.startsWith('<hr') || line.startsWith('<blockquote') ||
          line.trim() === '') return line
      if (line.trim() && !line.startsWith('<')) return `<p>${line}</p>`
      return line
    }).join('\n')
}
