import About from '@/components/Frontend/About'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">
         About Us
        </h2>
      <About />
    </div>
  )
}

export default page
