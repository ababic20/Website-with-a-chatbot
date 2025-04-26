import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Slider.css';

import { LanguageContext } from '../contexts/LanguageContext'; 

import aImage from '../assets/slider/a.jpg';
import bImage from '../assets/slider/b.jpg';
import cImage from '../assets/slider/c.jpg';

const Home = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <section className="home">
      <Swiper
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="home-slider"
      >
        <SwiperSlide className="slide" style={{ backgroundImage: `url(${aImage})`, backgroundRepeat: 'no-repeat' }}>
          <div className="content">
            <span>{translations.home.explore}</span>
            <h3>{translations.home.travelAround}</h3>
            <a href="#" className="btn">{translations.home.discoverMore}</a>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide" style={{ backgroundImage: `url(${bImage})`, backgroundRepeat: 'no-repeat' }}>
          <div className="content">
            <span>{translations.home.explore}</span>
            <h3>{translations.home.discoverPlaces}</h3>
            <a href="#" className="btn">{translations.home.discoverMore}</a>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide" style={{ backgroundImage: `url(${cImage})`, backgroundRepeat: 'no-repeat' }}>
          <div className="content">
            <span>{translations.home.explore}</span>
            <h3>{translations.home.makeYourTour}</h3>
            <a href="#" className="btn">{translations.home.discoverMore}</a>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Home;
