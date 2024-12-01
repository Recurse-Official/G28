import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const Gallery = ({ username }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch images from the API endpoint
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`http://localhost:5000/gallery/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }
                const data = await response.json();
                setImages(data.images); // Access the 'images' array inside the data object
                setLoading(false);
            } catch (err) {
                setError(err.message); // Handle any errors
                setLoading(false);
            }
        };

        if (username) {
            fetchImages();
        }
    }, [username]);  // Add `username` as a dependency to trigger fetch when it changes

    if (loading) {
        return <p>Loading images...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="gallery">
            <h2>Gallery</h2>
            <div className="gallery">
                {images.map((image, index) => (
                    <div key={index} className="gallery-item">
                        <img src={image.url} alt={`Gallery ${index}`} className="gallery-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

Gallery.propTypes = {
    username: PropTypes.string.isRequired, // Ensure username is a required string
};

export default Gallery;
