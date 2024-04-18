import React from 'react'
import bell from '../assets/icons/bell.svg'
import avatar from '../assets/images/user_image.png'

const TopNav = () => {
  return (
    <div className='topnav relative'>
        <div className='absolute right-[4.89vw] bottom-[20px] flex flex-row items-center space-x-[21px]'>
            <img src={bell} className='h-[20px] w-[20px]' alt='notification' />
        </div>
    </div>
  )
}

export default TopNav