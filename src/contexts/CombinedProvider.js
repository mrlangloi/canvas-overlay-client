import React from 'react';
import { CardContextProvider } from './CardContext';
import { SocketContextProvider } from './SocketContext';
import { UserContextProvider } from './UserContext';

// combines all the contexts into one provider

const CombinedProvider = ({ children }) => {
  return (
    <SocketContextProvider>
      <UserContextProvider>
        <CardContextProvider>
          {children}
        </CardContextProvider>
      </UserContextProvider>
    </SocketContextProvider>
  );
}

export default CombinedProvider;