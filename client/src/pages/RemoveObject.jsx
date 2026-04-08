import React, { useState } from 'react'
import { Scissors, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RemoveObject = () => {

  const [input, setInput] = useState('')
  const [object, setObject] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      if (object.split(' ').length > 1) {
        return toast('Please enter only a single object name')
      }

      const formData = new FormData();
      formData.append('image', input);
      formData.append('object', object);

      const { data } = await axios.post('/api/ai/remove-image-object', formData, {
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
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Remove Object</h1>
        <p className='text-gray-600'>Remove unwanted objects from images</p>
      </div>

      <div className='flex items-start flex-wrap gap-6 text-gray-700'>
        {/* Left col */}
        <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-white rounded-2xl border border-gray-200 shadow-sm'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center'>
              <Sparkles className='w-5 h-5 text-white' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>Configuration</h2>
          </div>

          <label className='block text-sm font-semibold text-gray-900 mb-2'>Upload Image</label>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept='image/*'
            className='w-full p-3 px-4 outline-none text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20'
            required
          />

          <label className='block text-sm font-semibold text-gray-900 mb-2 mt-5'>Object to Remove</label>
          <textarea
            onChange={(e) => setObject(e.target.value)}
            value={object}
            rows={4}
            className='w-full p-3 px-4 outline-none text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none'
            placeholder='e.g., watch or spoon (single object name only)'
            required
          />
          <p className='text-xs text-gray-500 mt-2'>Enter only a single object name to remove from the image</p>

          <button
            disabled={loading}
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-primary text-white px-4 py-3.5 mt-6 text-sm font-medium rounded-lg shadow-lg shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? <span className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin'></span> : <Scissors className='w-5' />}
            Remove Object
          </button>
        </form>

        {/* Right col */}
        <div className='w-full max-w-lg p-6 bg-white rounded-2xl flex flex-col border border-gray-200 shadow-sm min-h-[500px]'>

          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center'>
              <Scissors className='w-5 h-5 text-white' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>Processed Image</h2>
          </div>

          {
            !content ? (
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-4 text-gray-400'>
                  <Scissors className='w-12 h-12 text-gray-300' />
                  <p className='text-center max-w-xs'>Upload an image and specify the object to remove</p>
                </div>
              </div>
            ) : (
              <div className='flex-1 overflow-hidden rounded-lg'>
                <img src={content} alt="Processed image" className='w-full h-full object-contain rounded-lg shadow-md' />
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default RemoveObject