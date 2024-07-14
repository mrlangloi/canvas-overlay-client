import React, { createContext, useState } from 'react';

export const CardListContext = createContext();

export function CardListContextProvider({children}) {

  const [listOfIds, setListOfIds] = useState(new Array(5).fill(false))
  const [listOfCards, setListOfCards] = useState([])

  return (
    <CardListContext.Provider value={{listOfCards, setListOfCards, listOfIds, setListOfIds}}>
      {children}
    </CardListContext.Provider>
  );
}