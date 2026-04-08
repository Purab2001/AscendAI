import React from 'react'
import { useNavigate } from 'react-router'
import { ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {

  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className='fixed z-5 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center py-4 px-4 sm:px-20 xl:px-32'>
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
        user ? <UserButton /> : (
          <button onClick={openSignIn} className='flex items-center gap-2 rounded-lg text-sm cursor-pointer bg-primary hover:bg-primary-dark transition-colors text-white px-8 py-2.5 font-medium'>
            Get Started <ArrowRight className='w-4 h-4' />
          </button>
        )
      }

    </div>
  )
}

export default Navbar