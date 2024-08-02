import React, { useContext, useRef } from 'react'
import { SocketContext } from '../contexts/SocketContext'
import { UserContext } from '../contexts/UserContext'

function MouseDisplay() {

  const { positions } = useContext(SocketContext)
  const { user } = useContext(UserContext)

  const mouseRef = useRef()

  useEffect(() => {
    if (!user) return

    const mouse = mouseRef.current
    mouse.style.display = 'none'

    return () => {
      mouse.style.display = 'block'
    }
  })

  return (
    <>
      <i
        key={id}
        ref={mouseRef}
        className='fa fa-mouse-pointer'
        style={{
          position: 'absolute',
          top: pos.y,
          left: pos.x,
          fontSize: '12px',
          color: 'white',
          zIndex: 1001,
        }}
      >
        <p style={{ fontSize: '10px' }}>{user.display_name}</p>
      </i>
    </>
  )
}

export default MouseDisplay