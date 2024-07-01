import React, { useEffect, useRef, useState } from 'react';
import Layers from './Layers';
import MediaCard from './MediaCard';
import MediaControls from './MediaControls';

// sidebar to adjust the properties of current media card

/**
 * Currently, the media cards are children to the controller
 * therefore, if I set the controller's position as fixed,
 * the media cards will also be fixed.
 * I need to create a separate component for the media cards to
 * be children of so that the controller can be fixed and the
 * media cards can be absolute.
 */

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
    opacity: 1,
    zindex: 0
  }

  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(100)
  const [opacity, setOpacity] = useState(100)
  const [zIndex, setZIndex] = useState(0)
  const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/150")
  const [text, setText] = useState("placeholder text")

  const [activeElement, setActiveElement] = useState(null)

  const listOfRefs = useRef([])


  // everytime activeElement changes, update the position and rotation
  useEffect(() => {
    if (!activeElement) return;

    setImgSrc(activeElement.querySelector('img').src);
    setPosX(parseInt(activeElement.style.left));
    setPosY(parseInt(activeElement.style.top));
    setRotation(parseInt(activeElement.style.rotate));
    setScale(Math.round(parseFloat(activeElement.style.scale) * 100));
    setOpacity(Math.round(parseFloat(activeElement.style.opacity) * 100));
    setZIndex(parseInt(activeElement.style.zIndex));
    setText(activeElement.querySelector('p').textContent);

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
        listOfRefs={listOfRefs}
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
        text={text}
        setText={setText}
      />

      <MediaCard 
        id={1} 
        addToRefs={addToRefs}
        activeElement={activeElement}
        setActiveElement={setActiveElement} 
        setPosX={setPosX} 
        setPosY={setPosY}
        text={text}
      />

      <MediaCard 
        id={2} 
        addToRefs={addToRefs}
        activeElement={activeElement}
        setActiveElement={setActiveElement} 
        setPosX={setPosX} 
        setPosY={setPosY}
        text={text}
      />

    </div>
  )
}

export default Controller;