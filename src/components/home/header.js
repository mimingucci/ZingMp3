import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import icons from '../../utils/icons'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/action'

import * as apis from '../../getApi'
const {HiArrowNarrowLeft,
  HiArrowNarrowRight,
  FiSearch,  
}=icons;
const Header = () => {
  const [value, setValue]=useState();
  const dispatch=useDispatch();
  const navigate = useNavigate();
  //console.log(value);
  const handleKeyUp=async(e)=>{
    if(e.key === "Enter"){
      const response=await apis.apiSearch(value);
      //console.log(response);
      dispatch(actions.searchdata(response.data.data));
      dispatch(actions.setCurrentPage(false, true, false));
      navigate('/tim-kiem/tat-ca');
    }
  }
  return (
    <div className='h-[70px] w-full bg-main-300 px-[60px] flex justify-between'>
      <div className='flex gap-5 h-full items-center'>
      <HiArrowNarrowLeft size={20} className='text-text-200'/>
      <HiArrowNarrowRight size={20} className='text-text-200'/>
      <div className='h-[40px] w-[440px] text-text-100 flex items-center px-2 bg-main-100 rounded-full gap-1'>
        <FiSearch size={20}/>
        <input 
           onKeyPress={handleKeyUp}
           type={'text'} 
           placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...' 
           className='flex-1 bg-main-100 outline-none'
           onChange={(e)=>setValue(e.target.value)}
           />
      </div>
      </div>
      <div>
        Right
      </div>
      
    </div>
  )
}

export default Header