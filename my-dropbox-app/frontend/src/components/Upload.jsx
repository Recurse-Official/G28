import React, { useState } from "react";

const Upload = ({ setImages }) => {
  const [files, setFiles] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Initialize descriptions with an empty string for each file
    setDescriptions(selectedFiles.map(() => ""));
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const handleUpload = () => {
    const formData = new FormData();

    // Append each file and its description to FormData
    files.forEach((file, index) => {
      formData.append("images", file);
      formData.append(`description_${index}`, descriptions[index] || ""); // Add description or empty string
    });

    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImages(data.images); // Update the gallery with new images
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <input type="file" multiple onChange={handleFileChange} />

      {files.map((file, index) => (
        <div key={index} style={{ margin: "10px 0" }}>
          <p>{file.name}</p>
          <input
            type="text"
            placeholder="Enter description"
            value={descriptions[index]}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
