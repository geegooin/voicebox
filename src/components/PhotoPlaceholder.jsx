export default function PhotoPlaceholder({ size = 24, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
      <circle cx="8.5" cy="10" r="1.6"></circle>
      <path d="M21 16l-5.5-5.5L9 17"></path>
    </svg>
  )
}
