import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import PainelAcessibilidade from './PainelAcessibilidade'
import BotaoTopo from './BotaoTopo'
import { useIdioma } from '../idioma/useIdioma'

export default function Layout() {
  const { pathname } = useLocation()
  const { t } = useIdioma()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a href="#conteudo" className="pular-conteudo">{t('acess.pular')}</a>
      <Navbar />
      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <PainelAcessibilidade />
      <BotaoTopo />
    </>
  )
}
