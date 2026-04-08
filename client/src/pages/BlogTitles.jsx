import React, { useState } from 'react'
import { Hash, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const BlogTitles = () => {

  const blogCategories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food']

  const [selectedCategory, setSelectedCategory] = useState('General')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`

      const { data } = await axios.post('/api/ai/generate-blog-title', { prompt }, {
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
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Blog Titles</h1>
        <p className='text-gray-600'>Generate catchy blog titles with AI</p>
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

          <label className='block text-sm font-semibold text-gray-900 mb-2'>Keyword</label>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className='w-full p-3 px-4 outline-none text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
            placeholder='Enter your keyword or topic...'
            required
          />

          <label className='block text-sm font-semibold text-gray-900 mb-2 mt-5'>Category</label>
          <div className='flex gap-2 flex-wrap'>
            {blogCategories.map((item) => (
              <button
                type='button'
                onClick={() => setSelectedCategory(item)}
                className={`text-xs px-4 py-2.5 border rounded-lg font-medium transition-all ${selectedCategory === item ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'text-gray-700 border-gray-300 hover:border-primary/50 hover:bg-primary/5'}`}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            disabled={loading}
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-primary text-white px-4 py-3.5 mt-8 text-sm font-medium rounded-lg shadow-lg shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? <span className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin'></span> : <Hash className='w-5' />}
            Generate Title
          </button>
        </form>

        {/* Right col */}
        <div className='w-full max-w-lg p-6 bg-white rounded-2xl flex flex-col border border-gray-200 shadow-sm min-h-[400px]'>

          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center'>
              <Hash className='w-5 h-5 text-white' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>Generated Titles</h2>
          </div>

          {
            !content ? (
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-4 text-gray-400'>
                  <Hash className='w-12 h-12 text-gray-300' />
                  <p className='text-center max-w-xs'>Enter a keyword and click "Generate Title" to get started</p>
                </div>
              </div>
            ) : (
              <div className='flex-1 overflow-y-scroll text-sm text-gray-700 pr-2'>
                <div className='reset-tw'>
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default BlogTitles