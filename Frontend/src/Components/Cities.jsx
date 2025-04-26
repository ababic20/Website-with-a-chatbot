import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext"; 
import "./Cities.css";

import dImage from "../assets/cities/warsaw.jpg";
import dImage2 from "../assets/cities/krakow.jpg";  
import dImage3 from "../assets/cities/wroclaw.jpg";  

const imageMap = {
  "warsaw": dImage,
  "krakow": dImage2,
  "wroclaw": dImage3,
};

const TopDestinations = () => {
  const { translations } = useContext(LanguageContext);

  const destinations = translations.topDestinations.destinations; 

  return (
    <section className="home-cities">
      <h1 className="heading-title">{translations.topDestinations.title}</h1>
      <div className="box-container">
        {destinations.map((destination) => (
          <div className="box" key={destination.id}>
            <div className="image">
              <img src={imageMap[destination.imageKey]} alt={destination.title} />
            </div>

            <div className="content">
              <h3>{destination.title}</h3>
              <p>{destination.description}</p>
              <Link to={destination.link} className="btn">{translations.topDestinations.readMore}</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more">
        <Link to="/cities" className="btn">{translations.topDestinations.loadMore}</Link>
      </div>
    </section>
  );
};

export default TopDestinations;
