import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { AppFeaturesProvider } from './context/AppFeaturesProvider.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppFeaturesProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AppFeaturesProvider>
    </BrowserRouter>
  </StrictMode>,
)