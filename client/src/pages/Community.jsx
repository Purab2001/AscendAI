import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Heart, Users } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Community = () => {

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  const { getToken } = useAuth()

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post('/api/user/toggle-like-creation', { id }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        toast.success(data.message)
        await fetchCreations()
      } else {
        toast.success(data.message)
      }
    } catch (error) {
      toast.success(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  return !loading ? (
    <div className='h-full flex flex-col p-6 sm:p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Community Gallery</h1>
        <p className='text-gray-600'>Explore amazing creations from our community</p>
      </div>

      <div className='bg-white h-full rounded-2xl border border-gray-200 overflow-hidden'>
        <div className='h-full overflow-y-scroll p-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {creations.length > 0 ? (
              creations.map((creation, index) => (
                <div key={index} className='relative group overflow-hidden rounded-xl bg-gray-100 aspect-square'>
                  <img
                    src={creation.content}
                    alt={creation.prompt}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />

                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
                    <p className='text-white text-sm mb-3 line-clamp-2'>{creation.prompt}</p>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <Heart
                          onClick={() => imageLikeToggle(creation.id)}
                          className={`w-5 h-5 cursor-pointer transition-all hover:scale-110 ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                        />
                        <span className='text-white text-sm font-medium'>{creation.likes.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Like button visible on mobile */}
                  <div className='absolute bottom-3 right-3 sm:hidden flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5'>
                    <span className='text-white text-xs font-medium'>{creation.likes.length}</span>
                    <Heart
                      onClick={() => imageLikeToggle(creation.id)}
                      className={`w-4 h-4 cursor-pointer ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className='col-span-full flex flex-col items-center justify-center py-20'>
                <Users className='w-16 h-16 text-gray-300 mb-4' />
                <p className='text-gray-600 text-lg font-medium'>No public creations yet</p>
                <p className='text-gray-500 text-sm'>Be the first to share your creation!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>
      <div className='animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent'></div>
    </div>
  )
}

export default Community