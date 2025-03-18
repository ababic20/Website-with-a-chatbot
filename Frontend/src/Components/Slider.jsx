import React from 'react';
//import Swiper from 'swiper';
//import 'swiper/swiper-bundle.min.css'; 
import './Slider.css'
import aImage from '../assets/slider/a.jpg';
import bImage from '../assets/slider/b.jpg';
import cImage from '../assets/slider/c.jpg';


const Home = () => {
  React.useEffect(() => {
    new Swiper('.home-slider', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, []);

  return (
    <section className="home">
      <div className="swiper home-slider">
        <div className="swiper-wrapper">
          <div className="swiper-slide slide" style={{ backgroundImage: `url(${aImage})`, backgroundRepeat: 'no-repeat'}}>
            <div className="content">
              <span>explore, discover, travel</span>
              <h3>Travel around Poland</h3>
              <a href="#" className="btn">discover more</a>
            </div>
          </div>
          <div className="swiper-slide slide" style={{ backgroundImage: `url(${bImage})`, backgroundRepeat: 'no-repeat'}}>
            <div className="content">
              <span>explore, discover, travel</span>
              <h3>Discover the new places</h3>
              <a href="#" className="btn">discover more</a>
            </div>
          </div>
          <div className="swiper-slide slide" style={{ backgroundImage: `url(${cImage})`, backgroundRepeat: 'no-repeat'}}>
            <div className="content">
              <span>explore, discover, travel</span>
              <h3>make your tour</h3>
              <a href="#" className="btn">discover more</a>
            </div>
          </div>
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </section>
  );
};

export default Home;
