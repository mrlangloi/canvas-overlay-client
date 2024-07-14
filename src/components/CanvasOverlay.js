import React, { useContext, useEffect } from 'react';
import { CardListContext } from '../contexts/CardListContext';
import MediaObj from '../models/MediaObj';
import MediaCard from './MediaCard';

function CanvasOverlay() {

  const { listOfCards, setListOfCards, listOfIds, setListOfIds } = useContext(CardListContext);

  useEffect(() => {
    // create 3 media cards when the app first loads to test the functionality
    if (listOfCards.length === 0) {
      setListOfIds(prevList => {
        const newList = [...prevList];
        newList[0] = newList[1] = newList[2] = true;
        return newList;
      })
      setListOfCards([new MediaObj(0), new MediaObj(1), new MediaObj(2)])
    }
  }, [])
  

  const cards = listOfCards.map((element, index) => {
    return (
      <MediaCard
        key={index}
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