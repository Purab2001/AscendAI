import React, { useState } from 'react'
import { Edit, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const WriteArticle = () => {

  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' }
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      const { data } = await axios.post('/api/ai/generate-article', { prompt, length: selectedLength.length }, {
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
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Write Article</h1>
        <p className='text-gray-600'>Generate high-quality articles with AI</p>
      </div>

      <div className='flex items-start flex-wrap gap-6 text-gray-700'>
        {/* Left col */}
        <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-white rounded-2xl border border-gray-200 shadow-sm'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center'>
              <Sparkles className='w-5 h-5 text-white' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>Configuration</h2>
          </div>

          <label className='block text-sm font-semibold text-gray-900 mb-2'>Article Topic</label>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className='w-full p-3 px-4 outline-none text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
            placeholder='The future of artificial intelligence...'
            required
          />

          <label className='block text-sm font-semibold text-gray-900 mb-2 mt-5'>Article Length</label>
          <div className='flex gap-2 flex-wrap'>
            {articleLength.map((item, index) => (
              <button
                type='button'
                onClick={() => setSelectedLength(item)}
                className={`text-xs px-4 py-2.5 border rounded-lg font-medium transition-all ${selectedLength.text === item.text ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20' : 'text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'}`}
                key={index}
              >
                {item.text}
              </button>
            ))}
          </div>

          <button
            disabled={loading}
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3.5 mt-8 text-sm font-medium rounded-lg shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {
              loading ? <span className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
                : <Edit className='w-5' />
            }
            Generate Article
          </button>
        </form>

        {/* Right col */}
        <div className='w-full max-w-lg p-6 bg-white rounded-2xl flex flex-col border border-gray-200 shadow-sm min-h-[500px] max-h-[600px]'>

          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center'>
              <Edit className='w-5 h-5 text-white' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>Generated Article</h2>
          </div>

          {!content ? (
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-4 text-gray-400'>
                <Edit className='w-12 h-12 text-gray-300' />
                <p className='text-center max-w-xs'>Enter a topic and click "Generate Article" to get started</p>
              </div>
            </div>
          ) : (
            <div className='flex-1 overflow-y-scroll text-sm text-gray-700 pr-2'>
              <div className='reset-tw'>
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WriteArticle