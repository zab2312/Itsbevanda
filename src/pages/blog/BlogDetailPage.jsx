import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BlogPostPage } from '../../components/blog/BlogPostPage'
import { getPostBySlug } from '../../services/blogService'

export function BlogDetailPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostBySlug(slug)
        if (!data) {
          setError('Članak nije pronađen')
        } else {
          setPost(data)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-10">
      <div className="mb-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition">
          ← Natrag na sve članke
        </Link>
      </div>
      {loading ? <p className="text-white/70">Učitavanje članka...</p> : null}
      {error && !loading ? <p className="text-red-400">{error}</p> : null}
      {post && !loading ? <BlogPostPage post={post} /> : null}
    </div>
  )
}

