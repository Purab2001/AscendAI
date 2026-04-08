import React from 'react'
import { useNavigate } from 'react-router'
import { assets } from '../assets/assets';

const Hero = () => {

    const navigate = useNavigate();

    return (
        <div className='px-4 sm:px-20 xl:px-32 relative isolate inline-flex flex-col w-full justify-center overflow-hidden bg-linear-to-br from-sky-50 via-white to-cyan-50 min-h-screen'>

            <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                <div className='absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl' />
                <div className='absolute top-16 -right-16 h-80 w-80 rounded-full bg-accent/15 blur-3xl' />
                <div className='absolute -bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/60 blur-3xl' />
                <div className='absolute top-1/4 left-1/4 h-40 w-40 rounded-full border border-primary/10 bg-white/30 shadow-[0_0_120px_rgba(14,165,233,0.18)]' />
                <div className='absolute bottom-20 right-1/4 h-28 w-28 rounded-3xl border border-cyan-200/80 bg-white/50 rotate-12 shadow-[0_20px_80px_rgba(6,182,212,0.14)]' />
                <div
                    className='absolute inset-x-0 bottom-0 h-56 opacity-35'
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(14,165,233,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,165,233,0.12) 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                        maskImage: 'linear-gradient(to top, black, transparent 85%)',
                        WebkitMaskImage: 'linear-gradient(to top, black, transparent 85%)',
                    }}
                />
            </div>

            <div className='relative z-10 text-center mb-8 max-w-4xl mx-auto'>
                <div className='inline-block mb-4 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium'>
                    AI-Powered Content Creation
                </div>
                <h1 className='text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold mx-auto leading-[1.15] bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent'>
                    Create stunning content with <span className='bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>AI</span>
                </h1>
                <p className='mt-6 max-w-2xl m-auto text-base sm:text-lg text-gray-600 leading-relaxed'>
                    Streamline your content pipeline: generate images, draft articles, clean up photos, and refine text using simple AI-powered tools.
                </p>
            </div>

            <div className='relative z-10 flex flex-wrap justify-center gap-4 text-sm sm:text-base'>
                <button onClick={() => navigate('/ai')} className='bg-primary text-white px-8 py-3.5 rounded-lg hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer font-medium'>
                    Start Creating Now
                </button>
                <button className='bg-white px-8 py-3.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer font-medium'>
                    Watch Demo
                </button>
            </div>

            <div className='relative z-10 flex items-center gap-3 mt-12 mx-auto text-gray-600 text-sm sm:text-base'>
                <img src={assets.user_group} alt="" className='h-6 sm:h-8 opacity-80' />
                <span className='font-medium'>Trusted by over 1,000+ creators worldwide</span>
            </div>

        </div>
    )
}

export default Hero