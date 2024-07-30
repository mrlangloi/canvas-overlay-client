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
      <SocketContextProvider>
        <CardListContextProvider>
          <CardContextProvider>
            <StreamContextProvider>
              {children}
            </StreamContextProvider>
          </CardContextProvider>
        </CardListContextProvider>
      </SocketContextProvider>
    </UserContextProvider>
  );
}

export default CombinedProvider;