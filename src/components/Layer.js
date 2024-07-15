import React, { useContext } from 'react';
import { CardContext } from '../contexts/CardContext';

function Layer(props) {

  const { setActiveElement } = useContext(CardContext);
  const { element } = props;

  function handleLayerClick(e) {
    setActiveElement(element);
  
  }


  return (
    <div className="layer" onClick={handleLayerClick}>
      {`${element.name}`}
    </div>
  )
}

export default Layer;