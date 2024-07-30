import React, { createContext, useEffect, useState } from 'react';

// stores the active card element and its properties

export const CardContext = createContext();

export function CardContextProvider({children}) {

  const [activeElement, setActiveElement] = useState(null);

  const [cardState, setCardState] = useState({
    name: "",
    visibility: "hidden",
    src: "",
    text: "",
    fontSize: "16",
    posX: "0",
    posY: "0",
    width: "-1",
    height: "-1",
    rotation: "0",
    opacity: "100",
    zIndex: "0",
  });

  useEffect(() => {
    if (!activeElement) return

    setCardState({
      name: activeElement.name,
      visibility: activeElement.visibility,
      src: activeElement.src,
      text: activeElement.text,
      fontSize: activeElement.fontSize,
      posX: activeElement.posX,
      posY: activeElement.posY,
      width: activeElement.width,
      height: activeElement.height,
      rotation: activeElement.rotation,
      orientX: activeElement.orientX,
      orientY: activeElement.orientY,
      opacity: activeElement.opacity,
      zIndex: activeElement.zIndex,
    });

  }, [activeElement, setCardState])

  const value = {
    activeElement,
    setActiveElement,
    cardState,
    setCardState,
  };

  return (
    <CardContext.Provider value={value}>
      {children}
    </CardContext.Provider>
  );
}