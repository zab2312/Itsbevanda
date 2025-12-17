import { Link } from 'react-router-dom'

const formatDate = (input) =>
  new Intl.DateTimeFormat('hr-HR', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(input))

export function BlogList({ posts = [], loading = false, showDraftStatus = false }) {
  if (loading) {
    return <div className="text-white/70 text-center py-12">Učitavanje članaka...</div>
  }

  if (!posts.length) {
    return <div className="text-white/70 text-center py-12">Još nema objava.</div>
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {posts.map((post) => (
        <article
          key={post.id}
          className="group rounded-3xl border border-white/5 bg-gradient-to-br from-[#1B1B24] via-[#1A1724] to-[#121216] shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden"
        >
          <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
            <div className="relative h-56 w-full overflow-hidden bg-[#2A2435]">
              {post.cover_image ? (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-white/40 text-sm">
                  Bez naslovne fotografije
                </div>
              )}
              {showDraftStatus && !post.published ? (
                <div className="absolute top-4 left-4 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-black/90">
                  Nacrt
                </div>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col gap-3 px-6 py-6">
              <div className="text-xs uppercase tracking-[0.3em] text-white/40">{formatDate(post.created_at)}</div>
              <h3 className="text-2xl font-geist text-white transition-colors group-hover:text-[#A78BFA]">
                {post.title}
              </h3>
              <p className="text-sm text-white/70 line-clamp-3">{post.excerpt}</p>
              <div className="mt-auto pt-4 text-sm font-medium text-[#C4B5FD] group-hover:text-white flex items-center gap-2">
                Pročitaj članak
                <span aria-hidden="true">↗</span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}

