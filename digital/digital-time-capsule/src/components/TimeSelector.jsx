import React, { useState } from 'react';

const TimeSelector = ({ setCapsuleTime }) => {
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = () => {
    setCapsuleTime(selectedTime);
  };

  return (
    <div className="time-selector-container">
      <h2>Set Capsule Opening Time</h2>
      <input
        type="datetime-local"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      />
      <button onClick={handleSubmit}>Set Time</button>
    </div>
  );
};

export default TimeSelector;
