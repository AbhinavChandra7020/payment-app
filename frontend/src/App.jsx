import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { SendMoney } from './pages/SendMoney'

function App() {
  return <>
  <BrowserRouter>
    <Routes>
      <Route path = "/dashboard" element = { <Dashboard />} />
      <Route path = "/signin" element = { <Signin />} />
      <Route path = "/signup" element = { <Signup />} />
      <Route path = "/send" element = { <SendMoney />} />

    </Routes>
  </BrowserRouter>
  </>
  
}

export default App
