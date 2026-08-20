import { ORG_NAME, ICON_PATH } from '../config/org'

export default function Header() {
  return (
    <header className="site-header">
      <img src={ICON_PATH} alt={`${ORG_NAME} 아이콘`} />
      <span className="org-name">{ORG_NAME}</span>
      <span className="org-tag">운영</span>
    </header>
  )
}
