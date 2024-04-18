import React from 'react'

const Pending = ({all}) => {
  return (
    <section className='flex flex-wrap justify-center gap-[20px] mt-[30px] garb pb-[50px]'>
        {
            all.map((single) => { return (
                <div className="garb_item shadow-md">
                <img src={single.imageUrl} className='h-[200px] w-[300px]' />
                <div className='desc shadow-md px-[12px] text-secondary-text'>
                    <div className='flex flex-col'>
                        <span className='text-base text-dark '>{single.description}</span>
                        <span className='text-sm'>Room {single.roomNo}</span>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <div className='flex flex-row items-center space-x-[4px] justify-end'>
                            <span className='text-[11px]'>{single.urgency}</span>
                            <span className={`urgency ${single.urgency < 5 ? 'bg-orange' :  'bg-red'}`}></span>
                        </div>

                        <span className='font-semibold'>Cost: 0.00</span>
                    </div>
                </div>
            </div>
    
            )})
        }
    </section>
  )
}

export default Pending