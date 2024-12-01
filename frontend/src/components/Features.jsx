import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Features.css';

import feature1Image from '../assets/opengallery.jpg';
import feature2Image from '../assets/date.jpg';
import feature3Image from '../assets/emotionalbum.jpg';
import feature4Image from '../assets/view360deg.jpg';

const Features = () => (
  <div id="features" className="features">
    <h2>Explore Our Features</h2>
    <div className="features-list">
      <div className="feature-block">
        <img className="feature-image" src={feature1Image} alt="Feature 1" />
        <div className="feature-content">
          <h3>Open the Gallery</h3>
          <p className="feature-description">
            Easily access and view your stored images and videos in a well-organized gallery.
          </p>
          <Link to="/gallery">
            <button className="feature-btn">GALLERY</button>
          </Link>
        </div>
      </div>
      <div className="feature-block">
        <img className="feature-image" src={feature2Image} alt="Feature 2" />
        <div className="feature-content">
          <h3>Select a Specific Date</h3>
          <p className="feature-description">
            Effortlessly find your memories by selecting a specific date.
          </p>
          <button className="feature-btn">DATE</button>
        </div>
      </div>
      <div className="feature-block">
        <img className="feature-image" src={feature3Image} alt="Feature 3" />
        <div className="feature-content">
          <h3>Emotion Album Display</h3>
          <p className="feature-description">
            Explore images categorized by different emotions.
          </p>
          <button className="feature-btn">EmotionGallery</button>
        </div>
      </div>
      <div className="feature-block">
        <img className="feature-image" src={feature4Image} alt="Feature 4" />
        <div className="feature-content">
          <h3>360-Degree View of Photos</h3>
          <p className="feature-description">
            Experience your photos with a 360-degree view.
          </p>
          <button className="feature-btn">360</button>
        </div>
      </div>
    </div>
  </div>
);

export default Features;
