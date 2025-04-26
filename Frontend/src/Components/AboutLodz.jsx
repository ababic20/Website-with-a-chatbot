import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext"; 
import "./AboutLodz.css"; 

const AboutUs = () => {
  const { translations } = useContext(LanguageContext); 
  return (
    <section className="home-about">
      <div className="image">
        <img src="/src/assets/city.jpg" alt="About Łódź" />
      </div>
      <div className="content">
        <h3>{translations.aboutUs.title}</h3>
        <p>{translations.aboutUs.description}</p>
        <Link to="/about" className="btn">{translations.aboutUs.readMore}</Link>
      </div>
    </section>
  );
};

export default AboutUs;
