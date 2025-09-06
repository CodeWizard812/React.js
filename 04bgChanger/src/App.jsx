import { useState } from 'react'
import BgChanger from './BgChanger'


function App() {
  const[bgcolor, setBgColor] = useState("olive");

  const colors = [
    { name: "Red", hex: "#FF0000", text: "#FFFFFF" },
    { name: "Green", hex: "#008000", text: "#FFFFFF" },
    { name: "Blue", hex: "#0000FF", text: "#FFFFFF" },
    { name: "Olive", hex: "#808000", text: "#FFFFFF" },
    { name: "Gray", hex: "#808080", text: "#FFFFFF" },
    { name: "Yellow", hex: "#FFFF00", text: "#000000" },
    { name: "Pink", hex: "#FFC0CB", text: "#000000" },
    { name: "Purple", hex: "#800080", text: "#FFFFFF" },
    { name: "Lavender", hex: "#E6E6FA", text: "#000000" },
    { name: "White", hex: "#FFFFFF", text: "#000000" },
    { name: "Black", hex: "#000000", text: "#FFFFFF" }
  ];

  const handleClick = (hex) =>{
    setBgColor(hex);
  }

  return (
    //No need to use curly braces again as its already inside one
    <div className='w-full h-screen duration-200' style={{backgroundColor: bgcolor}}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'> 
        <div className=' flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-2xl'>
          {/* used to map the colors to color */}
          {colors.map((color) => (
            <button
              key={color.name}
              className='py-1 px-3 rounded-xl'
              style={{
                backgroundColor: color.hex,
                color: color.text,
              }}
              // this is the proper way of passing a variable in function
              onClick={() => handleClick(color.hex)}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
