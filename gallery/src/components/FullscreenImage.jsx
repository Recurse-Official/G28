import React, { useEffect } from "react";

const FullscreenImage = ({ image, onClose, onPrev, onNext, disablePrev, disableNext }) => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft": // Left Arrow Key
        if (!disablePrev) onPrev();
        break;
      case "ArrowRight": // Right Arrow Key
        if (!disableNext) onNext();
        break;
      case "Escape": // Escape Key
        onClose();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Attach keydown event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disablePrev, disableNext, onPrev, onNext, onClose]); // Dependencies ensure the handler updates correctly

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <img
        src={image}
        alt="Fullscreen"
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          objectFit: "contain",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
      />
      <button
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "18px",
          cursor: "pointer",
          display: disablePrev ? "none" : "block",
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing
          onPrev();
        }}
      >
        ❮
      </button>
      <button
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "18px",
          cursor: "pointer",
          display: disableNext ? "none" : "block",
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing
          onNext();
        }}
      >
        ❯
      </button>
    </div>
  );
};

export default FullscreenImage;
