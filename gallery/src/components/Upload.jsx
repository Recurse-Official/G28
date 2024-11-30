import React from "react";

const Upload = ({ setImages }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageDetails = files.map((file) => ({
      url: URL.createObjectURL(file),
      lastModified: file.lastModified, // Capture last modified timestamp
    }));

    // Sort images by lastModified date (descending order)
    const sortedImages = [...imageDetails].sort(
      (a, b) => b.lastModified - a.lastModified
    );

    setImages((prevImages) => [...prevImages, ...sortedImages]);
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
};

export default Upload;
