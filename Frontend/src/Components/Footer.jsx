import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { LanguageContext } from "../contexts/LanguageContext"; 
import './Footer.css';

const Footer = () => {
  const { translations } = useContext(LanguageContext); 

  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>{translations.footer.quickLinks}</h3>
          <Link to="/home"><i className="fas fa-angle-right"></i>{translations.navbar.home}</Link>
          <Link to="/about"><i className="fas fa-angle-right"></i>{translations.navbar.about}</Link>
          <Link to="/cities"><i className="fas fa-angle-right"></i>{translations.navbar.cities}</Link>
          <Link to="/question"><i className="fas fa-angle-right"></i>{translations.navbar.question}</Link>
        </div>

        <div className="box">
          <h3>{translations.footer.extraLinks}</h3>
          <a href="#"><i className="fas fa-angle-right"></i>{translations.footer.faq}</a>
          <a href="#"><i className="fas fa-angle-right"></i>{translations.footer.something}</a>
          <a href="#"><i className="fas fa-angle-right"></i>{translations.footer.privacyPolicy}</a>
          <a href="#"><i className="fas fa-angle-right"></i>{translations.footer.termsOfUse}</a>
        </div>

        <div className="box">
          <h3>{translations.footer.contactInfo}</h3>
          <a href="#"><i className="fas fa-phone"></i>{translations.footer.phone}</a>
          <a href="#"><i className="fas fa-envelope"></i>{translations.footer.email}</a>
          <a href="#"><i className="fas fa-globe"></i>{translations.footer.website}</a>
          <a href="#"><i className="fas fa-map"></i>{translations.footer.address}</a>
        </div>

        <div className="box">
          <h3>{translations.footer.followMe}</h3>
          <a href="#"><i className="fab fa-facebook-f"></i>Facebook</a>
          <a href="#"><i className="fab fa-instagram"></i>Instagram</a>
          <a href="#"><i className="fab fa-linkedin"></i>LinkedIn</a>
          <a href="#"><i className="fab fa-twitter"></i>Twitter</a>
        </div>
      </div>

      <div className="credit">{translations.footer.credit} <span>Aleksandar Babić</span>; {translations.footer.allRightsReserved}.</div>
      <div className="credit">{translations.footer.imagesFrom} <span>Pexels.</span></div>
    </section>
  );
};

export default Footer;
