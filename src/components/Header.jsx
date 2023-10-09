import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header () {
  return (
    <header>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap font-font-four'>
            <span className='text-emerald-950'>Luxury</span>
            <span>Estate</span>
          </h1>
        </Link>
        <form className='p-3 flex items-center'>
          <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
          <FaSearch className='text-emerald-950' />
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-emerald-950 transition hover:underline hover:text-teal-800 duration-500 ease-in'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-emerald-950 hover:underline hover:text-teal-800 duration-700 ease-in'>About</li>
          </Link>
          <Link to='/sign-in'>
            <li className='text-emerald-950 hover:underline hover:text-teal-800 duration-700 ease-in'>Sign In</li>
          </Link>
          <li />

        </ul>
      </div>
    </header>
  )
}
