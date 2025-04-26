import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from "../../contexts/LanguageContext";
import "./Cities.css";

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

const imageMap = {
  "warsaw": city,
  "krakow": city2,
  "lodz": city3,
  "wroclaw": city4,
  "poznan": city5,
  "gdansk": city6,
  "szczecin": city7,
  "bydgoszcz": city8,
  "lublin": city9,
  "bialystok": city10,
  "katowice": city11,
  "gdynia": city12
};

const Cities = () => {
  const { translations } = useContext(LanguageContext);
  const [visibleRows, setVisibleRows] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  const cities = translations.citiesList;
  const rowsToShow = 4;
  const visibleCities = cities.slice(0, visibleRows * rowsToShow);

  const preloadImages = (newCities) => {
    return Promise.all(newCities.map(city => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = imageMap[city.imageKey];
        img.onload = resolve;
        img.onerror = resolve; 
      });
    }));
  };

  const handleLoadMore = async () => {
    setLoading(true);
    const nextCities = cities.slice(visibleRows * rowsToShow, (visibleRows + 1) * rowsToShow);

    await preloadImages(nextCities);

    setVisibleRows(prev => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    const preloadAll = async () => {
      const initialCities = cities.slice(0, rowsToShow);
      await preloadImages(initialCities);
    };
    preloadAll();
  }, []);

  return (
    <>
      <div className="heading">
        <h1>{translations.citiesTexts.mainTitle}</h1>
      </div>

      <section className='cities'>
        <h1 className='heading-title'>{translations.citiesTexts.populationTitle}</h1>

        <div className='box-container'>
          {visibleCities.map((city) => (
            <div className='box' key={city.id}>
              <div className='image'>
                <img
                  src={imageMap[city.imageKey]}
                  alt={city.name}
                  loading="lazy"
                />
              </div>
              <div className='content'>
                <h3>{city.name}</h3>
                <p>{city.description}</p>
                <span className='btn'>{translations.citiesTexts.readMore}</span>
              </div>
            </div>
          ))}
        </div>

        {visibleRows * rowsToShow < cities.length && (
          <div className='load-more'>
            {loading ? (
              <div className="loader"></div>
            ) : (
              <span className='btn' onClick={handleLoadMore}>
                {translations.citiesTexts.loadMore}
              </span>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Cities;
