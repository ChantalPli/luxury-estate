import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

export default function SignUp () {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value
      }
    )
  }
  // PROXY:
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      console.log(formData)
      const res = await fetch('/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        })
      const data = await res.json()
      if (data.success === false) {
        setLoading(false)
        setError(data.message)
        return
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
    } catch {
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-sm'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-sm'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-sm'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-[#006b75] text-white p-3 rounded-sm hover:opacity-95 disabled:opacity-80 uppercase'
        >
          {loading ? 'Loading...' : 'Sign up'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-amber-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}
