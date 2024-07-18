import React from 'react';
import Layers from './Layers';
import MediaControls from './MediaControls';

// sidebar to adjust the properties of current media card

function Controller() {

  return (
    <div className="controller">
      <h1>Main Control</h1>

      <Layers />

      <MediaControls />

    </div>
  )
}

export default Controller;