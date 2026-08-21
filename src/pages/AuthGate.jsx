import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoogleButton from '../components/GoogleButton'
import ConfirmModal from '../components/ConfirmModal'
import { useAuth } from '../context/AuthContext'
import { ICON_PATH, SERVICE_NAME } from '../config/org'

export default function AuthGate() {
  const location = useLocation()
  const { user, signInWithGoogle } = useAuth()
  const [showConfirm, setShowConfirm] = useState(false)

  const isSignup = location.pathname === '/signup'

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleConfirm = async () => {
    setShowConfirm(false)
    await signInWithGoogle()
  }

  return (
    <>
      <Header />
      <main className="gate-screen">
        <div className="gate-card">
          <img src={ICON_PATH} alt={`${SERVICE_NAME} 아이콘`} className="gate-icon" />
          <h1 className="gate-title">{isSignup ? '회원가입' : '로그인'}</h1>
          <p className="gate-desc">
            {isSignup
              ? '구글 계정으로 간편하게 가입하고 우리 동네에 목소리를 남겨보세요.'
              : '구글 계정으로 로그인하고 우리 동네에 목소리를 남겨보세요.'}
          </p>
          <GoogleButton onClick={() => setShowConfirm(true)} />
          {isSignup ? (
            <Link to="/login" className="gate-switch-link">
              이미 계정이 있으신가요? 로그인
            </Link>
          ) : (
            <Link to="/signup" className="gate-switch-link">
              아직 계정이 없으신가요? 회원가입
            </Link>
          )}
        </div>
      </main>
      <Footer />

      {showConfirm && (
        <ConfirmModal
          message="구글 계정으로 계속합니다. 처음이면 회원가입이, 이미 회원이면 로그인이 진행됩니다. 계속할까요?"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  )
}
