import React from "react";
import "./Cities.css";

import dImage from "../assets/cities/warsaw.jpg";
import dImage2 from "../assets/cities/krakow.jpg";  
import dImage3 from "../assets/cities/wroclaw.jpg";  

const destinations = [
  {
    id: 1,
    image: dImage,
    title: "Warsaw",
    description: "Warsaw is the capital and largest city of Poland, combining modern dynamism with historical landmarks such as the Old Town and the legendary Royal Castle.",
    link: "/cities",
  },
  {
    id: 2,
    image: dImage2,
    title: "Krakow",
    description: "Kraków, the former capital of Poland, is famous for its rich history, well-preserved medieval architecture, and the impressive Wawel Castle.",
    link: "/cities/lodz",
  },
  {
    id: 3,
    image: dImage3,
    title: "Wroclaw",
    description: "Wrocław is known for its colorful architecture, beautiful bridges, and riverfront promenades, making it one of the most charming cities in Poland.",
    link: "/cities/krakow",
  },
];

const TopDestinations = () => {
  return (
    <section className="home-cities">
      <h1 className="heading-title">OTHER CITIES</h1>
      <div className="box-container">
        {destinations.map((destination) => (
          <div className="box" key={destination.id}>
            <div className="image">
              <img src={destination.image} alt="Destination" />
            </div>
            
            <div className="content">
              <h3>{destination.title}</h3>
              <p>{destination.description}</p>
              <a href={destination.link} className="btn">Read more</a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="load-more"><a href="/cities" className="btn">load more</a></div>
    </section>
  );
};

export default TopDestinations;
