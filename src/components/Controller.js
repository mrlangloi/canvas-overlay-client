import React, { useContext } from 'react';
import { StreamContext } from '../contexts/StreamContext';
import Layers from './Layers';
import MediaControls from './MediaControls';

// sidebar to adjust the properties of current media card

function Controller() {

  const { streamZIndex, setStreamZIndex } = useContext(StreamContext)

  function handleStreamInteract(e) {
    if (e.target.checked) {
      setStreamZIndex(1000);
    } else {
      setStreamZIndex(-1);
    }
  }


  return (
    <div className="controller streamer-mode">
      <h1>Main Control</h1>

      <div className="flex-row">
        <label htmlFor="toggle-stream-interact">Stream Interact</label>
        <input type="checkbox" id="toggle-stream-interact" checked={streamZIndex === -1 ? false : true} onChange={handleStreamInteract} />
      </div>


      <Layers />

      <MediaControls />

    </div>
  )
}

export default Controller;