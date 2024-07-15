import React, { useContext, useEffect, useState } from 'react';
import { CardContext } from '../contexts/CardContext';

function Layer(props) {

  const { activeElement, setActiveElement } = useContext(CardContext);
  const { element } = props;

  const [ isActive, setIsActive ] = useState(false);

  function handleLayerClick(e) {
    if (element !== activeElement) {
      setActiveElement(element);
      setIsActive(true);
    }
  }

  // for when the cards are clicked on or dragged
  useEffect(() => {
    if (element === activeElement) {
      setIsActive(true);
    }
    else {
      setIsActive(false);
    }
  }, [activeElement, element]);


  return (
    <div className={ isActive ? "layer layer-active" : "layer" } onClick={handleLayerClick}>
      {`${element.name}`}
    </div>
  )
}

export default Layer;