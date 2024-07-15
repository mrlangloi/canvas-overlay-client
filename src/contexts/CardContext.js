import React, { createContext, useState } from 'react';

export const CardContext = createContext();

export function CardContextProvider({children}) {

  const [activeElement, setActiveElement] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/150")
  const [text, setText] = useState("placeholder text")
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(100)
  const [orientX, setOrientX] = useState(1)
  const [orientY, setOrientY] = useState(1)
  const [opacity, setOpacity] = useState(100)
  const [zIndex, setZIndex] = useState(0)

  const value = {
    activeElement,
    setActiveElement,
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