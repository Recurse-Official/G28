import React from "react";

const Gallery = ({ images, selectedDate }) => {
  const filteredImages = images.filter(
    (img) => img.creationDate === selectedDate
  );

  return (
    <div>
      <h2>Image Gallery</h2>
      {filteredImages.length > 0 ? (
        <div>
          {filteredImages.map((img, index) => (
            <div key={index} style={{ margin: "10px" }}>
              <img
                src={`http://localhost:5000${img.path}`}
                alt="Uploaded"
                style={{ width: "200px", height: "auto" }}
              />
              <p>Uploaded: {img.creationDate}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No images for the selected date.</p>
      )}
    </div>
  );
};

export default Gallery;
