import moment from 'moment'
import React from 'react'

const EventItem = ({label, title, startText, coverHM, followers, totalFollow, startUrl, publishTime, startTime}) => {
  return (
    <div className='object-contain w-full rounded-lg px-[10px] mb-10'>
        <div className='h-[180px] relative cursor-pointer'>
          <img src={coverHM} alt='image' className='h-full w-auto rounded-md'/>
          <div className='absolute bottom-0 flex flex-col text-left p-2 z-10'>
          <span className='text-[10px] text-red-600 rounded-[4px] bg-text-100 w-fit px-1'>{label}</span>
          <span className='font-semibold'>{title?.length > 35 ? `${title?.slice(0, 35)}...` : title}</span>
          <span className='text-[12px]'>{startTime && moment.unix(startTime).format('HH:mm')} {publishTime && moment.unix(publishTime).format("dddd, Do MMMM")}</span>
          </div>
          <div className='absolute bottom-0 top-0 left-0 right-0 bg-gradient-to-t from-[#3f3e3c] z-0'>
          </div>
        </div> 
        <div className='flex justify-between h-fit w-full items-center relative'>
          <div className='text-left flex flex-col gap-2 mt-1'>
            <span className='text-[13px] text-left'>Lượt quan tâm</span>
            <span className='flex text-text-200 text-[14px] items-center'>{followers.map((follower, index)=>(<span className={`w-4 h-4 rounded-full object-contain overflow-hidden ${index>0 ? 'ml-[-2px]':''}`}><img src={follower.avatar} alt='user' className='w-full h-auto'/></span>))}{`+${totalFollow-6}`}</span>
          </div>
          <div className='absolute bottom-0 right-0 h-[40px] flex items-center w-[110px] rounded-full bg-main-500 cursor-pointer text-center justify-center text-[14px] hover:bg-[#7F3DB8]'>QUAN TÂM</div>
        </div>
    </div>
  )
}

export default EventItem