import React from 'react'
import Scrollbars from "react-custom-scrollbars-2"
import { NavLink } from 'react-router-dom'
const SearchAllPage = () => {
  return (
    <div className='w-full text-text-100 h-full'>
       <Scrollbars autoHide style={{ width: "100%", height: "85%" }}>
       <div className='flex w-full border-[#2c2437] border-solid border-b px-[60px] gap-7 text-[14px] items-center'>
         <div className='text-[24px] font-bold border-[#2c2437] border-solid border-r pr-7 h-full'>Kết Quả Tìm Kiếm</div>
        
         <div className='cursor-pointer text-[#b0aeb3] hover:text-text-100 border-solid border-main-500 border-b h-full'>
            <NavLink to='/tim-kiem/tat-ca'>TẤT CẢ</NavLink>
           </div>
         <div className='cursor-pointer text-[#b0aeb3] hover:text-text-100 h-full'><NavLink to='bai-hat'>BÀI HÁT</NavLink></div>
         <div className='cursor-pointer text-[#b0aeb3] hover:text-text-100 h-full'><NavLink to='playlist'>PLAYLIST/ALBUM</NavLink></div>
         <div className='cursor-pointer text-[#b0aeb3] hover:text-text-100 h-full'><NavLink to='artists'>NGHỆ SĨ/OA</NavLink></div>
         <div className='cursor-pointer text-[#b0aeb3] hover:text-text-100 h-full'><NavLink to='video'>MV</NavLink></div>
       </div>

       </Scrollbars>
    </div>
  )
}

export default SearchAllPage