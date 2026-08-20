export default function StatusBadge({ status }) {
  return <span className={`status-pill st-${status}`}>{status}</span>
}
