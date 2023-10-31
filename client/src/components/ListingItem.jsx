import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

export default function ListingItem ({ listing }) {
  return (
    <div className='bg-gray-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-sm w-full sm:w-[350px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.hubspot.com%2Fsales%2Freal-estate-business&psig=AOvVaw3Pmi8EYB-S_Fe8mmYm1TAj&ust=1698849917033000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMDL6KfDoIIDFQAAAAAdAAAAABAI'}
          alt={listing.name}
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transiton-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-md font-semibold text-teal-950'>{listing.name}</p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='text-emerald-900 h-4 w-4' />
            <p className='text-sm truncate text-zinc-700 w-full'>{listing.address}</p>
          </div>
          <p className='text-sm text-zinc-800 line-clamp-2'>{listing.description}</p>

          <p className='text-zinc-700 mt-2 font-semibold'>
            £
            {listing.offer ? listing.discountPrice.toLocaleString('en-GB') : listing.regularPrice.toLocaleString('en-GB')}

            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-zinc-950 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
