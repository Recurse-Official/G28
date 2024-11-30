import React from "react";

const ImageCard = ({ image }) => {
  return (
    <div>
      <img
        src={`http://localhost:5000/${image.filename}`}
        alt={image.filename}
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
      <p>Date: {image.date}</p>
      <p>Description: {image.description || "No description provided"}</p>
    </div>
  );
};

export default ImageCard;
