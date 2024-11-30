import '../styles/Features.css';

// Sample images (you can replace these with real image paths)
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
           This feature lets you quickly browse through your memories, zoom in on photos, and relive your favorite moments with just a click.
          </p>
          <button className="feature-btn">GALLERY</button>
        </div>
      </div>
      <div className="feature-block">
        <img className="feature-image" src={feature2Image} alt="Feature 2" />
        <div className="feature-content">
          <h3> Select a Specific Date</h3>
          <p className="feature-description">
          
Effortlessly find your memories by selecting a specific date. This feature allows users to filter and view images captured on a particular day, making it easy to revisit special moments from the past.


          </p>
          <button className="feature-btn">DATE</button>
        </div>
      </div>
      <div className="feature-block">
        <img className="feature-image" src={feature3Image} alt="Feature 3" />
        <div className="feature-content">
          <h3>Emotion Album Display</h3>
          <p className="feature-description">
           
          Our Emotion Album Display organizes your photos based on emotional expressions. With this feature, you can explore images categorized by different emotions, helping you relive moments full of joy, surprise, or even nostalgia, all in one place.
          </p>
          <button className="feature-btn">EmotionGallery</button>
        </div>
      </div>
      <div className="feature-block">
        <img className="feature-image" src={feature4Image} alt="Feature 4" />
        <div className="feature-content">
          <h3> 360-Degree View of Photos</h3>
          <p className="feature-description">
          
          Experience your photos like never before with our 360-degree view feature. Rotate, zoom in, and explore every angle of your images, giving you a more immersive and detailed perspective of your favorite memories.
          </p>
          <button className="feature-btn">360</button>
        </div>
      </div>
    </div>
  </div>
);

export default Features;
