import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import { useSelector } from 'react-redux'
import 'swiper/css/bundle'
import {
  FaShare,
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking
} from 'react-icons/fa'
import Contact from '../components/Contact'

export default function Listing () {
  SwiperCore.use([Navigation])

  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [contact, setContact] = useState(false)
  const params = useParams()
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await res.json()
        if (data.success === false) {
          setError(true)
          setLoading(false)
          return
        }
        setListing(data)
        setLoading(false)
        setError(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchListing()
  }, [params.listingId])

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}

      {listing && !error && !loading && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550] min-h-[50%] !important'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                    minHeight: '550px'
                  }}
                >
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setCopied(true)
                setTimeout(() => {
                  setCopied(false)
                }, 2000)
              }}
            />
          </div>

          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}

          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - £{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-GB')
                : listing.regularPrice.toLocaleString('en-GB')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-teal-800' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-amber-600 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-emerlad-600 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <ul className=' text-stone-800 font-semibold text-sm flex items-center flex-wrap gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg text-stone-900' />
                {listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms ` : `${listing.bedrooms} bedroom`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBath className='text-lg text-stone-900' />
                {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms ` : `${listing.bathrooms} bathroom`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg text-stone-900' />
                {listing.parking ? 'Parking spot' : 'No parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg text-stone-900' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>

            </ul>
            <h4 className='mt-2'>
              <span className='font-bold text-black uppercase '>Description</span>
            </h4>
            <p className='text-slate-800'>{listing.description}</p>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-teal-800 text-white rounded-md uppercase hover:opacity-75 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>

        </>
      )}

    </main>
  )
}
