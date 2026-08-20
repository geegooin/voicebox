import { createContext, useContext, useMemo, useState } from 'react'
import { seedPosts } from '../data/seedPosts'

const PostsContext = createContext(null)

function formatToday() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(seedPosts)

  const addPost = ({ title, content, category, photo }) => {
    const nextId = posts.reduce((max, p) => Math.max(max, p.id), 0) + 1
    const excerpt = content.length > 60 ? `${content.slice(0, 60)}…` : content
    const newPost = {
      id: nextId,
      title,
      excerpt,
      content,
      category,
      status: '접수',
      author: '익명',
      date: formatToday(),
      photo: photo || null,
    }
    setPosts((prev) => [newPost, ...prev])
    return newPost
  }

  const value = useMemo(() => ({ posts, addPost }), [posts])

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}

export function usePosts() {
  const ctx = useContext(PostsContext)
  if (!ctx) throw new Error('usePosts must be used within PostsProvider')
  return ctx
}
