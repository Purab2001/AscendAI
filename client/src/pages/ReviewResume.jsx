import React, { useState } from 'react'
import { FileText, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const ReviewResume = () => {

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const formData = new FormData();
      formData.append('resume', input);

      const { data } = await axios.post('/api/ai/resume-review', formData, {
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
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Resume Review</h1>
        <p className='text-gray-600'>Get AI-powered feedback on your resume</p>
      </div>

      <div className='flex items-start flex-wrap gap-6 text-gray-700'>
        {/* Left col */}
        <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-white rounded-2xl border border-gray-200 shadow-sm'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center'>
              <Sparkles className='w-5 h-5 text-white' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>Upload Resume</h2>
          </div>

          <label className='block text-sm font-semibold text-gray-900 mb-2'>Select PDF File</label>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept='application/pdf'
            className='w-full p-3 px-4 outline-none text-sm rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100'
            required
          />
          <p className='text-xs text-gray-500 mt-2'>Supports PDF resume files only</p>

          <button
            disabled={loading}
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-3.5 mt-8 text-sm font-medium rounded-lg shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? <span className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin'></span> : <FileText className='w-5' />}
            Review Resume
          </button>
        </form>

        {/* Right col */}
        <div className='w-full max-w-lg p-6 bg-white rounded-2xl flex flex-col border border-gray-200 shadow-sm min-h-[500px] max-h-[600px]'>

          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center'>
              <FileText className='w-5 h-5 text-white' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>Analysis Results</h2>
          </div>

          {
            !content ? (
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-4 text-gray-400'>
                  <FileText className='w-12 h-12 text-gray-300' />
                  <p className='text-center max-w-xs'>Upload a resume and click "Review Resume" to get started</p>
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

export default ReviewResume