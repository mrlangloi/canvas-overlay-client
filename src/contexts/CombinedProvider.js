import React from 'react';
import { CardContextProvider } from './CardContext';
import { CardListContextProvider } from './CardListContext';
import { SocketContextProvider } from './SocketContext';
import { StreamContextProvider } from './StreamContext';

// combines all the contexts into one provider

const CombinedProvider = ({ children }) => {
  return (
    <SocketContextProvider>
      <CardListContextProvider>
        <CardContextProvider>
          <StreamContextProvider>
            {children}
          </StreamContextProvider>
        </CardContextProvider>
      </CardListContextProvider>
    </SocketContextProvider>
  );
}

export default CombinedProvider;