import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import CategoryChip from './CategoryChip'
import PhotoPlaceholder from './PhotoPlaceholder'

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="card">
      <div className="photo-ph card-photo">
        {post.photo ? (
          <img src={post.photo} alt="" className="card-photo-img" />
        ) : (
          <PhotoPlaceholder size={30} />
        )}
      </div>
      <div className="card-body">
        <div className="pill-row">
          <StatusBadge status={post.status} />
          <CategoryChip category={post.category} />
        </div>
        <p className="card-title">{post.title}</p>
        <p className="card-excerpt">{post.excerpt}</p>
        <div className="card-meta">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  )
}
