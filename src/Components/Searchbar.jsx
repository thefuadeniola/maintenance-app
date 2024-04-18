import React from 'react'
import search from '../assets/icons/search.svg'

const Searchbar = () => {
  return (
    <div className='flex flex-row gap-[10px] items-center input-div mt-[21px]'>
        <img src={search} className='h-[15px] w-[15px]' alt="search"/>
        <input className='input' placeholder='search for waste'/>
    </div>
  )
}

export default Searchbar