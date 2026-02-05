import { useState } from 'react'
import './App.css'
import Families from './pages/Families'

function App() {
  const [page, setPage] = useState('/');

  const pages = {
    '/': "",
    "/families": <Families />
  }

  function handleNav(page) {
    setPage(page)
  }

  return (
    <>
      <nav>
        <li onClick={() => handleNav('/families')}>Families</li>
      </nav>
      {pages[page]}
    </>
  )
}

export default App
