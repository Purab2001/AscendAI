import React from 'react'
import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import { NavLink } from 'react-router';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Articles', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users }
]

const Sidebar = ({ sidebar, setSidebar }) => {

  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute max-sm:z-50 top-16 bottom-0 shadow-lg max-sm:shadow-xl ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
      <div className='my-6 w-full'>
        <div className='px-6 mb-4'>
          <img src={user.imageUrl} alt="User avatar" className='w-14 h-14 rounded-full mx-auto ring-4 ring-primary/10' />
          <h1 className='mt-2 text-center font-semibold text-gray-900'>{user.fullName}</h1>
        </div>
        <div className='px-3 mt-4 text-sm font-medium'>
          {/* eslint-disable-next-line no-unused-vars */}
          {navItems.map(({ to, label, Icon: IconComponent }) => (
            <NavLink key={to} to={to} end={to === '/ai'} onClick={() => setSidebar(false)} className={({ isActive }) => `px-4 py-2.5 mb-1 flex items-center gap-2.5 rounded-lg transition-all ${isActive ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-gray-700 hover:bg-gray-100'}`}>
              {({ isActive }) => (
                <>
                  <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className='w-full border-t border-gray-200 p-3 px-4 bg-gray-50'>
        <div className='flex items-center justify-between'>
          <div onClick={openUserProfile} className='flex gap-3 items-center cursor-pointer flex-1'>
            <img src={user.imageUrl} alt="" className='w-9 h-9 rounded-full ring-2 ring-gray-200' />
            <div>
              <h1 className='text-sm font-semibold text-gray-900'>{user.fullName}</h1>
              <p className='text-xs text-gray-600'>
                <Protect plan='pro' fallback='Free'>Pro</Protect> Plan
              </p>
            </div>
          </div>
          <LogOut onClick={signOut} className='w-5 h-5 text-gray-500 hover:text-red-500 transition cursor-pointer shrink-0' />
        </div>
      </div>

    </div>
  )
}

export default Sidebar