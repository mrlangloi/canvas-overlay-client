import React, { useContext } from 'react';
import { CardContext } from '../contexts/CardContext';
import { CardListContext } from '../contexts/CardListContext';
import Layer from './Layer';

function Layers(props) {

  const { setActiveElement } = useContext(CardContext);
  const { listOfCards } = useContext(CardListContext);

  if (listOfCards.length === 0) {
    return (
      <div className="layers">
        <p>Layers</p>
        <div className="layers-body">
          <p>No layers</p>
        </div>
      </div>
    )
  }

  const layers = listOfCards.map((element, index) => {
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
      <p>Layers</p>
      <div className="layers-body">
          {layers}
      </div>
    </div>
  )
}

export default Layers;