import { supabase } from '../lib/supabaseClient'

const BUCKET = 'blog-images'
const DEFAULT_SELECT =
  'id,title,slug,cover_image,content,excerpt,images,created_at,updated_at,author_id,published'

const randomKey = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

const getPublicUrl = (path) => {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data?.publicUrl ?? null
}

const uploadImage = async (file, folder) => {
  const extension = file.name?.split('.').pop() || 'png'
  const filePath = `${folder}/${randomKey()}.${extension}`

  const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false
  })

  if (error) {
    throw error
  }

  return {
    path: filePath,
    url: getPublicUrl(filePath)
  }
}

export async function uploadCoverImage(file) {
  return uploadImage(file, 'covers')
}

export async function uploadInlineImage(file) {
  return uploadImage(file, 'inline')
}

export async function savePost(payload) {
  const { data, error } = await supabase.from('blog_posts').insert([payload]).select().single()

  if (error) {
    throw error
  }

  return data
}

export async function updatePost(id, payload) {
  const { data, error } = await supabase.from('blog_posts').update(payload).eq('id', id).select().single()

  if (error) {
    throw error
  }

  return data
}

export async function deletePost(id) {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) {
    throw error
  }
  return true
}

export async function getPosts({ includeDrafts = false } = {}) {
  let query = supabase.from('blog_posts').select(DEFAULT_SELECT).order('created_at', { ascending: false })

  if (!includeDrafts) {
    query = query.eq('published', true)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data
}

export async function getPostBySlug(slug) {
  const { data, error } = await supabase.from('blog_posts').select(DEFAULT_SELECT).eq('slug', slug).maybeSingle()

  if (error) {
    throw error
  }

  return data
}

export async function getPostById(id) {
  const { data, error } = await supabase.from('blog_posts').select(DEFAULT_SELECT).eq('id', id).maybeSingle()

  if (error) {
    throw error
  }

  return data
}

