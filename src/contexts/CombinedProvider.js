import React from 'react';
import { CardContextProvider } from './CardContext';
import { CardListContextProvider } from './CardListContext';
import { SocketContextProvider } from './SocketContext';
import { StreamContextProvider } from './StreamContext';
import { UserContextProvider } from './UserContext';

// combines all the contexts into one provider

const CombinedProvider = ({ children }) => {
  return (
    <UserContextProvider>
      <StreamContextProvider>
        <SocketContextProvider>
          <CardListContextProvider>
            <CardContextProvider>
              {children}
            </CardContextProvider>
          </CardListContextProvider>
        </SocketContextProvider>
      </StreamContextProvider>
    </UserContextProvider>
  );
}

export default CombinedProvider;