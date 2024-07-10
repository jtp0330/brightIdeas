import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginRegister from './views/LoginRegister'
import LikeStatus from './views/LikeStatus'
import UserProfile from './views/UserProfile'
import { useState, useRef } from 'react'
import UserContext from './context/UserContext'
import Home from './views/Home'
import {useCookies,CookiesProvider} from 'react-cookie'

function App() {
  //use lifted state to keep track of user details throughout components, once user is logged in
  const [user, setUser] = useState({});
  const [cookies, setCookies] = useCookies(['user']);

  const login = (userData) => {
    setUser(userData)
  };

  const cookieLogin = (user) => {
    setCookies('user', user, {path: '/'})
  }

  const logout = () => {
    setUser(null)
  }

  // const cookieLogout = () => {
  //   setCookies('user', {}, {path: '/'})
  // }

  // const userRef = useRef(null)
  // userRef.current = user

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<LoginRegister />}></Route>
          <Route path="/bright_ideas" element={<Home user={cookies.user} />}></Route>
          <Route path="/bright_ideas/:id" element={cookies.user? <LikeStatus user={cookies.user} /> : <LoginRegister onLogin={cookieLogin} />}></Route>
          <Route path="/users/:id" element={cookies.user? <UserProfile user={cookies.user} /> : <LoginRegister onLogin={cookieLogin} />}></Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
