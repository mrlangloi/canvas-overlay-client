import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getMediaCards } from '../utils/apiHandles';
import { SocketContext } from './SocketContext';

// stores the list of cards and their available ids

export const CardListContext = createContext();

export function CardListContextProvider({ children }) {

  const { socket } = useContext(SocketContext);

  const [listOfIds, setListOfIds] = useState(new Array(20).fill(false));
  const [listOfCards, setListOfCards] = useState([]);

  // updates the card with the new data
  // since there are too many variables to update, we just replace the card instead
  const updateCard = useCallback((card) => {
    setListOfCards((prev) => {
      const cardIndex = prev.findIndex((element) => element.id === card.id);
      if (cardIndex !== -1) {
        const updatedCards = [...prev];
        updatedCards[cardIndex] = card;
        return updatedCards;
      }
      return prev;
    });
  }, []);

  // creates a new card
  const createCard = useCallback((card) => {
    setListOfCards((prev) => [...prev, card]);
    setListOfIds((prevId) => {
      const updatedIds = [...prevId];
      updatedIds[card.id] = true;
      return updatedIds;
    });
  }, []);

  // deletes a card
  const deleteCard = useCallback((id) => {
    setListOfCards((prev) => prev.filter((element) => element.id !== id));
    setListOfIds((prevId) => {
      const updatedIds = [...prevId];
      updatedIds[id] = false;
      return updatedIds;
    });
  }, []);





  useEffect(() => {
    if (socket) {
      socket.on('updateCard', updateCard);
      socket.on('createCard', createCard);
      socket.on('deleteCard', deleteCard);

      return () => {
        if (socket) {
          socket.off('updateCard', updateCard);
          socket.off('createCard', createCard);
          socket.off('deleteCard', deleteCard);
        }
      };
    }
  }, [socket, updateCard, createCard, deleteCard]);


  // on mount, fetch the media cards and update the list of cards and ids
  useEffect(() => {
    async function fetchMediaCards() {
      try {
        const cards = await getMediaCards();
        setListOfCards(cards);
        setListOfIds((prev) => {
          const updatedIds = [...prev];
          cards.forEach((card) => {
            updatedIds[card.id] = true;
          });
          return updatedIds;
        });
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchMediaCards();
  }, []);

  return (
    <CardListContext.Provider value={{ listOfCards, setListOfCards, listOfIds, setListOfIds }}>
      {children}
    </CardListContext.Provider>
  );
}