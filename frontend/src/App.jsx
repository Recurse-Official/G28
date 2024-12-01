import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Gallery from './components/Gallery'; // Import Gallery component
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero setUsername={setUsername} />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery username={username} />} /> {/* Pass username to Gallery */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
