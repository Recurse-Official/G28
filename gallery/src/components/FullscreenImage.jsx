import { useState } from "react";
import axios from "axios";

const FullscreenImage = () => {
  const [username, setUsername] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:5000/api/images/${username}`);
      setImages(response.data.images);
    } catch (err) {
      setError("Failed to fetch images. Please check the username or server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Image Gallery</h1>
      <div className="mb-3 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={fetchImages}>
          Fetch Images
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {images.map((image) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={image._id}>
            <div className="card">
              <img
                src={image.url}
                className="card-img-top"
                alt="User"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <p className="card-text">
                  <small>Last Modified: {image.lastModified}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullscreenImage;
