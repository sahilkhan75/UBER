import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Userlogin from './pages/Userlogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/Captainlogin'
import Start from './pages/Start'
import Home from './pages/Home'
import UserprotectWrapper from './pages/UserprotectWrapper'
import Userlogout from './pages/Userlogout'
import CaptainHome from './pages/CaptainHome'
import CaptainprotectWrapper from './pages/CaptainprotectWrapper'
import Captainlogout from './pages/Captainlogout'


export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<Userlogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home' element={
          <UserprotectWrapper>
            <Home />
          </UserprotectWrapper>
        } />

        <Route path='/user/logout' element={
          <UserprotectWrapper>
            <Userlogout />
          </UserprotectWrapper>
        } />

        <Route path='/captain-home' element={
          <CaptainprotectWrapper>
            <CaptainHome />
          </CaptainprotectWrapper>
        } />

        <Route path='/captains/logout' element={
          <CaptainprotectWrapper>
            <Captainlogout />
          </CaptainprotectWrapper>
        } />
      </Routes>
    </div>
  )
}
