import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const[length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const[charAllowed, setCharAllowed] = useState(false)
  const[password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+{}:?~`"

    for (let i = 1; i <= length; i++){
     let char = Math.floor(Math.random()* str.length +1)
     pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])


  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-blue-300 bg-gray-800'>
    <h1 className='text-4xl text-blue-200 pb-2 text-center my-3'>Password generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4 text-black'>
    <input type="text"
    value={password}
    className='outline-none w-full py-1 px-3 rounded-lg'
    placeholder='password'
    ref = {passwordRef}
    readOnly
   />
   <button
   onClick={copyPasswordToClipboard}
   className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600 hover:border-[1.5px] hover:border-black rounded-lg ml-2'>copy</button>
   </div>
  
   <div className='flex text-sm gap-x-2'>
    <div className='flex items-centre gap-x-1'>
    <input type="range"
    min={8}
    max={20}
    value={length}
    className='cursor-pointer'
    onChange={(event)=>{setLength(event.target.value)}}
    />
     <label>Length:{length}</label>
    </div>
    <div className='flex items-centre gap-x-1'>
    <input type="checkbox"
    defaultChecked = {numberAllowed}
    id='numberInput'
    onChange={()=>
      setNumberAllowed((prev) => !prev)
    }
    />
    <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className='flex items-center gap-x-1'>
    <input type="checkbox"
    defaultChecked = {charAllowed}
    id = 'charInput'
    onChange={()=>{setCharAllowed((prev)=>!prev)}}
    />
    <label htmlFor="charInput">Characters</label>
    </div>


   </div>
   </div>
    </>
  )
}

export default App
