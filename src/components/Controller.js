import React, { useContext } from 'react';
import { CardListContext } from '../contexts/CardListContext';
import MediaObj from '../models/MediaObj';
import Layers from './Layers';
import MediaControls from './MediaControls';

// sidebar to adjust the properties of current media card

/**
 * I need to change a lot of things in MediaControls
 * specifically, instead of updating the properties of the activeElement
 * I need to update the properties of the media card object
 * that is stored in the list of media cards
 * then I need to link the media card properties to the styles
 * of the corresponding element so that the changes can be seen
 */

function Controller() {

  const { listOfCards, setListOfCards } = useContext(CardListContext);

  function handleCreateCard() {
    const newCard = new MediaObj(listOfCards.length + 1);
    setListOfCards([...listOfCards, newCard])
  }

  return (
    <div className="controller">
      <h1>Main Control</h1>

      <button onClick={handleCreateCard}>+ Create</button>

      <Layers />

      <MediaControls />

    </div>
  )
}

export default Controller;