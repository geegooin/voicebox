import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PhotoUploadField from '../components/PhotoUploadField'
import { usePosts } from '../context/PostsContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { CATEGORIES } from '../data/seedPosts'

export default function Write() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addPost } = usePosts()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [saving, setSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const canSave = title.trim() && content.trim() && category && !saving

  const handleAiAssist = async () => {
    if (!content.trim()) {
      setAiError('먼저 짧게라도 내용을 적어주세요.')
      return
    }
    setAiLoading(true)
    setAiError('')
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const response = await fetch('/api/ai-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ draft: content }),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'AI 작성에 실패했어요.')
      }
      setTitle(result.title)
      setContent(result.content)
      if (CATEGORIES.includes(result.category)) {
        setCategory(result.category)
      }
    } catch (err) {
      console.error(err)
      setAiError(err.message || 'AI 작성에 실패했어요. 잠시 후 다시 시도해주세요.')
    } finally {
      setAiLoading(false)
    }
  }

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
            <div className="field-label-row">
              <label className="field-label" htmlFor="content">
                내용
              </label>
              <button
                type="button"
                className="ai-assist-btn"
                onClick={handleAiAssist}
                disabled={aiLoading}
              >
                {aiLoading ? 'AI 작성 중…' : 'AI 작성도우미'}
              </button>
            </div>
            <textarea
              id="content"
              className="textarea-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="언제, 어디서, 어떤 일이 있었는지 짧게라도 적으면 AI 작성도우미가 민원글로 다듬어드려요"
            />
            {aiError && <p className="error-message">{aiError}</p>}
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
