import React, { useContext } from 'react';
import { CardListContext } from '../contexts/CardListContext';
import MediaCard from './MediaCard';

function CanvasOverlay() {

  const { listOfCards, addToList } = useContext(CardListContext);



  return (
    <div className="canvas-overlay">
      <MediaCard
        id={1}
      />

      <MediaCard
        id={2}
      />
    </div>
  )
}

export default CanvasOverlay;