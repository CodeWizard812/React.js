import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  //useRef Hook
  const passwordRef = useRef(null)


  //useCallback Hook
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+= []{}~`'"

    for(let i = 1; i<= length; i++){
      let ch = Math.floor((Math.random() * str.length) + 1)

      pass += str.charAt(ch)
    }

    setPassword(pass);

  } , [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    setCopied(true)
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100)//for restricting user from copying more than 100 values using copy button
    window.navigator.clipboard.writeText(password)

    setTimeout(() => setCopied(false), 2000);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='bg-gray-700 rounded-xl w-full max-w-md text-orange-600 mx-auto my-8 px-6 shadow-md'>
        <h1 className='text-xl text-center text-white my-2'>Password Generator</h1>
        <div className='flex shadow-lg overflow-hidden  mb-1'>
          <input 
            type = "text"
            value = {password}
            className='bg-white text-black outline-none w-full py-1 px-2'
            placeholder='Password'
            readOnly
            ref = {passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='bg-orange-500 text-white ml-2 rounded-sm px-2'>{copied ? "✅" : "Copy"}</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type = "range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type = "checkbox"
              defaultChecked={numAllowed}
              id='numInput'
              className='bg-amber-50'
              onChange={() => {setNumAllowed((prev) => !prev) }}
            />
            <label htmlFor='numInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type = "checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              className='bg-amber-50'
              onChange={() => {setCharAllowed((prev) => !prev) }}
            />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
