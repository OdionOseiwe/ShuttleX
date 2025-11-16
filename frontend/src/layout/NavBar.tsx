import React from 'react'

function NavBar() {
  return (
    <nav className=' flex justify-between bg-black text-white px-20 py-4 fixed w-full z-10'>
      <ol className='flex space-x-2 font-semibold text-l items-center'>
        <li className='text-xl font-light cursor-pointer'>ShuttleX</li>
        <li className='hover:bg-white/10 hover:rounded-full px-4 py-1 cursor-pointer'>Ride</li>
        <li className='hover:bg-white/10 hover:rounded-full px-4 py-1 cursor-pointer'>Drive</li>
        <li className='hover:bg-white/10 hover:rounded-full px-4 py-1 cursor-pointer'>About</li>
      </ol>
      <div className='flex space-x-2'>
        <button className='hover:bg-white/10 hover:rounded-full px-4 py-1 cursor-pointer'>Log in</button>
        <button className='bg-white text-black font-semibold rounded-full px-4 py-1 cursor-pointer'>Sign up</button>
      </div>
    </nav>
  )
}

export default NavBar
