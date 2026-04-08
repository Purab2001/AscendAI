import React from 'react'
import { assets } from '../assets/assets'

const Testimonial = () => {

    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'Marketing Director, TechCorp',
            content: 'ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Content Creator, TechCorp',
            content: 'ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Content Writer, TechCorp',
            content: 'ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 4,
        },
    ]

    return (
        <div className='px-4 sm:px-20 xl:px-32 py-24 bg-gradient-to-br from-gray-50 to-white'>
            <div className='text-center mb-16'>
                <div className='inline-block mb-3 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium'>
                    Testimonials
                </div>
                <h2 className='text-gray-900 text-4xl sm:text-5xl font-bold mb-4'>Loved by Creators</h2>
                <p className='text-gray-600 text-lg max-w-2xl mx-auto'>Don't just take our word for it. Here's what our users are saying.</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                {dummyTestimonialData.map((testimonial, index) => (
                    <div key={index} className='p-8 rounded-2xl bg-white border border-gray-200 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300'>
                        <div className="flex items-center gap-1 mb-5">
                            {Array(5).fill(0).map((_, index) => (
                                <img 
                                    key={index} 
                                    src={index < testimonial.rating ? assets.star_icon : assets.star_dull_icon} 
                                    className='w-5 h-5' 
                                    alt='star' 
                                />
                            ))}
                        </div>
                        <p className='text-gray-700 text-base leading-relaxed mb-6'>"{testimonial.content}"</p>
                        <div className='flex items-center gap-4 pt-6 border-t border-gray-100'>
                            <img src={testimonial.image} className='w-12 h-12 rounded-full object-cover' alt='' />
                            <div className='text-sm'>
                                <h3 className='font-semibold text-gray-900'>{testimonial.name}</h3>
                                <p className='text-gray-600 text-xs mt-0.5'>{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial