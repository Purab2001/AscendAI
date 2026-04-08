import React from 'react'

const Footer = () => {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-8 w-full bg-linear-to-br from-gray-50 to-white border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between w-full gap-12 pb-10">
                <div className="md:max-w-sm">
                    <div className='flex items-center gap-3 mb-5'>
                        <img src='/favicon.svg' alt='Ascend.ai logo' className='w-8 h-8' />
                        <span className='text-xl font-semibold text-primary tracking-tight'>Ascend.ai</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        Experience the power of AI with AscendAI. Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-900 text-lg">Company</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">About us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-5 text-lg">Subscribe to our newsletter</h2>
                        <div className="space-y-3">
                            <p className="text-gray-600 leading-relaxed max-w-xs">The latest news, articles, and resources, sent to your inbox weekly.</p>
                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    className="border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none w-full max-w-64 h-11 rounded-lg px-4 text-sm"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                <button className="bg-primary hover:bg-primary-dark transition-colors w-28 h-11 text-white rounded-lg cursor-pointer font-medium text-sm">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-8 border-t border-gray-200">
                <p className="text-center text-gray-600 text-sm">
                    Copyright 2025 © AscendAI. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer