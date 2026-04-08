import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser();

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen overflow-hidden bg-linear-to-br from-gray-50 to-white'>

      <nav className='w-full px-8 min-h-16 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm'>
        <button
          type='button'
          onClick={() => navigate('/')}
          className='flex items-center gap-3 cursor-pointer'
          aria-label='Go to home'
        >
          <img src='/favicon.svg' alt='Ascend.ai logo' className='w-8 h-8 sm:w-9 sm:h-9' />
          <span className='text-xl sm:text-2xl font-semibold text-primary tracking-tight'>Ascend.ai</span>
        </button>
        {
          sidebar ? <X className='w-6 h-6 text-gray-700 sm:hidden hover:text-primary transition-colors' onClick={() => setSidebar(false)} />
            : <Menu className='w-6 h-6 text-gray-700 sm:hidden hover:text-primary transition-colors' onClick={() => setSidebar(true)} />
        }
      </nav>

      <div className='flex-1 w-full flex min-h-0'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className='flex-1 min-h-0 bg-linear-to-br from-gray-50/50 to-white'>
          <Outlet />
        </div>
      </div>

    </div>
  ) : (
    <div className='flex items-center justify-center h-screen bg-linear-to-br from-sky-50 via-white to-cyan-50'>
      <SignIn />
    </div>
  )
}

export default Layout