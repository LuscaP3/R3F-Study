import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.jsx'
import SideBar from './components/side_bar/SideBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <img className = 'logo' src={`${import.meta.env.BASE_URL}` + '/dw_logo2.png'}></img>
      <App />
      <SideBar />
      <div className='overlay' />

  </StrictMode>,
)