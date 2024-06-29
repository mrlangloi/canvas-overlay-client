import React, { useState } from 'react';
import Layers from './Layers';
import MediaCard from './MediaCard';
import MediaControls from './MediaControls';

// sidebar to adjust the properties of current media card

function Controller() {

  const defaultState = {
    id: 0,
    name: "Element",
    text: "placeholder text",
    src: "https://via.placeholder.com/150",
    posX: 0,
    posY: 0,
    rotate: 0,
    scale: 1,
    opacity: 100,
    zindex: 0
  }

  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  const [rotation, setRotation] = useState(0)

  const [activeElement, setActiveElement] = useState(null)


  return (
    <div className="controller">
      <h1>Main Control</h1>

      <Layers 
        setActiveElement={setActiveElement} 
      />

      <MediaControls 
        activeElement={activeElement}
        posX={posX}
        setPosX={setPosX}
        posY={posY}
        setPosY={setPosY}
        rotation={rotation}
        setRotation={setRotation}
      />

      <MediaCard 
        id={1} 
        setActiveElement={setActiveElement} 
        setPosX={setPosX} 
        setPosY={setPosY} 
        rotation={rotation}
      />

      <MediaCard 
        id={2} 
        setActiveElement={setActiveElement} 
        setPosX={setPosX} 
        setPosY={setPosY} 
        rotation={rotation}
      />

    </div>
  )
}

export default Controller;