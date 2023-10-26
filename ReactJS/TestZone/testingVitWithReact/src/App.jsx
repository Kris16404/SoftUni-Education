import { useState } from 'react';
import TestComponent from './components/TestComponent.jsx';
import './App.css';

function App() {
  const [click, setClick] = useState(0);

  function addClick() {
    setClick(click + 1);
  }

  return (
    <div>
      <h1>Hello, first timer here</h1>
      <TestComponent />
      <button onClick={addClick}>Clicked {click} Times</button>
    </div>
  );
}

export default App;
