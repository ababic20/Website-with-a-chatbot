import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import './Navbar.css'; 
import logoImage from '../assets/boat.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleLanguage, translations } = useContext(LanguageContext);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className="header">
      <Link to="/home" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src={logoImage} alt="Logo" className="logo-img" />
        <span className="logo-text">{translations.navbar.logo}</span>
      </Link>

      <div className="nav-and-lang"> 
        <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
          <Link to="/home">{translations.navbar.home}</Link>
          <Link to="/about">{translations.navbar.about}</Link>
          <Link to="/cities">{translations.navbar.cities}</Link>
          <Link to="/question">{translations.navbar.question}</Link>
          <Link to="/documents">{translations.navbar.documents}</Link>
        </nav>

        <div className="language-switch">
          <button onClick={() => toggleLanguage('hr')}>HR</button>
          <button onClick={() => toggleLanguage('en')}>EN</button>
        </div>
      </div>

      <div 
        id="menu-btn" 
        className={`fas fa-bars ${menuOpen ? 'open' : ''}`} 
        onClick={handleMenuToggle}
      ></div>
    </section>
  );
};

export default Navbar;
