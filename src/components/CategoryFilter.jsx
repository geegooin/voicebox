import { CATEGORIES } from '../data/seedPosts'

const OPTIONS = ['전체', ...CATEGORIES]

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="filter-row">
      <span className="filter-title">분야</span>
      <div className="category-scroll">
        {OPTIONS.map((category) => (
          <button
            key={category}
            type="button"
            className={value === category ? 'active' : ''}
            onClick={() => onChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
