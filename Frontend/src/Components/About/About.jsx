import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext'; 
import './About.css';

const About = () => {
  const { translations } = useContext(LanguageContext); 

  return (
    <>
      <div className="heading">
        <h1>{translations.aboutPage.mainTitle}</h1>
      </div>

      <section className='about'>
        <div className='image'>
          <img src="/src/assets/cities/Lodz2.jpg" alt="Lodz" />
        </div>

        <div className='content'>
          <h3>{translations.aboutPage.subTitle}</h3>

          <p>{translations.aboutPage.paragraph1}</p>
          <p>{translations.aboutPage.paragraph2}</p>

          <div className="icons-container">
            <div className='icons'>
              <i className='fas fa-shield-alt'></i>
              <span>{translations.aboutPage.safe}</span>
            </div>
            <div className='icons'>
              <i className='fas fa-leaf'></i>
              <span>{translations.aboutPage.clean}</span>
            </div>
            <div className='icons'>
              <i className='fas fa-building'></i>
              <span>{translations.aboutPage.modern}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About;
