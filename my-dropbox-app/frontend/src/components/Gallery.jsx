import React from "react";
import ImageCard from "./ImageCard";

const Gallery = ({ images }) => {
  return (
    <div>
      <h2>Gallery</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.map((img) => (
          <ImageCard key={img.filename} image={img} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
