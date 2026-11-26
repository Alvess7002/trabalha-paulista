import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { CandidaturasProvider } from './context/CandidaturasProvider.jsx'
import { CatalogoProvider } from './context/CatalogoProvider.jsx'
import { FavoritosProvider } from './context/FavoritosProvider.jsx'
import { ProvedorIdioma } from './idioma/ProvedorIdioma.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProvedorIdioma>
        <AuthProvider>
          <CatalogoProvider>
            <CandidaturasProvider>
              <FavoritosProvider>
                <App />
              </FavoritosProvider>
            </CandidaturasProvider>
          </CatalogoProvider>
        </AuthProvider>
      </ProvedorIdioma>
    </BrowserRouter>
  </StrictMode>,
)