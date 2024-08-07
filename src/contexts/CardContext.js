import React, { createContext, useContext, useEffect, useState } from 'react';
import { getMediaCards } from '../utils/apiHandles';
import { SocketContext } from './SocketContext';

// stores the list of cards and their available ids

export const CardContext = createContext();

export function CardContextProvider({ children }) {

  const { socket } = useContext(SocketContext);

  const [listOfIds, setListOfIds] = useState(new Array(100).fill(false));
  const [listOfCards, setListOfCards] = useState([]);

  const [activeElement, setActiveElement] = useState(null);
  const [cardState, setCardState] = useState({
    name: "",
    visibility: "hidden",
    src: "",
    text: "",
    fontSize: "16",
    width: "-1",
    height: "-1",
    rotation: "0",
    opacity: "100",
    zIndex: "0",
  });
  const [cardPosition, setCardPosition] = useState({ 
    posX: "0", 
    posY: "0" 
  }); // for the draggable card feature in MediaCard

  const values = {
    listOfCards,
    setListOfCards,
    listOfIds,
    setListOfIds,
    activeElement,
    setActiveElement,
    cardState,
    setCardState,
    cardPosition,
    setCardPosition,
  };

  useEffect(() => {
    if (!activeElement) return;

    setCardState({
      name: activeElement.name,
      visibility: activeElement.visibility,
      src: activeElement.src,
      text: activeElement.text,
      fontSize: activeElement.fontSize,
      width: activeElement.width,
      height: activeElement.height,
      rotation: activeElement.rotation,
      orientX: activeElement.orientX,
      orientY: activeElement.orientY,
      opacity: activeElement.opacity,
      zIndex: activeElement.zIndex,
    });

    setCardPosition({
      posX: activeElement.posX,
      posY: activeElement.posY,
    });

  }, [activeElement, setCardState])

  // updates the card with the new data
  // since there are too many variables to update, we just replace the card instead
  const updateCard = (card) => {
    setListOfCards((prev) => {
      const cardIndex = prev.findIndex((element) => element.id === card.id);
      if (cardIndex !== -1) {
        const updatedCards = [...prev];
        updatedCards[cardIndex] = card;
        return updatedCards;
      };
      return prev;
    })
  };

  // creates a new card
  const createCard = (card) => {
    setListOfCards((prev) => [...prev, card]);
    setListOfIds((prevId) => {
      const updatedIds = [...prevId];
      updatedIds[card.id] = true;
      return updatedIds;
    });
  };

  // deletes a card
  const deleteCard = (id) => {
    setListOfCards((prev) => prev.filter((element) => element.id !== id));
    setListOfIds((prevId) => {
      const updatedIds = [...prevId];
      updatedIds[id] = false;
      return updatedIds;
    });
  };

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
  }, [socket]);


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
    <CardContext.Provider value={ values }>
      {children}
    </CardContext.Provider>
  );
}