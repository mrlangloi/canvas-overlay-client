import React, { useContext } from 'react';
import { CardListContext } from '../contexts/CardListContext';
import MediaCard from './MediaCard';
import TwitchEmbed from './TwitchEmbed';

function CanvasOverlay() {

  const { listOfCards } = useContext(CardListContext);

  const cards = listOfCards?.map((element, index) => {
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
      <TwitchEmbed />
    </div>
  )
}

export default CanvasOverlay;