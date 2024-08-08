import React from 'react'
import MenuItem from './MenuItem'

const MenuWrapper = () => {
    return (
        <div className='container mx-auto flex flex-col items-center mb-16'>
            <div><h1 className='text-4xl'>Our Menu</h1></div>
            <div className='mt-8'>
                <button className='px-6 py-2 bg-secondary rounded-3xl text-white text-sm'>All</button>
                <button className='px-6 py-2  rounded-3xl  text-sm'>Burger</button>
                <button className='px-6 py-2  rounded-3xl  text-sm'>Pizza</button>
                <button className='px-6 py-2  rounded-3xl  text-sm'>Drink</button>
            </div>
            <div className='mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 container justify-between gap-8 sm:justify-items-center justify-items-center'>
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
            <button className='btn-primary mt-8'>View More</button>
        </div>
    )
}

export default MenuWrapper