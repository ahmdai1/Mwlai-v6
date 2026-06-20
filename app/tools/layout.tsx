import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'جميع أدوات الذكاء الاصطناعي — 800+ أداة',
  description: 'تصفح أكبر دليل عربي يضم 800+ أداة ذكاء اصطناعي مع بحث وفلترة متقدمة — محادثة، برمجة، صور، فيديو، وأكثر.',
  keywords: 'قائمة أدوات AI, دليل أدوات ذكاء اصطناعي, افضل ادوات AI 2026',
  alternates: { canonical: 'https://mwlai.com/tools' },
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}
