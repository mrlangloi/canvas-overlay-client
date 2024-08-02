import React, { useContext } from 'react'
import { CardContext } from '../contexts/CardContext'
import { UserContext } from '../contexts/UserContext'
import MediaCard from './MediaCard'
import TwitchEmbed from './TwitchEmbed'

function CanvasOverlay() {

  const { listOfCards } = useContext(CardContext)
  const { user } = useContext(UserContext)

  const cards = listOfCards?.map((element, index) => {
    return (
      <MediaCard
        key={index}
        element={element}
      />
    )
  })

  return (
    <div className="canvas-overlay">
      {/* {user ?
        <>
          <MouseDisplay />
          <MouseTracker />
        </>
        : null
      } */}

      {cards}
      <TwitchEmbed />
    </div>
  )
}

export default CanvasOverlay