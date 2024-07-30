import React, { createContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

// establishes socket connection with server

export const SocketContext = createContext()

const socket = io.connect(`${process.env.REACT_APP_API_URL}`)

export function SocketContextProvider({ children }) {

  const [positions, setPositions] = useState({})

  useEffect(() => {

    socket.on('connect', () => {
      console.log('connected to overlay server')
    })

    socket.on('cursorMove', ({ id, position }) => {
      setPositions((prevPositions) => ({ ...prevPositions, [id]: position }))
    })

    socket.on('clientDisconnected', ({ id }) => {
      setPositions((prevPositions) => {
        const newPositions = { ...prevPositions }
        delete newPositions[id]
        return newPositions
      })
    })

    return () => {
      socket.off('connect')
      socket.off('cursorMove')
      socket.off('clientDisconnected')
    }
  }, [])

  const emitEvent = (event, data) => {
    socket.emit(event, data)
  }

  return (
    <SocketContext.Provider value={{ socket, positions, emitEvent }}>
      {children}
    </SocketContext.Provider>
  )


}