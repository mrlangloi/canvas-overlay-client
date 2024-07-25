import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// establishes socket connection with server

export const SocketContext = createContext();

const socket = io.connect("https://rkkmru.ddns.net");

export function SocketContextProvider({ children }) {

  const [data, setData] = useState(null);

  useEffect(() => {

    socket.on('connect', () => {
      console.log('connected')
    })

    // test event
    socket.on('data', (data) => {
      setData(data);
    })

    // another test event
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