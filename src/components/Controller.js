import React from 'react';
import Layers from './Layers';
import MediaControls from './MediaControls';

// sidebar to adjust the properties of current media card

/**
 * Currently, the media cards are children to the controller
 * therefore, if I set the controller's position as fixed,
 * the media cards will also be fixed.
 * I need to create a separate component for the media cards to
 * be children of so that the controller can be fixed and the
 * media cards can be absolute.
 */

function Controller() {

  const defaultState = {
    id: 0,
    name: "Element",
    text: "placeholder text",
    src: "https://via.placeholder.com/150",
    posX: 0,
    posY: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    zindex: 0
  }

  function createMediaCard() {
    // create a new media card
    // set the media card's properties to the default state
    // add the media card to the list of media cards


  }

  

  // add element to the list of references


  return (
    <div className="controller">
      <h1>Main Control</h1>

      <Layers />

      <MediaControls />

    </div>
  )
}

export default Controller;