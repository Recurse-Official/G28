import React from 'react';
import '../styles/Hero.css';
import backgroundImage from '../assets/Screenshot 2024-12-01 003719.png'; // Import your image here

const Hero = () => (
  <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <h1>Welcome to the Digital Time Capsule</h1>
    <p>Preserve and share memories for generations to come!</p>
    {/* Upload Button */}
    <label htmlFor="file-upload" className="upload-btn">
      Choose Files
    </label>
    <input
      id="file-upload"
      type="file"
      multiple
      style={{ display: 'none' }} // Hide default file input
    />
  </div>
);

export default Hero;
