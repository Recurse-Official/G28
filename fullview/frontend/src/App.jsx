import React, { useState } from "react";
import CameraCapture from "./components/CameraCapture";
import ImagePreview from "./components/ImagePreview";
import UploadImages from "./components/UploadImages";
import Display360View from "./components/Display360View";

const App = () => {
  const [images, setImages] = useState([]);
  const [stitchedImageUrl, setStitchedImageUrl] = useState("");

  return (
    <div className="app">
      <h1>360° Image Stitching</h1>
      <CameraCapture setImages={setImages} />
      <ImagePreview images={images} />
      {images.length > 0 && (
        <UploadImages images={images} setStitchedImageUrl={setStitchedImageUrl} />
      )}
      {stitchedImageUrl && <Display360View imageUrl={stitchedImageUrl} />}
    </div>
  );
};

export default App;
