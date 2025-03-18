import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Cities from './pages/Cities'
import Question from './pages/Question'



const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/cities' element={<Cities/>}></Route>
          <Route path='/question' element={<Question/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App