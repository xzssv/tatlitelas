import React from 'react'
import Image from 'next/legacy/image'


const CustomerItem = ({imgSrc}) => {
  
  return (
    <div className='mt-5 mx-4'>
      <div className='p-6 bg-secondary text-white rounded-md '>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam
        </p>
        <div className='flex flex-col mt-4'>
        <span className='text-lg font-semibold'>Ahmet Akif</span>
        <span className='text-sm'>Magna Aliqua</span>
      </div>
      </div>
      
      <div className="border-4 border-primary relative w-28 h-28 rounded-full mt-8
       before:content-[''] before:absolute before:top-0 flex justify-center before:-translate-y-3 before:rotate-45 before:bg-primary before:w-5 before:h-5">
        <Image src={imgSrc} alt="profile" layout='fill' objectFit='contain' className='rounded-full' />
      </div>
    </div>
  )
}

export default CustomerItem