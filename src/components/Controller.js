import React, { useContext } from 'react';
import { CardContext } from '../contexts/CardContext';
import { CardListContext } from '../contexts/CardListContext';
import MediaObj from '../models/MediaObj';
import Layers from './Layers';
import MediaControls from './MediaControls';

// sidebar to adjust the properties of current media card

function Controller() {

  const { listOfCards, setListOfCards, listOfIds, setListOfIds } = useContext(CardListContext)
  const { activeElement } = useContext(CardContext)

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
      console.log(listOfIds)
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
    console.log(listOfIds)
  }

  return (
    <div className="controller">
      <h1>Main Control</h1>

      <div className="flex-row">
        <button className="button" onMouseUp={handleCreateCard}>+ Create</button>
        <button className="button" onMouseUp={handleDelete}>- Delete</button>
      </div>

      <Layers />

      <MediaControls />

    </div>
  )
}

export default Controller;