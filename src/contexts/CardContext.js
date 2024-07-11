import React, { createContext, useState } from 'react';

export const CardContext = createContext();

export function CardContextProvider({children}) {

  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(100)
  const [opacity, setOpacity] = useState(100)
  const [zIndex, setZIndex] = useState(0)
  const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/150")
  const [text, setText] = useState("placeholder text")
  const [activeElement, setActiveElement] = useState(null)

  const value = {
    posX,
    setPosX,
    posY,
    setPosY,
    rotation,
    setRotation,
    scale,
    setScale,
    opacity,
    setOpacity,
    zIndex,
    setZIndex,
    imgSrc,
    setImgSrc,
    text,
    setText,
    activeElement,
    setActiveElement
  }

  return (
    <CardContext.Provider value={value}>
      {children}
    </CardContext.Provider>
  );
}