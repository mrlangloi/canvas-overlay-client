import React, { useContext } from 'react'
import { CardContext } from '../contexts/CardContext'
import { UserContext } from '../contexts/UserContext'
import MediaCard from './MediaCard'
import MouseDisplay from './MouseDisplay'
import TwitchEmbed from './TwitchEmbed'

// where the magic happens. renders all the cards and users on the screen

function CanvasOverlay() {

  const { listOfCards } = useContext(CardContext)
  const { listOfUsers, authorized } = useContext(UserContext)

  const cards = listOfCards?.map((element, index) => {
    return (
      <MediaCard
        key={index}
        element={element}
      />
    )
  })

  const users = listOfUsers?.map((user, index) => {
    return (
      <MouseDisplay
        key={index}
        user={user}
      />
    )
  })

  return (
    <div className="canvas-overlay">
      {authorized ? users : null}

      {cards}
      <TwitchEmbed />
    </div>
  )
}

export default CanvasOverlay