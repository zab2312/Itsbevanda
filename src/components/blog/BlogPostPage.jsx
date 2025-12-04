import { generateHTML } from '@tiptap/html'
import { getRendererExtensions } from './extensions'

const formatDate = (input) =>
  new Intl.DateTimeFormat('hr-HR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(input))

const parseContent = (content) => {
  if (!content) return null
  if (typeof content === 'string') {
    try {
      return JSON.parse(content)
    } catch (error) {
      return null
    }
  }
  return content
}

export function BlogPostPage({ post }) {
  const json = parseContent(post.content)
  const html = json ? generateHTML(json, getRendererExtensions()) : '<p></p>'

  return (
    <article className="mx-auto max-w-4xl space-y-10 text-white">
      {post.cover_image ? (
        <div className="overflow-hidden rounded-[32px] border border-white/5 bg-[#0F0F16] shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
          <img src={post.cover_image} alt={post.title} className="h-[420px] w-full object-cover" />
        </div>
      ) : null}

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">{formatDate(post.created_at)}</p>
        <h1 className="text-4xl md:text-5xl font-geist text-white">{post.title}</h1>
        {post.excerpt ? <p className="text-lg text-white/70">{post.excerpt}</p> : null}
      </div>

      <div className="blog-content max-w-none text-white" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}

