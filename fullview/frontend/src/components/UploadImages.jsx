import React from "react";
import axios from "axios";

const UploadImages = ({ images, setStitchedImageUrl }) => {
  const uploadImages = async () => {
    const formData = new FormData();

    // Use Promise.all to fetch all images in parallel
    const blobs = await Promise.all(
      images.map((image) => fetch(image).then((res) => res.blob()))
    );

    blobs.forEach((blob, idx) => {
      formData.append(`images`, blob, `image${idx}.png`);
    });

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStitchedImageUrl(response.data.stitchedImageUrl);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return <button onClick={uploadImages}>Upload Images for Stitching</button>;
};

export default UploadImages;
