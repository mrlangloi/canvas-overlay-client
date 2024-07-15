import React, { useContext, useEffect, useRef, useState } from 'react';
import { CardContext } from '../contexts/CardContext';

function Layer(props) {

  const { activeElement, setActiveElement, setIsVisible } = useContext(CardContext);
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

  function handleVisibilityChange(e) {
    if (element.visibility === "hidden") {
      setIsVisible(true);
      element.visibility = "visible";
    }
    else {
      setIsVisible(false);
      element.visibility = "hidden";
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
      <i className={ element.visibility === "visible" ? "fa fa-eye" : "fa fa-eye-slash" } onClick={handleVisibilityChange} />
    </div>
  )
}

export default Layer;