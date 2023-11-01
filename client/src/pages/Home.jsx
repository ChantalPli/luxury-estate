import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import coverImage from '../assets/coverImage.jpg'
import coverImage2 from '../assets/coverImage2.jpeg'
import coverImage3 from '../assets/coverImage3.webp'
import coverImage7 from '../assets/coverImage7.jpeg'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListingItem from '../components/ListingItem'

export default function Home () {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  console.log(saleListings)

  SwiperCore.use([Navigation])

  const images = [
    coverImage,
    coverImage2,
    coverImage3,
    coverImage7
  ]

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json()
        setOfferListings(data)
        fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOfferListings()
  }, [])

  return (
    <div>

      <Swiper
        className=' flex object-scale-down'
        navigation
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className='bg-cover'>

            <div
              className='carousel-slide bg-center bg-cover object-center'
              style={{
                backgroundImage: `linear-gradient(180deg,rgba(0,0,0,.7) 0, rgba(0,0,0,.2) 48.44%, rgba(0,0,0,.7) 100%),url(${image})`,
                backgroundSize: 'cover',
                width: '100%',
                height: '600px',
                backgroundPosition: 'center'
              }}
            >
              <div className='flex flex-col gap-6 pt-80 pl-7 sm:pt-96 md:pt-[400px] sm:pl-20 max-w-6xl text-slate-50'>
                <h1 className='font-bold text-3xl lg:text-6xl sm:text-4xl'>
                  The World's
                  <br />
                  Luxury Marketplace
                </h1>
              </div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* // LISTING RESULTS: */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 '>
        <div>
          <h1 className='text-4xl text-center px-8 mb-9 mt-8 text-slate-900'>Exceptional properties around the world</h1>
        </div>

        {
        offerListings && offerListings.length > 0 && (
          <div>
            <div className='my-4'>
              <h2 className='text-2xl font-semibold text-gray-900'>Recent Offers</h2>
              <Link className='text-md text-emerald-950 hover:underline' to='/search?offer=true'>See more offers</Link>
            </div>

            <div className='flex flex-wrap gap-4'>
              {
                offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
            </div>

          </div>
        )
        }

        {
        rentListings && rentListings.length > 0 && (
          <div>
            <div className='my-4'>
              <h2 className='text-2xl font-semibold text-gray-900'>Recent places for rent</h2>
              <Link className='text-md text-emerald-950 hover:underline' to='/search?type=rent'>See more places for rent</Link>
            </div>

            <div className='flex flex-wrap gap-4'>
              {
                rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
            </div>

          </div>
        )
        }
        {
        saleListings && saleListings.length > 0 && (
          <div>
            <div className='my-4'>
              <h2 className='text-2xl font-semibold text-gray-900'>Recent places for sale</h2>
              <Link className='text-md text-emerald-950 hover:underline' to='/search?type=sale'>See more places for sale</Link>
            </div>

            <div className='flex flex-wrap gap-4'>
              {
                saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
            </div>

          </div>
        )
        }
      </div>
    </div>
  )
}

// option that works but how to put text above image?
// <div>
//   <Swiper navigation>
//     {/* top */}
//     {images.map((image, index) => (
//       <SwiperSlide key={index}>

//         <img
//           src={image}
//           alt='image cover'
//           style={{ backgroundSize: 'cover', width: '100%', maxHeight: '650px' }}
//         />

//       </SwiperSlide>
//     ))}
//   </Swiper>

//   <div className='flex flex-col gap-6 pt-64 pl-32 max-w-6xl '>
//     <h1 className='font-bold text-3xl lg:text-6xl'>The World's
//       <br />
//       Luxury Marketplace
//     </h1>
//     <div className='text-sm sm:text-base'>
//       Exceptional properties around the world
//     </div>
//   </div>

// </div>

// FIRST option:

/* listing results */

// <div>
//   {/* top */}

//   <div className='flex flex-col gap-6 pt-64 pl-32 max-w-6xl '>
//     <h1 className='font-bold text-3xl lg:text-6xl'>The World's
//       <br />
//       Luxury Marketplace
//     </h1>
//     <div className='text-sm sm:text-base'>
//       Exceptional properties around the world
//     </div>
//   </div>

//   {/* swiper */}

//   {/* listing results */}
// </div>
