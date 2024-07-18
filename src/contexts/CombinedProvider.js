import React from 'react';
import { CardContextProvider } from './CardContext';
import { CardListContextProvider } from './CardListContext';
import { SocketContextProvider } from './SocketContext';

// combines all the contexts into one provider

const CombinedProvider = ({ children }) => {
  return (
    <SocketContextProvider>
      <CardListContextProvider>
        <CardContextProvider>
          {children}
        </CardContextProvider>
      </CardListContextProvider>
    </SocketContextProvider>
  );
}

export default CombinedProvider;