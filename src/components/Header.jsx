import { Link } from 'react-router-dom'
import { ORG_NAME, ICON_PATH } from '../config/org'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, profile } = useAuth()

  return (
    <header className="site-header">
      <img src={ICON_PATH} alt={`${ORG_NAME} 아이콘`} />
      <span className="org-name">{ORG_NAME}</span>
      <span className="org-tag">운영</span>

      <div className="header-auth">
        {user ? (
          <Link to="/mypage" aria-label="마이페이지">
            <img
              className="header-avatar"
              src={profile?.avatar_url}
              alt={profile?.display_name ? `${profile.display_name} 프로필 사진` : '프로필 사진'}
            />
          </Link>
        ) : (
          <>
            <Link to="/login" className="header-auth-link">
              로그인
            </Link>
            <Link to="/signup" className="header-auth-link header-auth-link-primary">
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
