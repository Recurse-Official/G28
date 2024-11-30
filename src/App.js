import React, { useState } from "react";
import Upload from "./components/Upload";
import Gallery from "./components/Gallery";

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div>
      <h1>Time Capsule</h1>
      <Upload setImages={setImages} />
      <div>
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <Gallery images={images} selectedDate={selectedDate} />
    </div>
  );
};

export default App;
