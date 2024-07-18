import React, { useContext } from 'react';
import { CardContext } from '../contexts/CardContext';
import { CardListContext } from '../contexts/CardListContext';
import { SocketContext } from '../contexts/SocketContext';
import MediaObj from '../models/MediaObj';
import Layer from './Layer';

function Layers(props) {

  const { listOfCards, setListOfCards, listOfIds, setListOfIds } = useContext(CardListContext)
  const { activeElement, setActiveElement } = useContext(CardContext)
  const { emitEvent } = useContext(SocketContext)

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

  function handleCreateCard() {
    // if listOfIds contain a false value, then create a new card using its index as the id
    const index = listOfIds.indexOf(false)
    if (index !== -1) {
      setListOfIds(prevList => {
        const newList = [...prevList]
        newList[index] = true
        return newList
      })
      const newCard = new MediaObj(index)
      setListOfCards([...listOfCards, newCard])
      setActiveElement(newCard)
      emitEvent('createCard', newCard)
    }
  }

  function handleDelete() {

    if (listOfCards.length === 0 || !activeElement) return;

    // remove the card from the list of cards and update listOfIds
    const id = activeElement.id
    setListOfIds(prevList => {
      const newList = [...prevList]
      newList[id] = false
      return newList
    })
    const newListOfCards = listOfCards.filter(element => element.id !== id)
    setListOfCards(newListOfCards)
    setActiveElement(newListOfCards.length > 0 ? newListOfCards[newListOfCards.length - 1] : null)
    emitEvent('deleteCard', id)
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

      <div className="layers-header">
        <p>Layers</p>
        <div className="flex-row">
          <i className="fa fa-plus" id="create-card-button" onClick={handleCreateCard} />
          <i className="fa fa-trash" id="delete-card-button" onClick={handleDelete} />
        </div>
      </div>

      <div className="layers-body">
        {layers}
      </div>
    </div>
  )
}

export default Layers;