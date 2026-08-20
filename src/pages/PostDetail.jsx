import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import StatusBadge from '../components/StatusBadge'
import CategoryChip from '../components/CategoryChip'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import { usePosts } from '../context/PostsContext'

export default function PostDetail() {
  const { id } = useParams()
  const { posts } = usePosts()
  const post = posts.find((p) => String(p.id) === id)

  if (!post) {
    return (
      <>
        <Header />
        <main className="detail-container">
          <p className="empty-state">글을 찾을 수 없습니다.</p>
          <Link to="/" className="back-link">
            ← 목록으로
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="detail-container">
        <Link to="/" className="back-link">
          ← 목록으로
        </Link>

        <div className="detail-photo">
          {post.photo ? (
            <img src={post.photo} alt="" />
          ) : (
            <PhotoPlaceholder size={48} />
          )}
        </div>

        <div className="pill-row detail-pill-row">
          <StatusBadge status={post.status} />
          <CategoryChip category={post.category} />
        </div>

        <h1 className="detail-title">{post.title}</h1>
        <div className="detail-meta">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>

        <p className="detail-body">{post.content}</p>
      </main>
      <Footer />
    </>
  )
}
