import React from 'react';

const Upload = ({ setImages }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageObjects = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      lastModified: file.lastModified,
    }));
    setImages((prev) => [...prev, ...imageObjects]);
  };

  return (
    <div className="upload-container">
      <h2>Upload Images</h2>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
};

export default Upload;
