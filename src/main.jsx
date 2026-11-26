import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { CandidaturasProvider } from './context/CandidaturasProvider.jsx'
import { ProvedorIdioma } from './idioma/ProvedorIdioma.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProvedorIdioma>
        <AuthProvider>
          <CandidaturasProvider>
            <App />
          </CandidaturasProvider>
        </AuthProvider>
      </ProvedorIdioma>
    </BrowserRouter>
  </StrictMode>,
)