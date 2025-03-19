import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>Quick links</h3>
          <a href="/home"><i className="fas fa-angle-right"></i>Home</a>
          <a href="/about"><i className="fas fa-angle-right"></i>About Łódź</a>
          <a href="/cities"><i className="fas fa-angle-right"></i>Other cities</a>
          <a href="/question"><i className="fas fa-angle-right"></i>Questions</a>
        </div>

        <div className="box">
          <h3>Extra links</h3>
          <a href="#"> <i className="fas fa-angle-right"></i>Frequently asked questions</a>
          <a href="#"> <i className="fas fa-angle-right"></i>Something</a>
          <a href="#"> <i className="fas fa-angle-right"></i>Privacy & policy</a>
          <a href="#"> <i className="fas fa-angle-right"></i>Terms of use</a>
        </div>

        <div className="box">
          <h3>Contact info</h3>
          <a href="#"><i className="fas fa-phone"></i>+385957518254</a>
          <a href="#"><i className="fas fa-envelope"></i>aleksandar.babic62@gmail.com</a>
          <a href="#"><i className="fas fa-globe"></i>www.example.com</a>
          <a href="#"><i className="fas fa-map"></i>Bjelovar, Croatia</a>
        </div>

        <div className="box">
          <h3>Follow me</h3>
          <a href="#"><i className="fab fa-facebook-f"></i>Facebook</a>
          <a href="#"><i className="fab fa-instagram"></i>Instagram</a>
          <a href="#"><i className="fab fa-linkedin"></i>Linkedln</a>
          <a href="#"><i className="fab fa-twitter"></i>Twitter</a>
        </div>
      </div>
      <div className="credit"> Created by <span>Aleksandar Babić</span>; Erasmus student</div>
    </section>
  );
};

export default Footer;
