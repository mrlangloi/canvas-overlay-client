import { throttle } from 'lodash';
import React, { memo, useContext, useEffect } from 'react';
import { SocketContext } from '../contexts/SocketContext';

// displays the mouse cursor and position of other users

function MouseDisplay(props) {

  const { socket, emitEvent } = useContext(SocketContext)
  const { user } = props

  const styles = {
    visibility: user.socketID === socket.id ? 'hidden' : 'show',
    top: user.y,
    left: user.x,
  }

  // throttles the emitEvent function to prevent overloading the server
  const throttleEmitEvent = throttle((data) => {
    emitEvent('cursorMove', { socketID: socket.id, x: data.x, y: data.y });
  }, 17);

  useEffect(() => {
    function handleMouseMove(e) {
      const posX = e.clientX + window.scrollX
      const posY = e.clientY + window.scrollY
      user.x = posX
      user.y = posY
      throttleEmitEvent({ x: posX, y: posY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [user, throttleEmitEvent])

  return (
    <>
      <i
        className='mouseDisplay fa fa-mouse-pointer'
        style={styles}
      >
        <p style={{ fontSize: '10px' }}>{user.display_name}</p>
      </i>
    </>
  )
}

export default memo(MouseDisplay)