import React, { useState } from "react"; 
import './Question.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState(false); // Novo stanje za obavijest
  const [summary, setSummary] = useState(null); // Novo stanje za summary

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setSummary(formData); // Postavimo summary sa poslanim podacima
    setSuccessMessage(true); // Pokreni obavijest nakon slanja forme

    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      description: "",
    }); // Resetiranje vrijednosti u poljima

    setTimeout(() => {
      setSuccessMessage(false); // Sakrij obavijest nakon 3 sekunde
    }, 3000);
  };
  return (
    <div className="main-container">
      <div className="summary-container">
        {summary && (
          <div className="summary-box">
            <h3>Summary of Submitted Information:</h3>
            <p><strong>Full Name:</strong> {summary.fullName}</p>
            <p><strong>Phone:</strong> {summary.phone}</p>
            <p><strong>Email:</strong> {summary.email}</p>
            <p><strong>Address:</strong> {summary.address}</p>
            <p><strong>Description:</strong> {summary.description}</p>
          </div>
        )}
      </div>
  
      <div className="form-container">
        <h2 className="form-header">If you're unsure about anything, feel free to ask, I'm here 🙂</h2>
  
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Full name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="(123) 456-7890"
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john.doe@example.com"
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="123 Main St, Cityville"
          />
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Briefly describe your inquiry or issue"
          />
          <button type="submit">Submit</button>
        </form>
  
        {successMessage && (
          <div className="success-popup">
            <p>Your message has been successfully sent! 🙂</p>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default ContactForm;
