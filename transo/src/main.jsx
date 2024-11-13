import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ScannedDataProvider } from './helperhooks/ScannedDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScannedDataProvider>
    <App />
    </ScannedDataProvider>
  </StrictMode>,
)
