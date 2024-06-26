// App.js

import React, { useState } from 'react';
import SignupPopup from './components/SignupPopup';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="App">
      <h1>Welcome to Clinic Appointment System</h1>
      <button onClick={togglePopup}>Signup</button>
      {showPopup && <SignupPopup onClose={togglePopup} />}
    </div>
  );
}

export default App;
