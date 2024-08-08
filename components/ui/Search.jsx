import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import Title from './Title'
import Image from 'next/image'
import { AiOutlineClose } from "react-icons/Ai"

const Search = ({ setIsSearchModal }) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50  grid place-content-center after:backdrop-blur  after:absolute after:h-screen after:w-screen after:left-0 after: after:content-[''] ">
            <div>
                <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
                    <div className='grid place-content-center w-full h-full'>
                        <div className=" relative z-50 md:w-[600px] w-[270px] bg-white border-2 rounded-3xl p-10">
                            <button className='absolute top-4 right-4' onClick={() => setIsSearchModal(false)}>
                                <AiOutlineClose size={20} className='hover:text-primary transition-all' />
                            </button>
                            <Title classAdd="text-[2.5rem] text-center">Search</Title>
                            <input
                                type="text"
                                placeholder='search..'
                                className='border-2  hover:border-amber-500 w-full mt-10'
                            />
                            <ul className='mt-10'>
                                <li className='flex items-center justify-between p-1 hover:bg-primary transition-all'>
                                    <div className='relative flex'>
                                        <Image src="/images/f2.png" alt="" width={48} height={48} />
                                    </div>
                                    <span className='font-bold'>Burrrrger</span>
                                    <span className='font-bold'>$4</span>
                                </li>
                                <li className='flex items-center justify-between p-1 hover:bg-primary transition-all'>
                                    <div className='relative flex'>
                                        <Image src="/images/f2.png" alt="" width={48} height={48} />
                                    </div>
                                    <span className='font-bold'>Burrrrger</span>
                                    <span className='font-bold'>$4</span>
                                </li>
                                <li className='flex items-center justify-between p-1 hover:bg-primary transition-all'>
                                    <div className='relative flex'>
                                        <Image src="/images/f2.png" alt="" width={48} height={48} />
                                    </div>
                                    <span className='font-bold'>Burrrrger</span>
                                    <span className='font-bold'>$4</span>
                                </li>
                            </ul>

                        </div>
                    </div>
                </OutsideClickHandler>
            </div>
        </div>
    )
}

export default Search