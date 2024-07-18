import React, { createContext, useContext, useEffect, useState } from 'react';
import { SocketContext } from './SocketContext';

export const CardListContext = createContext();

export function CardListContextProvider({ children }) {

  const { socket } = useContext(SocketContext);

  const [listOfIds, setListOfIds] = useState(new Array(20).fill(false));
  const [listOfCards, setListOfCards] = useState([]);

  useEffect(() => {
    if (socket) {

      socket.on('updateCard', (card) => {

        const cardIndex = listOfCards.findIndex((element) => element.id === card.id);

        const updatedCards = listOfCards.map((element, index) => {
          if (index === cardIndex) {
            return card;
          }
          return element;
        });

        setListOfCards(updatedCards);
      });

      socket.on('createCard', (card) => {

        console.log(card.name)

        const updatedCards = [...listOfCards, card];

        setListOfCards(updatedCards);

        setListOfIds((prev) => {
          const updatedIds = [...prev];
          updatedIds[card.id] = true;
          return updatedIds;
        });

      });

      socket.on('deleteCard', (id) => {

        const updatedCards = listOfCards.filter((element) => element.id !== id);

        setListOfCards(updatedCards);

        setListOfIds((prev) => {
          const updatedIds = [...prev];
          updatedIds[id] = false;
          return updatedIds;
        });

      });
    }
  }, [socket, listOfCards]);

  return (
    <CardListContext.Provider value={{ listOfCards, setListOfCards, listOfIds, setListOfIds }}>
      {children}
    </CardListContext.Provider>
  );
}