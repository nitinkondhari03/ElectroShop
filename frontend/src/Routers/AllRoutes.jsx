import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import ForgotPassowrd from '../Pages/ForgotPassowrd'
const AllRoutes = () => {
  return (
    <div>
      <Header/>
      <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/forgot-password' element={<ForgotPassowrd/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default AllRoutes