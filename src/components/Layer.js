import React from 'react';

function Layer(props) {

  const { setActiveElement, element } = props;

  function handleLayerClick(e) {
    setActiveElement(element);
  
  }


  return (
    <div className="layer" onClick={handleLayerClick}>
      {element.id}
    </div>
  )
}

export default Layer;