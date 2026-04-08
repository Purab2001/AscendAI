import React, { useEffect, useState } from 'react'
import { Gem, Sparkles } from 'lucide-react'
import { Protect } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)

  const { getToken } = useAuth()

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
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

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className='h-full overflow-y-scroll p-6 sm:p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Dashboard</h1>
        <p className='text-gray-600'>Overview of your creative work</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>

        {/* Total Creations Card */}
        <div className='flex justify-between items-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg hover:shadow-primary/5 transition-all'>
          <div className='text-gray-700'>
            <p className='text-sm text-gray-600 font-medium mb-1'>Total Creations</p>
            <h2 className='text-3xl font-bold text-gray-900'>{creations.length}</h2>
          </div>
          <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex justify-center items-center shadow-lg shadow-primary/20'>
            <Sparkles className='w-7 h-7 text-white' />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className='flex justify-between items-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg hover:shadow-purple-500/5 transition-all'>
          <div className='text-gray-700'>
            <p className='text-sm text-gray-600 font-medium mb-1'>Active Plan</p>
            <h2 className='text-3xl font-bold text-gray-900'>
              <Protect plan='pro' fallback='Free'>Pro</Protect>
            </h2>
          </div>
          <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex justify-center items-center shadow-lg shadow-purple-500/20'>
            <Gem className='w-7 h-7 text-white' />
          </div>
        </div>

      </div>
      {
        loading ? (
          <div className='flex justify-center items-center h-96'>
            <div className='animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent'></div>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-semibold text-gray-900'>Recent Creations</h2>
              <span className='text-sm text-gray-600'>{creations.length} total</span>
            </div>
            {
              creations.length > 0 ? (
                creations.map((item) => <CreationItem key={item.id} item={item} />)
              ) : (
                <div className='bg-white rounded-2xl border border-gray-200 p-12 text-center'>
                  <Sparkles className='w-12 h-12 text-gray-300 mx-auto mb-4' />
                  <p className='text-gray-600'>No creations yet. Start creating something amazing!</p>
                </div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Dashboard