import React from 'react';
import './Motivation.css'

const Motivation = () => {
  return (
    <section className="motivation">
      <h1 className="heading-title">Why apply for Erasmus?</h1>
      <div className="box-container">
        <div className="box">
          <img src="\src\assets\motivation\career.png" alt="Career" />
          <h3>Career</h3>
        </div>
        <div className="box">
          <img src="/src/assets/motivation/education.png" alt="Education" />
          <h3>Education</h3>
        </div>
        <div className="box">
          <img src="/src//assets/motivation/culture.png" alt="Culture" width="80" height="80" />
          <h3>Culture</h3>
        </div>
        <div className="box">
          <img src="/src//assets/motivation/education.png" alt="Networking" />
          <h3>Networking</h3>
        </div>
        <div className="box">
          <img src="/src//assets/motivation/networking.png" alt="Adventure" width="80" height="80" />
          <h3>Adventure</h3>
        </div>
      </div>
    </section>
  );
};

export default Motivation;
