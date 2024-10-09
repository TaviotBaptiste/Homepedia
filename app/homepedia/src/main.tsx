import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'leaflet/dist/leaflet.css'

ReactDOM.createRoot(document.getElementById('homepedia-app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
