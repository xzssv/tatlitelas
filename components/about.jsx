import React from 'react'
import Image from 'next/legacy/image'
import aboutImage from '../public/images/about-img.png'

const About = () => {
    return (
        <div className='w-full bg-secondary py-14'>
            <div className='container flex mx-auto items-center text-white gap-20  justify-center '>
                <div className='justify-center flex flex-wrap-reverse items-center'>
                    <div className='relative flex justify-center sm:h-[400px] sm:w-[300px] h-[400px] w-[300px]'><Image src={aboutImage} alt="" /></div>
                    <div className='md:w-2/5 sm:ml-7 ml-2'>
                        <div className='flex flex-start flex-col font-rubik text-4xl'>Ferah Tarihçesi</div>
                        <p className='my-5 flex flex-col'> There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                        in some form, by injected humour, or randomised words which dont look even slightly believable. If you
                        are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in
                        the middle of text. All
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About