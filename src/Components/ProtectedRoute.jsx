import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) {
    return (
      <Navigate to="/login" replace state={{ notice: 'login.needLogin' }} />
    )
  }
  return children
}