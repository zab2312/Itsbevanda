import { useEffect, useState } from 'react'
import { BlogList } from '../../components/blog/BlogList'
import { getPosts } from '../../services/blogService'

export function BlogListPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10">
      <div className="mb-10 space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">Znanja i priče</p>
        <h1 className="text-4xl font-geist text-white">Putem stvaranja</h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Zapisi o vođenju društvenih mreža, učenju kroz rad, stvaranju sadržaja i iskustvima iz prakse.
        </p>
      </div>
      {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
      <BlogList posts={posts} loading={loading} />
    </div>
  )
}

