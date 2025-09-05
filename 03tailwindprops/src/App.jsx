import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  const myArr= [1,2,3];
  const gamer = {
    class: "Swordsmen",
    power: "90",
    stealth: "50",
    damage: "25",
    warfare: "dual"
  }

  return (
    <>
      <h1 className='bg-green-300 text-black p-4 rounded-3xl'>Tailwind</h1>
      <Card userName = 'JohnWick' ObjComponent = {myArr} gamer = {gamer}/>
    </>
  )
}

export default App
