import React from "react";

const ImagePreview = ({ images }) => {
  return (
    <div>
      <h2>Captured Images</h2>
      <div className="image-grid">
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`Capture ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;
