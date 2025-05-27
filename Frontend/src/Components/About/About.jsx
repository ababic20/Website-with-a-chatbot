import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext'; 
import './About.css';
import videoFile from '../../assets/video.mp4';


const About = () => {
  const { translations } = useContext(LanguageContext); 

  return (
    <>
      <div className="heading">
        <h1>{translations.aboutPage.mainTitle}</h1>
      </div>

          <section className='about'>
          <div className='video'>
            <video controls autoPlay muted>
              <source src={videoFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
