import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'تصنيفات أدوات الذكاء الاصطناعي 2026',
  description: 'استعرض 800+ أداة AI مصنّفة في 17 تصنيف — محادثة، برمجة، صور، فيديو، تسويق، وأكثر. دليلك لإيجاد الأداة المناسبة بسرعة.',
  keywords: 'تصنيفات أدوات AI, اقسام الذكاء الاصطناعي, ادوات AI حسب النوع',
  alternates: { canonical: 'https://mwlai.com/categories' },
}

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return children
}
