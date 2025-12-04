import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminBlogTable } from '../../components/blog/AdminBlogTable'
import { deletePost, getPosts } from '../../services/blogService'
import { Button } from '../../components/ui/button'
import { SECRET_ADMIN_BASE } from '../../constants/routes'

export function AdminBlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPosts = async () => {
    try {
      setLoading(true)
      const data = await getPosts({ includeDrafts: true })
      setPosts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deletePost(id)
      await loadPosts()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Content</p>
          <h1 className="text-3xl font-geist text-white">Blog Posts</h1>
        </div>
        <Button asChild>
          <Link to={`${SECRET_ADMIN_BASE}/new`}>Create new post</Link>
        </Button>
      </div>
      {error ? <p className="text-red-400 text-sm">{error}</p> : null}
      {loading ? <div className="text-white/70">Loading...</div> : <AdminBlogTable posts={posts} onDelete={handleDelete} />}
    </div>
  )
}

