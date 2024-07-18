import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

const socket = io.connect('http://localhost:8080');

export function SocketContextProvider({ children }) {

  const [data, setData] = useState(null);

  useEffect(() => {

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('data', (data) => {
      setData(data);
    })

    socket.on('message', (message) => {
      alert(message);
    })


  }, []);

  const emitEvent = (event, data) => {
    socket.emit(event, data);
  };

  return (
    <SocketContext.Provider value={{ socket, data, emitEvent }}>
      {children}
    </SocketContext.Provider>
  );


}