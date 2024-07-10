import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginRegister from './views/LoginRegister'
import LikeStatus from './views/LikeStatus'
import UserProfile from './views/UserProfile'
import Home from './views/Home'
import { useState, useRef } from 'react'
import UserContext from './context/UserContext'

function App() {
  //use lifted state to keep track of user details throughout components, once user is logged in
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData)
  };

  const logout = () => {
    setUser(null)
  }
  const userRef = useRef(null)
  userRef.current = user

  return (
    <UserContext.Provider value={{ user, setUser, userRef, login, logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<LoginRegister />}></Route>
          <Route path="/bright_ideas" element={<Home user={user} />}></Route>
          <Route path="/bright_ideas/:id" element={<LikeStatus user={user} />}></Route>
          <Route path="/users/:id" element={<UserProfile user={user} />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
