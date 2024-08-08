import React from 'react'
import Title from '../ui/Title'
import CustomerItem from './CustomerItem'
import Profile from '../../public/images/client1.jpg'
import Profile2 from '../../public/images/client2.jpg'
import Slider from "react-slick";
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/Io";

const Customers = () => {
    function NextBtn ({onClick}){
        return(
            <button className='text-primary absolute -bottom-12 left-1/2 flex items-center justify-center ' onClick={onClick} ><IoIosArrowDroprightCircle className=' w-12 h-12' /></button>
        )
    }
    function PrevBtn ({onClick}){
        return(
            <button className='text-primary absolute -bottom-12 right-1/2 flex items-center justify-center mr-2' onClick={onClick} ><IoIosArrowDropleftCircle className=' w-12 h-12' /></button>
        )
    }
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoPlay:true,
        autoplayspeed:3000,
        nextArrow:<NextBtn />,
        prevArrow:<PrevBtn />,
        responsive:[
            {
                breakpoint:768,
                settings:{
                    slidesToShow:1,
                    slidesToScroll: 1,
                    arrows:false,
                }
            },
        ]
      };

    return (
        <div className='container mx-auto my-12'>
            <Title classAdd={"text-3xl text-center"}>Müşterilerimiz Bizim İçin Ne Söyledi?</Title>
            
            <Slider  {...settings}>
                <CustomerItem imgSrc={Profile}/>
                <CustomerItem imgSrc={Profile2}/>
                <CustomerItem imgSrc={Profile}/>
                <CustomerItem imgSrc={Profile2}/>
                <CustomerItem imgSrc={Profile}/>
                <CustomerItem imgSrc={Profile2}/>
            </Slider>
            
        </div>
    )
}

export default Customers