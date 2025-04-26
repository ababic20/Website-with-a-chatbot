import React, { useContext } from 'react';
import './Motivation.css';
import { LanguageContext } from '../contexts/LanguageContext'; 

const Motivation = () => {
  const { translations } = useContext(LanguageContext); 

  return (
    <section className="motivation">
      <h1 className="heading-title">{translations.motivation.title}</h1>
      <div className="box-container">
        <div className="box">
          <img src="/src/assets/motivation/career.png" alt="Career" />
          <h3>{translations.motivation.career}</h3>
        </div>
        <div className="box">
          <img src="/src/assets/motivation/education.png" alt="Education" />
          <h3>{translations.motivation.education}</h3>
        </div>
        <div className="box">
          <img src="/src/assets/motivation/culture.png" alt="Culture" width="80" height="80" />
          <h3>{translations.motivation.culture}</h3>
        </div>
        <div className="box">
          <img src="/src/assets/motivation/education.png" alt="Networking" />
          <h3>{translations.motivation.networking}</h3>
        </div>
        <div className="box">
          <img src="/src/assets/motivation/networking.png" alt="Adventure" width="80" height="80" />
          <h3>{translations.motivation.adventure}</h3>
        </div>
      </div>
    </section>
  );
};

export default Motivation;
