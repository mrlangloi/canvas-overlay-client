import React, { createContext, useState } from 'react';

export const CardListContext = createContext();

export function CardListContextProvider({children}) {

  const [listOfCards, setListOfCards] = useState([])

  return (
    <CardListContext.Provider value={{listOfCards, setListOfCards}}>
      {children}
    </CardListContext.Provider>
  );
}