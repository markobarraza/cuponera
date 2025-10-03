import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import CuponProvider from './context/CuponContext.jsx'
import SwapyProvider from './context/SwapyContext.jsx'
import FalabellaProvider from './context/FalabellaContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContadorProvider from './context/ContadorContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <FalabellaProvider>
          <CuponProvider>
            <SwapyProvider>
              <ContadorProvider>
                <App />
              </ContadorProvider>
            </SwapyProvider>
          </CuponProvider>
        </FalabellaProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
