import React, { useContext } from 'react'
import { SocketContext } from '../contexts/SocketContext'
import { UserContext } from '../contexts/UserContext'

function MouseDisplay() {

  const { positions } = useContext(SocketContext)
  const { user } = useContext(UserContext)

  const renderedPointers = Object.entries(positions).map(([id, pos]) => (
      <i
        key={id}
        className='fa fa-mouse-pointer'
        style={{
          position: 'absolute',
          top: pos.y,
          left: pos.x,
          fontSize: '12px',
          color: 'white',
          zIndex: 999,
        }}
      >
        <p style={{ fontSize: '10px' }}>{user.display_name}</p>
      </i>
    ))

  return (
    <>
      {renderedPointers}
    </>
  )
}

export default MouseDisplay