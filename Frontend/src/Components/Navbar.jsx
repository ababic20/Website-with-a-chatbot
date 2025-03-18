import React, { useState } from "react";
import './Navbar.css'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);  
  };

  return (
    <section className="header">
      <a href="./home" className="logo">Erasmus+ student exchange Łódź</a>

      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <a href="/home">Home</a>
        <a href="/about">About Łódź</a>
        <a href="/cities">Other cities</a>
        <a href="/question">Questions</a>
      </nav>

      <div 
        id="menu-btn" 
        className={`fas fa-bars ${menuOpen ? 'open' : ''}`} 
        onClick={handleMenuToggle}
      ></div>
    </section>
  );
};

export default Navbar;
