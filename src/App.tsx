import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IChamados } from './types/type'

// pages
import About from './pages/About'
import Chamados from './pages/Chamados'
import Home from './pages/Home'
import Search from './pages/Search'
import NotFound from './pages/NotFound'

// components
import Nav from './components/Nav'
import Footer from './components/Footer'


function App() {

  return (
    <BrowserRouter>
      <Nav />
      <main>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/chamados" element={<Chamados/>}/>
        <Route path="/About" element={<About />}/>
        <Route path="/chamados/:name" element={<Search />}/>
        <Route path="/NotFound-404" element={<NotFound />}/>
        
      </Routes>  
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
