import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CuponProvider from './context/CuponContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CuponProvider>
          <App />
      </CuponProvider>
  </React.StrictMode>,
)
