import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Header () {
  const { currentUser } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  // we take the search term entered by the user and we add it as a parameter in the url;
  // we then redirect the user to the corresponding search page:
  const handleSubmit = (e) => {
    e.preventDefault()
    // 'URLSearchParams': method to get the info from the query
    const urlParams = new URLSearchParams(window.location.search) // we get the searchTerm inside the url
    urlParams.set('searchTerm', searchTerm) // the searchTerm parameter is set with the value of the current searchTerm state, which comes from the input search field
    const searchQuery = urlParams.toString() // we convert the url parameters to a query string
    navigate(`/search?${searchQuery}`) // we redirect the user to the new url that includes the search term
    // to navigate the user inside this url
  }

  // we make sure that the searchTerm state variable is synchronized with the searchTerm parameter in the url:
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search) // location.search is the query string portion of the url
    const searchTermFromUrl = urlParams.get('searchTerm') // we get the search term parameter from the query string
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl) // we update the component's local state with the retrieved search term.
    }
  }, [location.search])

  return (
    <header>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap font-font-four'>
            <span className='text-emerald-950'>Luxury</span>
            <span>Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='p-3 flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-emerald-950' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-emerald-950 transition hover:underline hover:text-teal-800 duration-500 ease-in'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-emerald-950 hover:underline hover:text-teal-800 duration-700 ease-in'>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser
              ? (
                <img
                  className='rounded-full h-7 w-7 object-cover'
                  src={currentUser.avatar}
                  alt='profile'
                />
                )
              : (<li className='text-emerald-950 hover:underline hover:text-teal-800 duration-700 ease-in'>Sign In</li>)}
          </Link>
          <li />

        </ul>
      </div>
    </header>
  )
}
