import React, { useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import CanvasOverlay from './components/CanvasOverlay';
import Controller from './components/Controller';
import CombinedProvider from './contexts/CombinedProvider';

const socket = io.connect('http://localhost:8080');

function App() {

  useEffect(() => {

    socket.on('connect', () => {
      console.log('connected')
    })

  }, []);

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
