import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext'; 
import { ThemeProvider } from './contexts/ThemeContext'; 
import Home from './pages/Home'
import About from './pages/About'
import Cities from './pages/Cities'
import Question from './pages/Question'
import Documents from './pages/Documents';
import Icon from './Components/AIAssistant/Icon'; 

const App = () => {
  return (
    <LanguageProvider> 
      <ThemeProvider> 
        <BrowserRouter>
          <Icon />
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/cities' element={<Cities />} />
            <Route path='/question' element={<Question />} />
            <Route path='/documents' element={<Documents />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
