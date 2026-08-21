import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../context/PostsContext'

function formatDate(isoString) {
  const d = new Date(isoString)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}

export default function Mypage() {
  const { user, profile, signOut } = useAuth()
  const { posts } = usePosts()
  const [tab, setTab] = useState('posts')

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const myPosts = posts.filter((p) => p.userId === user.id)

  return (
    <>
      <Header />
      <main className="mypage-container">
        <h1 className="page-title">마이페이지</h1>

        <div className="tabs">
          <button
            type="button"
            className={tab === 'posts' ? 'active' : ''}
            onClick={() => setTab('posts')}
          >
            내가 쓴 글
          </button>
          <button
            type="button"
            className={tab === 'info' ? 'active' : ''}
            onClick={() => setTab('info')}
          >
            내 정보
          </button>
        </div>

        <div className="tab-content">
          {tab === 'posts' ? (
            myPosts.length > 0 ? (
              <div className="grid mypage-grid">
                {myPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="empty-state">아직 쓴 글이 없어요.</p>
            )
          ) : (
            <div className="info-list">
              <div className="info-row">
                <span className="info-label">이름</span>
                <span className="info-value">{profile?.display_name || '-'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">이메일</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">가입일</span>
                <span className="info-value">
                  {profile?.created_at ? formatDate(profile.created_at) : '-'}
                </span>
              </div>
              <button type="button" className="btn-outline signout-btn" onClick={signOut}>
                로그아웃
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
