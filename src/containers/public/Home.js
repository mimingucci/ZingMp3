import React from 'react'
import {NavbarLeft, NavbarRight,Main } from '../../components/home/index'
const Home = () => {
  return (
    <div className='flex h-screen'>
        <NavbarLeft/>
        <Main/>
        <NavbarRight/>
    </div>
  )
}

export default Home