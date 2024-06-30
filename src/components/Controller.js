import React, { useEffect, useRef, useState } from 'react';
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
  const [scale, setScale] = useState(1)
  const [opacity, setOpacity] = useState(100)
  const [zIndex, setZIndex] = useState(0)
  const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/150")

  const [activeElement, setActiveElement] = useState(null)

  const listOfRefs = useRef([])


  // everytime activeElement changes, update the position and rotation
  useEffect(() => {
    if (!activeElement) return;

    setPosX(parseInt(activeElement.style.left));
    setPosY(parseInt(activeElement.style.top));
    setRotation(parseInt(activeElement.style.rotate));

  }, [activeElement])


  // add element to the list of references
  function addToRefs(element) {
    if (element && !listOfRefs.current.includes(element)) {

      listOfRefs.current.push(element)
      console.log(listOfRefs.current)
    }
  }

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
        scale={scale}
        setScale={setScale}
        opacity={opacity}
        setOpacity={setOpacity}
        zIndex={zIndex}
        setZIndex={setZIndex}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
      />

      {

      }
      <MediaCard 
        id={1} 
        addToRefs={addToRefs}
        activeElement={activeElement}
        setActiveElement={setActiveElement} 
        setPosX={setPosX} 
        setPosY={setPosY}
      />

      <MediaCard 
        id={2} 
        addToRefs={addToRefs}
        activeElement={activeElement}
        setActiveElement={setActiveElement} 
        setPosX={setPosX} 
        setPosY={setPosY} 
      />

    </div>
  )
}

export default Controller;