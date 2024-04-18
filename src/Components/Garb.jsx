import React from 'react'
import garbage from '../assets/images/garbage.png'
import trending from '../assets/icons/trending-up.svg'
import heart from '../assets/icons/heart.png'

const Garb = () => {
  return (
    <div className="flex flex-wrap justify-center gap-[20px] mt-[30px] garb pb-[50px]">
        <div className="garb_item shadow-md">
            <img src={garbage} className='h-[200px] w-[300px]' />
            <div className='desc shadow-md px-[12px] text-secondary-text'>
                <div className='flex flex-row space-x-[4px] items-center'>
                    <img src={trending} alt='trending'  className='h-[12px] w-[12px]'/>
                    <span className='text-[11px]'>1 Hughes Avenue, yaba 101...</span>
                </div>
                <div className='flex flex-row items-center space-x-[4px]'>
                    <img src={heart} alt='heart'  className='h-[20px] w-[20px]'/>
                    <span className='text-[11px]'>202</span>
                </div>
            </div>
        </div>
        <div className="garb_item shadow-md">
            <img src={garbage} className='h-[200px] w-[300px]' />
            <div className='desc shadow-md px-[12px] text-secondary-text'>
                <div className='flex flex-row space-x-[4px] items-center'>
                    <img src={trending} alt='trending'  className='h-[12px] w-[12px]'/>
                    <span className='text-[11px]'>1 Hughes Avenue, yaba 101...</span>
                </div>
                <div className='flex flex-row items-center space-x-[4px]'>
                    <img src={heart} alt='heart'  className='h-[20px] w-[20px]'/>
                    <span className='text-[11px]'>202</span>
                </div>
            </div>

        </div>
        <div className="garb_item shadow-md">
            <img src={garbage} className='h-[200px] w-[300px]' />
            <div className='desc shadow-md px-[12px] text-secondary-text'>
                <div className='flex flex-row space-x-[4px] items-center'>
                    <img src={trending} alt='trending'  className='h-[12px] w-[12px]'/>
                    <span className='text-[11px]'>1 Hughes Avenue, yaba 101...</span>
                </div>
                <div className='flex flex-row items-center space-x-[4px]'>
                    <img src={heart} alt='heart'  className='h-[20px] w-[20px]'/>
                    <span className='text-[11px]'>202</span>
                </div>
            </div>

        </div>
        <div className="garb_item shadow-md">
            <img src={garbage} className='h-[200px] w-[300px]' />
            <div className='desc shadow-md px-[12px] text-secondary-text'>
                <div className='flex flex-row space-x-[4px] items-center'>
                    <img src={trending} alt='trending'  className='h-[12px] w-[12px]'/>
                    <span className='text-[11px]'>1 Hughes Avenue, yaba 101...</span>
                </div>
                <div className='flex flex-row items-center space-x-[4px]'>
                    <img src={heart} alt='heart'  className='h-[20px] w-[20px]'/>
                    <span className='text-[11px]'>202</span>
                </div>
            </div>

        </div>
        <div className="garb_item shadow-md">
            <img src={garbage} className='h-[200px] w-[300px]' />
            <div className='desc shadow-md px-[12px] text-secondary-text'>
                <div className='flex flex-row space-x-[4px] items-center'>
                    <img src={trending} alt='trending'  className='h-[12px] w-[12px]'/>
                    <span className='text-[11px]'>1 Hughes Avenue, yaba 101...</span>
                </div>
                <div className='flex flex-row items-center space-x-[4px]'>
                    <img src={heart} alt='heart'  className='h-[20px] w-[20px]'/>
                    <span className='text-[11px]'>202</span>
                </div>
            </div>

        </div>
        <div className="garb_item shadow-md">
            <img src={garbage} className='h-[200px] w-[300px]' />
            <div className='desc shadow-md px-[12px] text-secondary-text'>
                <div className='flex flex-row space-x-[4px] items-center'>
                    <img src={trending} alt='trending'  className='h-[12px] w-[12px]'/>
                    <span className='text-[11px]'>1 Hughes Avenue, yaba 101...</span>
                </div>
                <div className='flex flex-row items-center space-x-[4px]'>
                    <img src={heart} alt='heart'  className='h-[20px] w-[20px]'/>
                    <span className='text-[11px]'>202</span>
                </div>
            </div>

        </div>

    </div>

  )
}

export default Garb