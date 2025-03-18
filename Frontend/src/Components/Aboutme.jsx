import React from "react";
import "./Aboutme.css"; 

const AboutUs = () => {
  return (
    <section className="home-about">
      <div className="image">
        <img src="\src\assets\me.png" alt="About us"/>
      </div>
      <div className="content">
        <h3>About me</h3>
        <p>
        I am Aleksandar Babić, a 2nd year graduate student in "Databases and Knowledge Bases". This page presents my thesis, which is the final chapter of my studies.
        </p>
        <a href="/about" className="btn">Read More</a>
      </div>
    </section>
  );
};

export default AboutUs;