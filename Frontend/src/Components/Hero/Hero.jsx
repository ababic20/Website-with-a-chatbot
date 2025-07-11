import React, { useContext } from 'react';
import { LanguageContext } from "../../contexts/LanguageContext";
import './Hero.css';

const HeroLodz = () => {
  const { translations } = useContext(LanguageContext); 

  const handleScroll = () => {
    const target = document.getElementById('vise-o-lodzu');
    if (target) {
      const yOffset = -200;
      const targetY = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero hero-lodz">
      <div className="hero-content">
        <h1>{translations.heroLodz.title}</h1>
        <p>{translations.heroLodz.description}</p>
        <button className="hero-btn" onClick={handleScroll}>
          {translations.heroLodz.cta}
        </button>
      </div>
    </section>
  );
};

export default HeroLodz;
