import React from 'react'
import { AlbumMain } from '../../components/album'
import {NavbarLeft, NavbarRight, Playmusic} from '../../components/home'

const Album = () => {
    return (
        <div className='h-screen'>
        <div className='flex h-full'>
            <NavbarLeft/>
            <AlbumMain/>
            <NavbarRight/>
        </div>
        <div className='fixed bottom-0 right-0 left-0 h-[90px]'>
        <Playmusic/>
        </div>
        </div>
        
      )
}

export default Album