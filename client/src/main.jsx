import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import ErrorBoundary from './components/error-handling/ErrorBoundary.jsx'
import ErrorFallback from './components/error-handling/ErrorFallback.jsx'

import AuthProvider from './context/AuthProvider.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <ErrorBoundary fallback={<ErrorFallback/>}>
        <AuthProvider>
             <App />
          </AuthProvider>
        </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
