import React, { useState } from 'react'
import { Sparkles, Image } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const GenerateImages = () => {

  const imageStyle = ['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', 'Realistic style', '3D style', 'Portrait style']

  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

      const { data } = await axios.post('/api/ai/generate-image', { prompt, publish }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className='h-full overflow-y-scroll p-6 sm:p-8'>

      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Generate Images</h1>
        <p className='text-gray-600'>Create stunning AI-generated images</p>
      </div>

      <div className='flex items-start flex-wrap gap-6 text-gray-700'>
        {/* Left col */}
        <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-white rounded-2xl border border-gray-200 shadow-sm'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center'>
              <Sparkles className='w-5 h-5 text-white' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>Configuration</h2>
          </div>

          <label className='block text-sm font-semibold text-gray-900 mb-2'>Describe Your Image</label>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={4}
            className='w-full p-3 px-4 outline-none text-sm rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-none'
            placeholder='Describe what you want to see in the image...'
            required
          />

          <label className='block text-sm font-semibold text-gray-900 mb-2 mt-5'>Style</label>
          <div className='flex gap-2 flex-wrap'>
            {imageStyle.map((item) => (
              <button
                type='button'
                onClick={() => setSelectedStyle(item)}
                className={`text-xs px-4 py-2.5 border rounded-lg font-medium transition-all ${selectedStyle === item ? 'bg-green-500 text-white border-green-500 shadow-md shadow-green-500/20' : 'text-gray-700 border-gray-300 hover:border-green-300 hover:bg-green-50'}`}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className='mt-6 flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200'>
            <label className='relative cursor-pointer'>
              <input type="checkbox" onChange={(e) => setPublish(e.target.checked)} checked={publish} className='sr-only peer' />
              <div className='w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all'></div>
              <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5 shadow-sm'></span>
            </label>
            <div>
              <p className='text-sm font-medium text-gray-900'>Make this image public</p>
              <p className='text-xs text-gray-600'>Share in the community gallery</p>
            </div>
          </div>

          <button
            disabled={loading}
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3.5 mt-6 text-sm font-medium rounded-lg shadow-lg shadow-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? <span className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin'></span> : <Image className='w-5' />}
            Generate Image
          </button>
        </form>

        {/* Right col */}
        <div className='w-full max-w-lg p-6 bg-white rounded-2xl flex flex-col border border-gray-200 shadow-sm min-h-[500px]'>

          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center'>
              <Image className='w-5 h-5 text-white' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>Generated Image</h2>
          </div>

          {
            !content ? (
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-4 text-gray-400'>
                  <Image className='w-12 h-12 text-gray-300' />
                  <p className='text-center max-w-xs'>Describe your image and click "Generate Image" to get started</p>
                </div>
              </div>
            ) : (
              <div className='flex-1 overflow-hidden rounded-lg'>
                <img src={content} alt="Generated image" className='w-full h-full object-cover rounded-lg shadow-md' />
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default GenerateImages