import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginRegister from './views/LoginRegister'
import LikeStatus from './views/LikeStatus'
import UserProfile from './views/UserProfile'
import { Home } from './views/Home'
import {useState} from 'react'

function App() {
  //use lifted state to keep track of user details throughout components, once user is logged in
  const [user, setUser] = useState({});
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<LoginRegister />}></Route>
          <Route path="/bright_ideas" element={<Home user={user}/>}></Route>
          <Route path="/bright_ideas/:id" element={<LikeStatus user={user} />}></Route>
          <Route path="/users/:id" element={<UserProfile user={user} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
