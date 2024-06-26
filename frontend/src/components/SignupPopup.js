// SignupPopup.js

import React, { useState } from 'react';
import './SignupPopup.css'; // Optional: add styling

const SignupPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    address: '',
    contactNumber: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'dateOfBirth') {
      // Calculate age based on date of birth
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData({
        ...formData,
        age: age
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to backend
    console.log(formData); // Replace with actual form submission code
    onClose(); // Close the popup after submission
  };

  return (
    <div className="signup-popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name *
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </label>
          <label>
            Last Name *
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </label>
          <label>
            Gender *
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </label>
          <label>
            Date of Birth
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          </label>
          <label>
            Age *
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </label>
          <label>
            Address *
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </label>
          <label>
            Contact Number *
            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
          </label>
          <label>
            Email ID *
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPopup;
