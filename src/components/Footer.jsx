import { ORG_NAME, ORG_TAGLINE } from '../config/org'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="org-name">{ORG_NAME}</div>
        <div>{ORG_TAGLINE}</div>
        <div className="links">
          <a href="#">이용안내</a>
          <a href="#">개인정보처리방침</a>
        </div>
        <div style={{ marginTop: '8px' }}>© 2026 {ORG_NAME}</div>
      </div>
    </footer>
  )
}
