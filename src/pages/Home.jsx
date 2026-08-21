import { useMemo, useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import StatusFilter from '../components/StatusFilter'
import CategoryFilter from '../components/CategoryFilter'
import PostCard from '../components/PostCard'
import { usePosts } from '../context/PostsContext'

export default function Home() {
  const { posts, loading } = usePosts()
  const [status, setStatus] = useState('전체')
  const [category, setCategory] = useState('전체')

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const statusOk = status === '전체' || p.status === status
      const categoryOk = category === '전체' || p.category === category
      return statusOk && categoryOk
    })
  }, [posts, status, category])

  return (
    <>
      <Header />
      <Hero />
      <div className="filters">
        <StatusFilter value={status} onChange={setStatus} />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>
      <div className="grid">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {loading && <p className="empty-state">불러오는 중…</p>}
      {!loading && filtered.length === 0 && (
        <p className="empty-state">해당하는 의견이 아직 없어요.</p>
      )}
      <Footer />
    </>
  )
}
