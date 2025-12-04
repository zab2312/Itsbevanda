import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { SECRET_ADMIN_BASE } from '../../constants/routes'

const formatDate = (value) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(value))

export function AdminBlogTable({ posts = [], onDelete }) {
  if (!posts.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-[#1A1A22] p-10 text-center text-white/70">
        No blog posts yet. Start by creating one.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#1B1B24] shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
      <div className="grid grid-cols-5 gap-4 border-b border-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
        <span>Title</span>
        <span>Status</span>
        <span>Created</span>
        <span>Updated</span>
        <span className="text-right">Actions</span>
      </div>
      <div className="divide-y divide-white/5">
        {posts.map((post) => (
          <div key={post.id} className="grid grid-cols-5 gap-4 px-6 py-4 text-sm text-white/80 items-center">
            <div>
              <p className="font-medium text-white">{post.title}</p>
              <p className="text-xs text-white/40">/{post.slug}</p>
            </div>
            <div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  post.published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/10 text-amber-200'
                }`}
              >
                {post.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <div className="text-white/60">{formatDate(post.created_at)}</div>
            <div className="text-white/60">{formatDate(post.updated_at)}</div>
            <div className="flex items-center justify-end gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to={`${SECRET_ADMIN_BASE}/edit/${post.id}`}>Edit</Link>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  if (window.confirm('Delete this post?')) {
                    onDelete?.(post.id)
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

