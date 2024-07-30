import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../contexts/SocketContext'
import { UserContext } from '../contexts/UserContext'

function MouseTracker() {

  const { emitEvent } = useContext(SocketContext)
  const { authorized } = useContext(UserContext)

  useEffect(() => {

    if (!authorized) return

    const handleMouseMove = (event) => {
      const position = { x: event.clientX, y: event.clientY }
      emitEvent('cursorMove', position)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [emitEvent, authorized])

  return (
    <></>
  )
}

export default MouseTracker