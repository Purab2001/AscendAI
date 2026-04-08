import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router'
import { useUser } from '@clerk/clerk-react'

const AiTools = () => {

    const navigate = useNavigate();
    const { user } = useUser();

    return (
        <div className='px-4 sm:px-20 xl:px-32 py-24 bg-white'>
            <div className='text-center mb-16'>
                <div className='inline-block mb-3 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium'>
                    Features
                </div>
                <h2 className='text-gray-900 text-4xl sm:text-5xl font-bold mb-4'>AI-Powered Tools</h2>
                <p className='text-gray-600 text-lg max-w-2xl mx-auto'>Everything you need to create, enhance, and polish your content using advanced AI models.</p>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6 max-w-7xl mx-auto xl:[&>*:nth-child(5)]:col-start-2 xl:[&>*:nth-child(6)]:col-start-3'>
                {AiToolsData.map((tool, index) => (
                    <div
                        key={index}
                        className='group p-4 sm:p-6 rounded-2xl bg-white border border-gray-200 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer'
                        onClick={() => user && navigate(tool.path)}
                    >
                        <div className='w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-5' style={{ background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})` }}>
                            <tool.Icon className='w-5 h-5 sm:w-7 sm:h-7 text-white' />
                        </div>
                        <h3 className='text-sm sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 leading-tight group-hover:text-primary transition-colors'>{tool.title}</h3>
                        <p className='sm:hidden text-gray-600 text-xs leading-snug'>
                            {tool.description.length > 54 ? `${tool.description.slice(0, 54).trimEnd()}...` : tool.description}
                        </p>
                        <p className='hidden sm:block text-gray-600 text-sm leading-relaxed'>{tool.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AiTools