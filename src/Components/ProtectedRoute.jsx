import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) {
    return (
      <Navigate to="/login" replace state={{ notice: 'Faça login para acessar a área restrita.' }} />
    )
  }
  return children
}