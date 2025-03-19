import React from "react";
import "./Help.css";

const HomeOffer = () => {
  return (
    <section className="home-help">
      <div className="content">
        <h3>The chatbot didn't answer your question?</h3>
        <p>
        If there is a specific question that the chatbot has not answered or 
        you do not want to ask it but rather the owner of this page, please ask a question. 
        We will try to respond quickly.
        </p>
        <a href="/question" className="btn">Ask the question!</a>
      </div>
    </section>
  );
};

export default HomeOffer;
