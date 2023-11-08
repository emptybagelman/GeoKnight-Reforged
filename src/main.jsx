import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider, PlayerProvider } from './contexts';


ReactDOM.createRoot(document.getElementById('root')).render(
  //  <React.StrictMode>
  <AuthProvider>
    <PlayerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PlayerProvider>
  </AuthProvider>
)
