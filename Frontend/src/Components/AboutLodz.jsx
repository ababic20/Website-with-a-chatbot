import React from "react";
import "./AboutLodz.css"; 

const AboutUs = () => {
  return (
    <section className="home-about">
      <div className="image">
        <img src="\src\assets\city.jpg" alt="About Łódź"/>
      </div>
      <div className="content">
        <h3>About Łódź</h3>
        <p>
        Łódź is a fascinating city full of creativity and history. 
        The street art and murals give it a unique character, while places like the OFF Piotrkowska complex offer a vibrant atmosphere with trendy cafes, restaurants, and art spaces. 
        The city's industrial past blends perfectly with its modern, artistic vibe.
        </p>
        <a href="/about" className="btn">Read More</a>
      </div>
    </section>
  );
};

export default AboutUs;