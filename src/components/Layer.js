import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { CardContext } from '../contexts/CardContext';
import { SocketContext } from '../contexts/SocketContext';
import { updateMediaCard } from '../utils/apiHandles';

// each individual layer in the layers panel

function Layer(props) {

  const { activeElement, setActiveElement, setCardState } = useContext(CardContext);
  const { emitEvent } = useContext(SocketContext);
  const { element } = props;

  const [ isLayerActive, setIsLayerActive ] = useState(false);

  const layerRef = useRef(null);

  function handleLayerClick(e) {
    if (element !== activeElement) {
      setActiveElement(element);
      setIsLayerActive(true);
      layerRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
    }
  }

  function handleVisibilityChange(e) {
    if (element.visibility === "hidden") {
      setCardState((prev) => ({...prev, visibility: "visible"}));
      element.visibility = "visible";
    }
    else {
      setCardState((prev) => ({...prev, visibility: "hidden"}));
      element.visibility = "hidden";
    }
    emitEvent('updateCard', element);
    updateMediaCard(element);
  }

  // for when the cards are clicked on or dragged
  useEffect(() => {
    if (element === activeElement) {
      setIsLayerActive(true);
      layerRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
    }
    else {
      setIsLayerActive(false);
    }
  }, [activeElement, element]);


  return (
    <div className={ isLayerActive ? "layer layer-active" : "layer" } ref={layerRef} onClick={handleLayerClick}>
      {`${element.id} - ${element.name}`}
      <i className={ element.visibility === "visible" ? "fa fa-eye" : "fa fa-eye-slash" } onClick={handleVisibilityChange} />
    </div>
  )
}

export default memo(Layer);