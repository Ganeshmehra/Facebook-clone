import React from 'react'
import Log_In from './page1/Log_In'
import Sign_Up from './page1/Sign_Up'
import { Route, Routes } from 'react-router'
import Home from './Home/Home'
import UserPosts from './UserPost/UserPosts'
import Prodcts from './all/Prodcts'
import Vidios from './all/Videos'
import Games from './all/Games'

const App = () => {
  return (
    <>
   <Routes>
    <Route path='/Sign_Up' element={<Sign_Up/>}/>
    <Route path='/Log_In' element={<Log_In/>}/>
    <Route path='/' element={<Log_In/>}/>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/UserPost' element={<UserPosts/>}/>
    <Route path='/Prodcts' element={<Prodcts/>}/>
    <Route path='/Vidios' element={<Vidios/>}/>
    <Route path='/Games' element={<Games/>}/>

   </Routes>
    </>
  )
}

export default App
