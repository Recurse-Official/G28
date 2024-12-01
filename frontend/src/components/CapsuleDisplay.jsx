/* eslint-disable react/prop-types */
const CapsuleDisplay = ({ images }) => {
  return (
    <div className="capsule-display-container">
      <h2>Your Time Capsule is Open!</h2>
      <div className="gallery">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image.url} alt={image.name} className="image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapsuleDisplay;
