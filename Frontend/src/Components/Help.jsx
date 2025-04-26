import React, { useContext } from "react";
import { Link } from "react-router-dom"; 
import { LanguageContext } from "../contexts/LanguageContext"; 
import "./Help.css";

const HomeOffer = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <section className="home-help">
      <div className="content">
        <h3>{translations.homeOffer.title}</h3>
        <p>{translations.homeOffer.description}</p>
        <Link to="/question" className="btn">{translations.homeOffer.button}</Link>
      </div>
    </section>
  );
};

export default HomeOffer;
