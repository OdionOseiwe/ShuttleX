
function NavBar() {
  return (
    <nav className=' flex justify-between bg-black text-white md:px-20 px-10 py-4 fixed w-full z-10'>
      <ol className='flex space-x-2 font-semibold text-l items-center'>
        <li className='w-50 cursor-pointer'>
          <img src="https://aauekpoma.edu.ng/wp-content/themes/aaue/assets/images/logo.png" alt="AAU logo" />
        </li>
        <li className=' md:block hidden hover:bg-white/10 hover:rounded-full px-4 py-1 cursor-pointer'>Ride</li>
        <li className=' md:block hidden hover:bg-white/10 hover:rounded-full px-4 py-1 cursor-pointer'>Drive</li>
        <li className=' md:block hidden hover:bg-white/10 hover:rounded-full px-4 py-1 cursor-pointer'>About</li>
      </ol>
      <div className='md:flex items-center hidden space-x-2'>
        <a href="/login" className='hover:bg-white/10 hover:rounded-full px-4 py-1 cursor-pointer'>Log in</a>
        <a href="/signup" className='bg-white text-black font-semibold rounded-full px-4 py-1 cursor-pointer'>Sign up</a>
      </div>
    </nav>
  )
}

export default NavBar
