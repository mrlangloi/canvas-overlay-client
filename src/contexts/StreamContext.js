import React, { createContext, useState } from 'react';

// stores the states of the twitch stream

export const StreamContext = createContext();


export function StreamContextProvider({ children }) {

  const [muted, setMuted] = useState(true);
  const [showChat, setShowChat] = useState(false); // might implement this later
  const [streamZIndex, setStreamZIndex] = useState(-1); 

  const value = {
    muted,
    setMuted,
    showChat,
    setShowChat,
    streamZIndex,
    setStreamZIndex,
  };

  return (
    <StreamContext.Provider value={value}>
      {children}
    </StreamContext.Provider>
  );


}