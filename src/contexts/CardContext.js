import React, { createContext, useState } from 'react';

// stores the active card element and its properties

// all properties are state variables so that the page renders with each update

// i might separate out text and image into separate objects and contexts later

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