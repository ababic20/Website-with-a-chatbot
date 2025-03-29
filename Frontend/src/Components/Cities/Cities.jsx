import React, { useState } from 'react';
import city from "../../assets/cities/Warsaw.jpg";
import city2 from "../../assets/cities/Krakow.jpg";
import city3 from "../../assets/cities/Lodz.jpg";
import city4 from "../../assets/cities/Wroclaw.jpg";
import city5 from "../../assets/cities/Poznan.jpg";
import city6 from "../../assets/cities/Gdansk.jpg";
import city7 from "../../assets/cities/Szczecin.jpg";
import city8 from "../../assets/cities/Bydgoszcz.jpg";
import city9 from "../../assets/cities/Lublin.jpg";
import city10 from "../../assets/cities/Bialystok.jpg";
import city11 from "../../assets/cities/Katowice.jpg";
import city12 from "../../assets/cities/Gdynia.jpg";

import "./Cities.css";

const Cities = () => {
  const [visibleRows, setVisibleRows] = useState(1); 

  const cities = [
    { id: 1, name: "Warsaw", image: city, description: "1,793,579 inhabitants" },
    { id: 2, name: "Krakow", image: city2, description: "780,981 inhabitans" },
    { id: 3, name: "Łódź", image: city3, description: "677,286 inhabitans" },
    { id: 4, name: "Wroclaw", image: city4, description: "643,782 inhabitans" },
    { id: 5, name: "Poznań", image: city5, description: "533,830 inhabitans" },
    { id: 6, name: "Gdańsk", image: city6, description: "471,525 inhabitans" },
    { id: 7, name: "Szczecin", image: city7, description: "400,990 inhabitans" },
    { id: 8, name: "Bydgoszcz", image: city8, description: "346,739 inhabitans" },
    { id: 9, name: "Lublin", image: city9, description: "339,547 inhabitans" },
    { id: 10, name: "Białystok", image: city10, description: "297,585 inhabitans" },
    { id: 11, name: "Katowice", image: city11, description: "317,220 inhabitans" },
    { id: 12, name: "Gdynia", image: city12, description: "250,242 inhabitans" },
  ];

  const rowsToShow = 4; 
  const visibleCities = cities.slice(0, visibleRows * rowsToShow);

  const handleLoadMore = () => {
    setVisibleRows((prev) => prev + 1); 
  };

  return (
    <>
      <div className="heading">
        <h1>Explore the Cities of Poland</h1>
      </div>
      <section className='cities'>
        <h1 className='heading-title'>Population</h1>
        <div className='box-container'>
          {visibleCities.map((city) => (
            <div className='box' key={city.id}>
              <div className='image'>
                <img src={city.image} alt={city.name} />
              </div>
              <div className='content'>
                <h3>{city.name}</h3>
                <p>{city.description}</p>
                <a href="" className='btn'>Read more</a>
              </div>
            </div>
          ))}
        </div>
        {visibleRows * rowsToShow < cities.length && (
          <div className='load-more'>
            <span className='btn' onClick={handleLoadMore}>Load more</span>
          </div>
        )}
      </section>
    </>
  );
};

export default Cities;

