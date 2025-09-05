import { useState } from 'react';
import './App.css'

function App() {
  //let count = 7;

  let [count, setCount] = useState(7);

  const addValue = () =>{
    if(count < 20) count++;
    setCount(count);
  }

  const remValue = () =>{
    if(count>0) count--;
    setCount(count);
  }
  return (
    
    <>
      <h1>Hello React</h1>
      <h3>Counter value: {count}</h3>

      <button onClick={addValue}>Add Value: {count}</button>
      <br/>
      <button onClick={remValue}>Remove value: {count}</button>
    </>
  )
}

export default App
