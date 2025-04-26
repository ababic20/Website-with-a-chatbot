import React from 'react'
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext'; 
import Home from './pages/Home'
import About from './pages/About'
import Cities from './pages/Cities'
import Question from './pages/Question'



const App = () => {
  return (
    <LanguageProvider> 
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/cities' element={<Cities />} />
          <Route path='/question' element={<Question />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};


export default App