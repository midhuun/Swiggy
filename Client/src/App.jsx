import { useState } from 'react'
import './App.css'
import Login from './Login';
import Foods from './Foods';
import LoginUser from './LoginUser';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Foods/>}/>
      <Route path='/register' element={<Login/>}/>
      <Route path='/login' element={<LoginUser/>}/>
    </Routes>
    </Router>
  )
}

export default App
