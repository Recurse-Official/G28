import React from "react";
import "./styles/Gallery.css";

const Gallery = ({ images, onImageClick }) => {
  return (
    <div className="gallery-container">
      {images.map((image, index) => (
        <div className="gallery-item" key={index}>
          <img
            src={image}
            alt={`Uploaded ${index}`}
            onClick={() => onImageClick(image)} // Handle image click
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
