import { Link } from 'react-router-dom'
import { SERVICE_TAGLINE } from '../config/org'
import { useAuth } from '../context/AuthContext'

export default function Hero() {
  const { user } = useAuth()

  return (
    <div className="hero">
      <div className="hero-inner">
        <h1>{SERVICE_TAGLINE}</h1>
        <p>가로등부터 놀이터까지 — 남긴 의견은 지구인상점이 접수하고 처리 결과까지 알려드려요.</p>
        <Link to={user ? '/write' : '/login'} className="cta-btn">
          의견 남기기
        </Link>
      </div>
    </div>
  )
}
