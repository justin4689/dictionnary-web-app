import React from 'react'
import { ModeToggle } from './mode-toggle'
import { CountryToggle } from './country-toggle'

export default function Header() {
  return (
    <header>
       
       <div className='max-w-5xl  w-full mx-auto px-6 py-4 flex justify-between items-center'>
         <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">WordBase</h1>

         <div className='flex gap-3 items-center'>
         <ModeToggle />
         <CountryToggle />
         </div>

       </div>
      
    </header>
  )
}
