import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext'; 
import './About.css';

const About = () => {
  const { translations } = useContext(LanguageContext); 

  return (
    <>
      <section className='about'>
        <div className='video'>
          <iframe
            src="https://drive.google.com/file/d/18k77Ntbqf1-yN5F-VsQ9CnGWgznZe6gm/preview"
            width="100%"
            height="400"
            allow="autoplay"
            allowFullScreen
            title="About Łódź Video"
            style={{ border: "none", borderRadius: "12px" }}
          ></iframe>
        </div>

        <div className='content'>
          <h3 id='vise-o-lodzu'>{translations.aboutPage.subTitle}</h3>

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
