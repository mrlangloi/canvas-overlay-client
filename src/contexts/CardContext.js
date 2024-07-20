import React, { createContext, useState } from 'react';

// stores the active card element and its properties

// all properties are state variables so that the page renders with each update

// i might separate out text and image into separate objects and contexts later

export const CardContext = createContext();

export function CardContextProvider({children}) {

  const [activeElement, setActiveElement] = useState(null)
  const [name, setName] = useState("New Card")
  const [isVisible, setIsVisible] = useState(false)
  const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/150")
  const [text, setText] = useState("placeholder text")
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [width, setWidth] = useState(-1)
  const [height, setHeight] = useState(-1)
  const [scale, setScale] = useState(100)
  const [orientX, setOrientX] = useState(1)
  const [orientY, setOrientY] = useState(1)
  const [opacity, setOpacity] = useState(100)
  const [zIndex, setZIndex] = useState(0)

  const value = {
    activeElement,
    setActiveElement,
    name,
    setName,
    isVisible,
    setIsVisible,
    imgSrc,
    setImgSrc,
    text,
    setText,
    posX,
    setPosX,
    posY,
    setPosY,
    rotation,
    setRotation,
    width,
    setWidth,
    height,
    setHeight,
    scale,
    setScale,
    orientX,
    setOrientX,
    orientY,
    setOrientY,
    opacity,
    setOpacity,
    zIndex,
    setZIndex,
  }

  return (
    <CardContext.Provider value={value}>
      {children}
    </CardContext.Provider>
  );
}