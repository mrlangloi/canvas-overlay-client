import React, { useContext, useEffect } from 'react';
import { CardListContext } from '../contexts/CardListContext';
import MediaObj from '../models/MediaObj';
import MediaCard from './MediaCard';

function CanvasOverlay() {

  const { listOfCards, setListOfCards } = useContext(CardListContext);

  useEffect(() => {
    if (listOfCards.length === 0) {
      setListOfCards([new MediaObj(1), new MediaObj(2), new MediaObj(3)])
    }
  }, [listOfCards.length, setListOfCards])
  

  const cards = listOfCards.map((element, index) => {
    return (
      <MediaCard
        key={index}
        id={index}
        element={element}
      />
    )
  })

  return (
    <div className="canvas-overlay">
      {cards}
    </div>
  )
}

export default CanvasOverlay;