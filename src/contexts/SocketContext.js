import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();
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



  }, []);

  return (
    <SocketContext.Provider value={{ socket, data }}>
      {children}
    </SocketContext.Provider>
  );


}