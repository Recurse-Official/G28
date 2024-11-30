import React, { useState } from "react";
import Upload from "./components/Upload";
import Gallery from "./components/Gallery";

function App() {
  const [images, setImages] = useState([]);

  return (
    <div>
      <h1>My Dropbox App</h1>
      <Upload setImages={setImages} />
      <Gallery images={images} />
    </div>
  );
}

export default App;
