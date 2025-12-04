import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BlogEditor } from '../../components/blog/BlogEditor'
import { getPostById, savePost, updatePost } from '../../services/blogService'
import { useAuth } from '../../context/AuthContext'
import { SECRET_ADMIN_BASE } from '../../constants/routes'

export function AdminBlogEditorPage({ mode = 'create' }) {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [initialData, setInitialData] = useState({})
  const [loading, setLoading] = useState(mode === 'edit')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadPost = async () => {
      if (mode !== 'edit' || !id) {
        setInitialData({})
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const post = await getPostById(id)
        if (!post) {
          setError('Unable to find that post')
        } else {
          setInitialData(post)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [mode, id])

  const handleSubmit = async (payload) => {
    if (!user) return
    setSubmitting(true)
    setError('')
    try {
      if (mode === 'create') {
        await savePost({
          ...payload,
          author_id: user.id
        })
      } else if (id) {
        await updatePost(id, payload)
      }
      navigate(SECRET_ADMIN_BASE)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-4xl px-4 py-20 text-white/70">Loading editor...</div>
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-10 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">{mode === 'create' ? 'New post' : 'Edit post'}</p>
        <h1 className="text-3xl font-geist text-white">{mode === 'create' ? 'Compose a new story' : 'Update your story'}</h1>
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <BlogEditor initialData={initialData} onSubmit={handleSubmit} submitting={submitting} mode={mode} />
    </div>
  )
}

