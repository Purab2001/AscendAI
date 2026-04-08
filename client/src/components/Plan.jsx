import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
    return (
        <div className='max-w-6xl mx-auto px-4 py-24 bg-white'>

            <div className='text-center mb-16'>
                <div className='inline-block mb-3 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium'>
                    Pricing
                </div>
                <h2 className='text-gray-900 text-4xl sm:text-5xl font-bold mb-4'>Choose your plan</h2>
                <p className='text-gray-600 text-lg max-w-2xl mx-auto'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
            </div>

            <div className='max-w-4xl mx-auto'>
                <PricingTable 
                    appearance={{
                        variables: {
                            colorPrimary: '#0EA5E9',
                        }
                    }}
                />
            </div>

        </div>
    )
}

export default Plan