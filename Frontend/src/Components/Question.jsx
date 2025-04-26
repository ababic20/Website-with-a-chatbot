import React, { useState, useContext } from "react"; 
import './Question.css';
import { LanguageContext } from "../contexts/LanguageContext"; 

const ContactForm = () => {
  const { translations } = useContext(LanguageContext);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState(false);
  const [summary, setSummary] = useState(null);

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
    setSummary(formData);
    setSuccessMessage(true);

    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      description: "",
    });

    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="main-container">
      <div className="summary-container">
        {summary && (
          <div className="summary-box">
            <h3>{translations.contactForm.summaryTitle}</h3>
            <p><strong>{translations.contactForm.fullNameLabel}</strong> {summary.fullName}</p>
            <p><strong>{translations.contactForm.phoneLabel}</strong> {summary.phone}</p>
            <p><strong>{translations.contactForm.emailLabel}</strong> {summary.email}</p>
            <p><strong>{translations.contactForm.addressLabel}</strong> {summary.address}</p>
            <p><strong>{translations.contactForm.descriptionLabel}</strong> {summary.description}</p>
          </div>
        )}
      </div>

      <div className="form-container">
        <h2 className="form-header">{translations.contactForm.formHeader}</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>{translations.contactForm.fullNameLabel}</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder={translations.contactForm.fullNamePlaceholder}
          />
          <label>{translations.contactForm.phoneLabel}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder={translations.contactForm.phonePlaceholder}
          />
          <label>{translations.contactForm.emailLabel}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={translations.contactForm.emailPlaceholder}
          />
          <label>{translations.contactForm.addressLabel}</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder={translations.contactForm.addressPlaceholder}
          />
          <label>{translations.contactForm.descriptionLabel}</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder={translations.contactForm.descriptionPlaceholder}
          />
          <button type="submit">{translations.contactForm.submitButton}</button>
        </form>

        {successMessage && (
          <div className="success-popup">
            <p>{translations.contactForm.successMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
