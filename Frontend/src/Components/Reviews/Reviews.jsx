import React from 'react';
import './Reviews.css';

const Reviews = () => {
  return (
    <section className="reviews">
        <div className='swiper reviews-slider'>
            <div className='swiper-wrapper'>
                <div className='swiper slide'>
                    <div className='stars'>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                    </div>
                    <p>Coming into one of the most disliked cities in Poland turned out to be a wonderful experience. A mix of Eastern Europe, Multiculturalism & Industrial Soul - a very unique vibe.</p>
                    <h3>Chris Goodbro</h3>
                    <span>Student</span>
                    <img src="" alt="" width="5%"/>
                </div>
                <div className='swiper slide'>
                    <div className='stars'>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                    </div>
                    <p>I consider the Erasmus experience in Lodz to be the highlight of my student life and the best experience of my life. 
                        Poland is a beautiful country, and Lodz is a large and lively city, ideal for those who would like to get away from a small town and experience life in a big city. 
                        Don't hesitate to apply for Erasmus, I've heard from several people that they regret not applying for Erasmus during their studies, 
                        and I've never heard from anyone who applied and regretted it.</p>
                    <h3>David Slavik</h3>
                    <span>Student</span>
                    <img src="\src\assets\friends\David.jfif" alt="" width="5%"/>
                </div>
                <div className=' swiper slide'>
                    <div className='stars'>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                    </div>
                    <p>Coming into one of the most disliked cities in Poland turned out to be a wonderful experience. A mix of Eastern Europe, Multiculturalism & Industrial Soul - a very unique vibe.</p>
                    <h3>Natalia Pilch</h3>
                    <span>Student</span>
                    <img src="\src\assets\friends\Natalia.jpg" alt=""/>
                </div>
                
                
            </div>
        </div>
    </section>
  );
};

export default Reviews;