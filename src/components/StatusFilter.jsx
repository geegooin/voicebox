import { STATUSES } from '../data/seedPosts'

const OPTIONS = ['전체', ...STATUSES]

export default function StatusFilter({ value, onChange }) {
  return (
    <div className="filter-row">
      <span className="filter-title">상태</span>
      <div className="status-seg">
        {OPTIONS.map((status) => (
          <button
            key={status}
            type="button"
            className={value === status ? 'active' : ''}
            onClick={() => onChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  )
}
