import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './views/Home'
import LoginRegister from './views/LoginRegister'
import LikeStatus from './views/LikeStatus'
import UserProfile from './views/UserProfile'

//use lifted state to keep track of user details throughout components, once user is logged in
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<LoginRegister />}></Route>
          <Route path="/bright_ideas" element={<Home />}></Route>
          <Route path="/bright_ideas/:id" element={<LikeStatus />}></Route>
          <Route path="/users/:id" element={<UserProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App