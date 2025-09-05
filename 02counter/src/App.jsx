import { useState } from 'react';
import './App.css'

function App() {
  //let count = 7;
  //count++ and count-- operation is not allowed if const is used setCount(count+1) works same.
  const [count, setCount] = useState(7);
  
  const addValue = () =>{
    if(count < 20) ;
    //not necessary to use count can use anything cause mapping is already done.
    //UI will treat all 4 as same  useState send in batches hence count+1 only.
    setCount(count+1);
    setCount(count+1);
    setCount(count+1);
    setCount(count+1);

    //UI will show prevCount + 3 as callback is used
    setCount(prevCount => prevCount+1);
    setCount(prevCount => prevCount+1);
    setCount(prevCount => prevCount+1);
  }

  const remValue = () =>{
    if(count>0) count;
    setCount(count-1);
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
