import React from 'react';
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


    /**
     * create an object to store the media card information
     * set the object's properties to the default state
     * add the object to the list of media cards
     */


  }




  return (
    <div className="controller">
      <h1>Main Control</h1>

      <Layers />

      <MediaControls />

    </div>
  )
}

export default Controller;