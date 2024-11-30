import React from "react";
import EXIF from "exif-js";

const Upload = ({ setImages }) => {
  const handleFileChange = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    const imageDetails = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Extract EXIF data for creation date
      await new Promise((resolve) => {
        EXIF.getData(file, function () {
          const creationDate = EXIF.getTag(this, "DateTimeOriginal");
          const formattedDate = creationDate
            ? new Date(creationDate.replace(/:/g, "-"))
            : new Date(file.lastModified);

          imageDetails.push({
            creationDate: formattedDate.toISOString().split("T")[0], // Save only the date part
          });
          resolve();
        });
      });

      formData.append("images", file);
    }

    // Upload to backend
    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Combine backend response with image details
        const imagesWithDates = data.images.map((img, index) => ({
          ...img,
          creationDate: imageDetails[index]?.creationDate,
        }));
        setImages(imagesWithDates);
      });
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
};

export default Upload;
