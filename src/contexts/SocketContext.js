import React, { createContext, useEffect } from 'react'
import io from 'socket.io-client'

// establishes socket connection with server

export const SocketContext = createContext()

const env = process.env;
const API_URL = env.REACT_APP_ENV === 'production' ? env.REACT_APP_API_URL : env.REACT_APP_API_URL2;

const socket = io.connect(`${API_URL}`, { withCredentials: true })

export function SocketContextProvider({ children }) {


  useEffect(() => {

    socket.on('connect', () => {
      console.log('connected to overlay server')
    })

    return () => {
      socket.off('connect')
    }
  }, [])

  const emitEvent = (event, data) => {
    socket.emit(event, data)
  }

  return (
    <SocketContext.Provider value={{ socket, emitEvent }}>
      {children}
    </SocketContext.Provider>
  )


}