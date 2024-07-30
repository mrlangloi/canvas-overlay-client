import React from 'react';
import './App.css';
import CanvasOverlay from './components/CanvasOverlay';
import Controller from './components/Controller';

function App() {

  return (
    <div className="App">
      <div className="container">
          <Controller />
          <CanvasOverlay />
      </div>
    </div>
  );
}

export default App;
