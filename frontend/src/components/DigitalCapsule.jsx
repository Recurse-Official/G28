import  { useState, useEffect } from 'react';
import Upload from './Upload';
import TimeSelector from './TimeSelector';
import CapsuleDisplay from './CapsuleDisplay';

const DigitalCapsule = () => {
  const [images, setImages] = useState([]);
  const [capsuleTime, setCapsuleTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isCapsuleOpen = capsuleTime && currentTime >= new Date(capsuleTime);

  return (
    <div className="app-container">
      <h1>Digital Time Capsule</h1>
      {!isCapsuleOpen ? (
        <>
          <Upload setImages={setImages} />
          <TimeSelector setCapsuleTime={setCapsuleTime} />
          {capsuleTime && (
            <p>
              Capsule will open on: <strong>{new Date(capsuleTime).toLocaleString()}</strong>
            </p>
          )}
        </>
      ) : (
        <CapsuleDisplay images={images} />
      )}
    </div>
  );
};

export default DigitalCapsule;
