/* eslint-disable no-undef */
import { useState } from 'react';
import '../styles/Hero.css';
import backgroundImage from '../assets/Screenshot 2024-12-01 003719.png';

const Hero = () => {
    const [username, setUsername] = useState('');
    const [files, setFiles] = useState(null);

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', username);

        if (files) {
            Array.from(files).forEach((file) => {
                // Add file and its last modified date to the FormData
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
            }
        } catch (error) {
            console.error('Error during upload:', error);
        }
    };

    return (
        <div
            className="hero"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="hero-content">
                <h1>Image Upload</h1>
                <form onSubmit={handleSubmit} className="upload-form">
                    <label>
                        <span>Username:</span>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
            </div>
        </div>
    );
};

export default Hero;
