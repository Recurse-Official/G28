// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";
import HomePage from "./HomePage";
import Features from './components/Features';
import DigitalCapsule from './components/DigitalCapsule';
import Status from './components/Status';
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<ImageGallery />} />
        {/* Add other routes here */}
        <Route path="/features" element={<Features />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/digitalCapsule" element={<DigitalCapsule />} />
          <Route path="/status" element={<Status />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
