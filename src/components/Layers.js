import React from 'react';
import Layer from './Layer';

function Layers(props) {

  const { setActiveElement } = props;

  return (
    <div className="layers">
      <div className="layers-header">
        <p>Layers</p>
      </div>
      <div className="layers-body">
          <Layer setActiveElement={setActiveElement} />
      </div>
    </div>
  )
}

export default Layers;