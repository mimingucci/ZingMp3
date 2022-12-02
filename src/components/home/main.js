import React from 'react'
import Header from './header'
import { useSelector, useDispatch } from 'react-redux'
function Main  () {
  const {banner}=useSelector(state=>state.banner);
  const dispatch=useDispatch();
 // console.log("Banner",banner)
  return (
    <div className='w-fit h-full overflow-y-hidden flex-1 bg-[#170f23]'>
      <Header/>
      {banner?.map((item, index) => (
                    <img
                        key={item.encodeId}
                        src={item.banner}
                        //onClick={() => handleClickBanner(item)}
                       // className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${index <= 2 ? 'block' : 'hidden'}`}
                    />
                ))}
    </div>
  )
}

export default Main
