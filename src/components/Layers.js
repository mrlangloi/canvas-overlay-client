import React from 'react';
import Layer from './Layer';

function Layers(props) {

  const { setActiveElement, listOfRefs } = props;

  if (listOfRefs.current.length === 0) {
    return (
      <div className="layers">
        <div className="layers-header">
          <p>Layers</p>
        </div>
        <div className="layers-body">
          <p>No layers</p>
        </div>
      </div>
    )
  }

  const layers = listOfRefs.current.map((element, index) => {
    return (
      <Layer 
        key={index}
        setActiveElement={setActiveElement}
        element={element}
      />
    )
  })

  return (
    <div className="layers">
      <div className="layers-header">
        <p>Layers</p>
      </div>
      <div className="layers-body">
          {layers}
      </div>
    </div>
  )
}

export default Layers;