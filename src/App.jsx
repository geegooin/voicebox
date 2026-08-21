import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Write from './pages/Write'
import PostDetail from './pages/PostDetail'
import AuthGate from './pages/AuthGate'
import Mypage from './pages/Mypage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/write" element={<Write />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/login" element={<AuthGate />} />
      <Route path="/signup" element={<AuthGate />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
