import React from 'react'
import { useSelector } from 'react-redux'
const Header = () => {
  const {banner}=useSelector(state=>state.banner)
  console.log("Banner",banner)
  return (
    <div className='h-[70px] w-full bg-[rgba(23,15,35, 0.8)]'>Header</div>
  )
}

export default Header