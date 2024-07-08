import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main"></Route>
          <Route path="/bright_ideas"></Route>
          <Route path="/bright_ideas/:id"></Route>
          <Route path="/users/:id"></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
