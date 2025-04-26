import React, { useContext } from 'react';
import { LanguageContext } from "../../contexts/LanguageContext"; 
import './Reviews.css';

const Reviews = () => {
  const { translations } = useContext(LanguageContext); 

  const reviewData = translations.reviews.reviewList; 

  return (
    <section className="reviews">
      <div className='swiper reviews-slider'>
        <div className='swiper-wrapper'>
          {reviewData.map((review2, index) => (
            <div className='swiper slide' key={index}>
              <div className='stars'>
                <i className='fas fa-star'></i>
                <i className='fas fa-star'></i>
                <i className='fas fa-star'></i>
                <i className='fas fa-star'></i>
                <i className='fas fa-star'></i>
              </div>
              <p>{review2.text}</p>
              <h3>{review2.name}</h3>
              <span>{review2.role}</span>
              <img src={review2.image} alt={review2.name} width="5%" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
