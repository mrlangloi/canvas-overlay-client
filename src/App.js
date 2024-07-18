import React from 'react';
import './App.css';
import CanvasOverlay from './components/CanvasOverlay';
import Controller from './components/Controller';
import CombinedProvider from './contexts/CombinedProvider';

function App() {

  return (
    <div className="App">
      <div className="container">
        <CombinedProvider>
          <Controller />
          <CanvasOverlay />
        </CombinedProvider>
      </div>
    </div>
  );
}

export default App;
