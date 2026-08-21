import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from './AuthContext'

const PostsContext = createContext(null)

function formatDate(isoString) {
  const d = new Date(isoString)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}

function mapRowToPost(row) {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.content.length > 60 ? `${row.content.slice(0, 60)}…` : row.content,
    content: row.content,
    category: row.category,
    status: row.status,
    author: row.author,
    date: formatDate(row.created_at),
    photo: row.photo_url,
    userId: row.user_id,
  }
}

export function PostsProvider({ children }) {
  const { user, profile } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    supabase
      .from('voices')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          console.error(error)
        } else {
          setPosts(data.map(mapRowToPost))
        }
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const addPost = async ({ title, content, category, photo }) => {
    if (!user) throw new Error('로그인이 필요합니다.')

    let photoUrl = null

    if (photo) {
      const ext = photo.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('voice-photos')
        .upload(fileName, photo)
      if (uploadError) throw uploadError
      const { data: publicUrlData } = supabase.storage
        .from('voice-photos')
        .getPublicUrl(fileName)
      photoUrl = publicUrlData.publicUrl
    }

    const author = profile?.display_name || user.email || '익명'

    const { data, error } = await supabase
      .from('voices')
      .insert({ title, content, category, author, photo_url: photoUrl, user_id: user.id })
      .select()
      .single()

    if (error) throw error

    const newPost = mapRowToPost(data)
    setPosts((prev) => [newPost, ...prev])
    return newPost
  }

  const value = useMemo(() => ({ posts, loading, addPost }), [posts, loading, user, profile])

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}

export function usePosts() {
  const ctx = useContext(PostsContext)
  if (!ctx) throw new Error('usePosts must be used within PostsProvider')
  return ctx
}
