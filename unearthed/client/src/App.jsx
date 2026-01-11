import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import ViewCards from './components/ViewCards'
import Details from './components/Details'

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} >
          <Route index element={<ViewCards />}/>
          <Route path='/item/:itemId' element={<Details />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
