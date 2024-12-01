import  { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageGallery = () => {
  const [username, setUsername] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchImages = async () => {
    if (!username.trim()) {
      alert("Please enter a username.");
      return;
    }

    setLoading(true);
    setError("");
    setImages([]);

    try {
      const response = await axios.get(`http://localhost:5000/api/images/${username}`);
      setImages(response.data.images);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to load images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Dynamic Image Gallery</h1>
      <div className="mb-3">
        <label htmlFor="usernameInput" className="form-label">
          Enter Username
        </label>
        <div className="input-group">
          <input
            type="text"
            id="usernameInput"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchImages}>
            Fetch Images
          </button>
        </div>
      </div>

      {loading && <p className="text-center">Loading images...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-4">
        {images.map((image) => (
          <div key={image._id} className="col">
            <div className="card shadow-sm">
              <img src={image.url} className="card-img-top" alt="Image" />
              <div className="card-body">
                <p className="card-text">Last Modified: {image.lastModified}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
