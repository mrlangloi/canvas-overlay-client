import './App.css';
import CanvasOverlay from './components/CanvasOverlay';
import Controller from './components/Controller';
import { CardContextProvider } from './contexts/CardContext';
import { CardListContextProvider } from './contexts/CardListContext';

function App() {

  return (
    <div className="App">
      <div className="container">
      <CardListContextProvider>
        <CardContextProvider>
          <Controller />
          <CanvasOverlay />
        </CardContextProvider>
      </CardListContextProvider>
      </div>
    </div>
  );
}

export default App;
