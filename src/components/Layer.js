import React, { useContext, useEffect, useRef, useState } from 'react';
import { CardContext } from '../contexts/CardContext';

function Layer(props) {

  const { activeElement, setActiveElement } = useContext(CardContext);
  const { element } = props;

  const [ isActive, setIsActive ] = useState(false);

  const layerRef = useRef(null);

  function handleLayerClick(e) {
    if (element !== activeElement) {
      setActiveElement(element);
      setIsActive(true);
      layerRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
    }
  }

  // for when the cards are clicked on or dragged
  useEffect(() => {
    if (element === activeElement) {
      setIsActive(true);
      layerRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
    }
    else {
      setIsActive(false);
    }
  }, [activeElement, element]);


  return (
    <div className={ isActive ? "layer layer-active" : "layer" } ref={layerRef} onClick={handleLayerClick}>
      {`${element.id} - ${element.name}`}
    </div>
  )
}

export default Layer;