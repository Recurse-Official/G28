import React, { useState } from 'react';
import '../styles/Hero.css';

const Hero = ({ setUsername }) => {
    const [username, setLocalUsername] = useState('');
    const [files, setFiles] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handleSubmit = async (event) => {
        setUsername(username);
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', username);

        if (files) {
            Array.from(files).forEach((file) => {
                formData.append('images', file);
                formData.append(
                    `lastModified_${file.name}`,
                    new Date(file.lastModified).toLocaleString()
                );
            });
        }

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Upload error:', errorData);
            } else {
                const data = await response.json();
                console.log('Upload success:', data);
                setSuccessMessage('Images uploaded successfully!');
            }
        } catch (error) {
            console.error('Error during upload:', error);
        }
    };

    return (
        <div className="hero">
            <div className="hero-content">
                <h1>Image Upload</h1>
                <form onSubmit={handleSubmit} className="upload-form">
                    <label>
                        <span>Username:</span>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setLocalUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>Upload Images:</span>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                    <button type="submit" className="upload-btn">
                        Upload
                    </button>
                </form>
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </div>
    );
};

export default Hero;
