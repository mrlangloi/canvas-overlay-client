import './App.css';
import Controller from './components/Controller';
import MediaCard from './components/MediaCard';

function App() {



  return (
    <div className="App">
      <Controller />
      <MediaCard id="1"/>
      <MediaCard id="2"/>
      <MediaCard id="3"/>
    </div>
  );
}

export default App;
