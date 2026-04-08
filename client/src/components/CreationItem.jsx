import React, { useState } from 'react'
import Markdown from 'react-markdown';

const CreationItem = ({ item }) => {

    const [expanded, setExpanded] = useState(false);

    return (
        <div onClick={() => setExpanded(!expanded)} className='p-5 text-sm bg-white border border-gray-200 hover:border-primary/30 rounded-xl cursor-pointer transition-all hover:shadow-md'>
            <div className='flex justify-between items-center gap-4'>
                <div className='flex-1'>
                    <h2 className='font-semibold text-gray-900 mb-1'>{item.prompt}</h2>
                    <p className='text-gray-500 text-xs'>{item.type} • {new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <span className='bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-medium capitalize'>{item.type}</span>
            </div>
            {
                expanded && (
                    <div className='mt-4 pt-4 border-t border-gray-100'>
                        {item.type === 'image' ? (
                            <div>
                                <img src={item.content} alt="image" className='mt-2 w-full max-w-md rounded-lg shadow-md' />
                            </div>
                        ) : (
                            <div className='mt-2 text-sm text-gray-700'>
                                <div className='reset-tw'>
                                    <Markdown>{item.content}</Markdown>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default CreationItem