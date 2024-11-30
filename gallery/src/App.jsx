import React, { useState } from "react";
import Upload from "./components/Upload";
import FullscreenImage from "./components/FullscreenImage";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Group images by date
  const groupedImages = images.reduce((groups, image) => {
    const date = new Date(image.lastModified).toDateString(); // Group by date
    if (!groups[date]) groups[date] = [];
    groups[date].push(image);
    return groups;
  }, {});

  const allImages = images.map((image) => image.url);

  const handlePrev = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex < allImages.length - 1) {
      setSelectedImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div>
      <h1>Gallery with Full Features</h1>
      <Upload setImages={setImages} />
      {selectedImageIndex !== null && (
        <FullscreenImage
          image={allImages[selectedImageIndex]}
          onClose={() => setSelectedImageIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          disablePrev={selectedImageIndex === 0}
          disableNext={selectedImageIndex === allImages.length - 1}
        />
      )}
      <div style={{ padding: "20px" }}>
        {Object.keys(groupedImages)
          .sort((a, b) => new Date(b) - new Date(a)) // Sort groups by date
          .map((date) => (
            <div key={date}>
              <h2>{date}</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "15px",
                }}
              >
                {groupedImages[date].map((image, index) => (
                  <div
                    key={index}
                    style={{
                      overflow: "hidden",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`Uploaded ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                        transition: "transform 0.3s ease",
                      }}
                      onClick={() =>
                        setSelectedImageIndex(images.findIndex((img) => img.url === image.url))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
