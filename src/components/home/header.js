import React from 'react'
import { useSelector } from 'react-redux'
import icons from '../../utils/icons'
const {HiArrowNarrowLeft,
  HiArrowNarrowRight,
  FiSearch,  
}=icons;
const Header = () => {
  return (
    <div className='h-[70px] w-full bg-main-300 px-[60px] flex justify-between'>
      <div className='flex gap-5 h-full items-center'>
      <HiArrowNarrowLeft size={20} className='text-text-200'/>
      <HiArrowNarrowRight size={20} className='text-text-200'/>
      <div className='h-[40px] w-[440px] text-text-100 flex items-center px-2 bg-main-100 rounded-full gap-1'>
        <FiSearch size={20}/>
        <input type={'text'} placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...' className='flex-1 bg-main-100 outline-none'/>
      </div>
      </div>
      <div>
        Right
      </div>
      
    </div>
  )
}

export default Header