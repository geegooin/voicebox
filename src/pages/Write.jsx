import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PhotoUploadField from '../components/PhotoUploadField'
import { usePosts } from '../context/PostsContext'
import { CATEGORIES } from '../data/seedPosts'

export default function Write() {
  const navigate = useNavigate()
  const { addPost } = usePosts()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [saving, setSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const canSave = title.trim() && content.trim() && category && !saving

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSave) return
    setSaving(true)
    setErrorMessage('')
    try {
      await addPost({ title: title.trim(), content: content.trim(), category, photo })
      navigate('/')
    } catch (err) {
      console.error(err)
      setErrorMessage('저장에 실패했어요. 잠시 후 다시 시도해주세요.')
      setSaving(false)
    }
  }

  return (
    <>
      <Header />
      <main className="write-container">
        <h1 className="page-title">의견 남기기</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              className="text-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="어떤 불편이나 제안인지 짧게 적어주세요"
              maxLength={60}
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              className="textarea-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="언제, 어디서, 어떤 일이 있었는지 자세히 적어주시면 처리에 도움이 됩니다"
            />
          </div>

          <div className="field">
            <label className="field-label">분야</label>
            <div className="category-select">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={category === c ? 'active' : ''}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <PhotoUploadField value={photo} onChange={setPhoto} />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="form-actions">
            <Link to="/" className="btn-outline">
              취소
            </Link>
            <button type="submit" className="cta-btn" disabled={!canSave}>
              {saving ? '저장 중…' : '저장'}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}
