/* eslint-disable no-undef */
import '../styles/Hero.css';
import backgroundImage from '../assets/Screenshot 2024-12-01 003719.png'; // Import your image here

// const Hero = () => (
  
    
//     {/* Upload Button */}
//     <label htmlFor="file-upload" className="upload-btn">
//       Choose Files
//     </label>
//     <input
//       id="file-upload"
//       type="file"
//       multiple
//       style={{ display: 'none' }} // Hide default file input
//     />
//   </div>
// );
function Hero() {
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
      <div>
        <h1>Welcome to the Digital Time Capsule</h1>
        <p>Preserve and share memories for generations to come!</p>
        <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
          <h1>Image Upload</h1>
          <form onSubmit={handleSubmit}>
              <label>
                  Username:
                  <input
                      type="text"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                  />
              </label>
              <br />
              <label>
                  Upload Images:
                  <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                  />
              </label>
              <br />
              <button type="submit">Upload</button>
          </form>
      </div>
  );
}

export default Hero;
