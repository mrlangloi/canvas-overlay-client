import React, { createContext, useRef } from 'react';

export const CardListContext = createContext();

export function CardListContextProvider({children}) {

  const listOfCards = useRef([])

  function addToList(element) {
    if (element && !listOfCards.current.includes(element)) {

      listOfCards.current.push(element)
    }
  }

  function removeFromList(element) {
    if (element && listOfCards.current.includes(element)) {
      const index = listOfCards.current.indexOf(element)
      listOfCards.current.splice(index, 1)
    }
  }

  return (
    <CardListContext.Provider value={{listOfCards, addToList}}>
      {children}
    </CardListContext.Provider>
  );
}