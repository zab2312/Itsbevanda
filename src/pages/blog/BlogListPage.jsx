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
        // Provide more helpful error messages
        if (err.message?.includes('Failed to fetch') || err.message?.includes('ERR_NAME_NOT_RESOLVED')) {
          setError('Greška pri povezivanju s bazom podataka. Provjerite je li Supabase konfiguriran u .env datoteci.')
        } else {
          setError(err.message || 'Došlo je do greške pri učitavanju članaka.')
        }
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
      {error ? (
        <div className="text-center space-y-2 py-8">
          <p className="text-sm text-red-400">{error}</p>
          <p className="text-xs text-white/50">
            Provjerite je li .env datoteka postavljena s VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY
          </p>
        </div>
      ) : null}
      <BlogList posts={posts} loading={loading} />
    </div>
  )
}

