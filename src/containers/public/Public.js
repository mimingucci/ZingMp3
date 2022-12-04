import React from 'react'
import {NavbarLeft, NavbarRight,Main , Playmusic } from '../../components/home/index'
const Public = () => {
  return (
    <div className='h-screen'>
        <div className='flex h-full'>
            <NavbarLeft/>
            <Main/>
            <NavbarRight/>
        </div>
        <div className='fixed bottom-0 right-0 left-0 h-[90px]'>
        <Playmusic/>
        </div>
        </div>
  )
}

export default Public