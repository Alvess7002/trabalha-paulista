import { useLocation, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useFavoritos } from '../hooks/useFavoritos'
import { useIdioma } from '../idioma/useIdioma'

export default function BotaoFavorito({ tipo, id, nome }) {
  const { t } = useIdioma()
  const { user } = useAuth()
  const { ehFavorito, alternar } = useFavoritos()
  const navigate = useNavigate()
  const location = useLocation()
  const ativo = ehFavorito(tipo, id)
  const rotulo = t(ativo ? 'fav.removeAria' : 'fav.addAria', { nome })

  const handleClick = () => {
    if (!user) {
      navigate('/login', { state: { noticeKey: 'fav.needLogin', from: location.pathname } })
      return
    }
    alternar(tipo, id)
  }

  return (
    <button
      type="button"
      className={`fav-btn${ativo ? ' ativo' : ''}`}
      aria-pressed={ativo}
      aria-label={rotulo}
      title={t(ativo ? 'fav.remove' : 'fav.add')}
      onClick={handleClick}
    >
      <Heart size={20} fill={ativo ? 'currentColor' : 'none'} aria-hidden="true" />
    </button>
  )
}
