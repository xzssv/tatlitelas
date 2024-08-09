import picsOne from '.././public/images/o1.jpg'
import Image from 'next/legacy/image'
import {MdShoppingCart} from 'react-icons/md';

const CampaignItem = () => {
    return (
        <div className='flex-1 rounded-md bg-secondary py-5 px-4 flex items-center gap-x-4 my-4'>
            <div className="md:w-44 md:h-44 w-36 h-36 relative
               border-[3px] sm:border-[5px] border-primary rounded-[50%] hover:rounded-2xl duration-300 overflow-hidden box-border after:box-border flex-wrap">
                <Image className='w-full transition-all align-middle border-none hover:scale-125 duration-700' src={picsOne} alt="" layout='fill' objectFit='cover' />
            </div>
            <div className='text-white'>
                <div className='text-3xl ml-2'>Tasty Thursday</div>
                <div className='my-3  ml-2'><span className=' text-3xl'>20%</span><span className='text-sm'> off</span></div>
                <button className='btn-primary flex items-center gap-x-2'>Order Now
                <MdShoppingCart size={20} />
                </button>
            </div>
        </div>
    )
}

const Campaigns = () => {
    return (
        
            <div className='flex justify-between container mx-auto py-20 gap-6 flex-wrap sm:w-full w-[325px] '>
                <CampaignItem />
                <CampaignItem />
            </div>
        
    )
}

export default Campaigns