import { useState, useEffect, useRef } from 'react';


function Status() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSlideshow, setShowSlideshow] = useState(false); // To control when slideshow starts
  const fileInputRef = useRef(null);

  // Update the current image whenever the currentIndex changes
  useEffect(() => {
    if (images.length > 0) {
      setCurrentImage(images[currentIndex]);
    }
  }, [currentIndex, images]);

  // Handle the slideshow effect
  useEffect(() => {
    let interval;
    if (images.length > 0 && showSlideshow && !isPaused && currentIndex < images.length - 1) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 5000); // Change image every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [images, showSlideshow, isPaused, currentIndex]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
    setCurrentIndex(0);
    setCurrentImage(imageUrls[0]); // Set first image to show immediately
  };

  // Pause/Play functionality
  const handlePausePlay = () => {
    setIsPaused(!isPaused);
  };

  // Next image functionality
  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Previous image functionality
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Start slideshow when the first image is clicked
  const handleStartSlideshow = () => {
    setShowSlideshow(true);
  };

  return (
    <div className="App">
      <div className="upload-section">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {currentImage && (
        <div className="status-container">
          <img
            src={currentImage}
            alt="Status"
            id="statusImage"
            onClick={handleStartSlideshow} // Click to start the slideshow
            style={{ opacity: currentImage ? 1 : 0 }}
          />
        </div>
      )}

      {showSlideshow && (
        <div className="controls">
          <button onClick={handlePrevious} disabled={currentIndex === 0}>
            Previous
          </button>
          <button onClick={handlePausePlay}>
            {isPaused ? 'Play' : 'Pause'}
          </button>
          <button onClick={handleNext} disabled={currentIndex === images.length - 1}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Status;
