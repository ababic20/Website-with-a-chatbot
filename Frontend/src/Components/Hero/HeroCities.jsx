import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import './HeroCities.css';

const HeroCities = () => {
  const { translations } = useContext(LanguageContext);

  const handleScroll = () => {
    const target = document.getElementById('lista-gradova');
    if (target) {
      const yOffset = -200;
      const targetY = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero hero-cities">
      <div className="hero-content">
        <h1>{translations.heroCities.title}</h1>
        <p>{translations.heroCities.description}</p>
        <button className="hero-btn" onClick={handleScroll}>
          {translations.heroCities.cta}
        </button>
      </div>
    </section>
  );
};

export default HeroCities;
