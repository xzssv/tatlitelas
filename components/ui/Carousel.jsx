import React from 'react'
import Image from 'next/legacy/image'
import carPic from '../../public/images/hero-bg.jpg'
import Title from './Title'
import Slider from 'react-slick'
// import { settings } from 'eslint-config-next'

const Carousel = () => {

    const settings = {
        dots: true,
        centerMode: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay: true,
        autoplayspeed:1800,
        customPaging: (i) => (
            <div className='w-6 h-3 border bg-white rounded-full mt-10'></div>
        )
        

    };

    return (
        <div  className='h-screen sm:w-full w-72 container mx-auto -mt-[88px] '>
            <div className='absolute top-0 left-0 w-full h-full'>
                <div className='relative h-full w-full'>
                    <Image
                        src={carPic}
                        alt=""
                        layout="fill"
                        objectFit='cover'
                    />
                </div>
            </div>
            <Slider {...settings}>
                <div >
                    <div className='mt-48 text-white flex flex-col items-start gap-y-10' >
                        <h1 className='font-normal font-sans text-4xl' >Kristal Burger</h1>
                        <p className='text-lg sm:w-2/5 w-full'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Id vitae accusantium dolorem nam animi exercitationem,
                            dolorum explicabo veritatis rerum dicta fuga.
                        </p>
                        <button className='btn-primary'>Hemen Sipariş Ver</button>
                    </div>
                </div>
                <div >
                    <div className='mt-48 text-white flex flex-col items-start gap-y-10' >
                        <h1 className='font-normal text-4xl' >Japon Burger</h1>
                        <p className='text-lg sm:w-2/5 w-full'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Id vitae accusantium dolorem nam animi exercitationem,
                            dolorum explicabo veritatis rerum dicta fuga.
                        </p>
                        <button className='btn-primary'>Hemen Sipariş Ver</button>
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default Carousel