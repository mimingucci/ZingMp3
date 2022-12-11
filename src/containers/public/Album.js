import React, {useState} from 'react'
import { useSelector } from 'react-redux'

import { AlbumMain } from '../../components/album'
import {NavbarLeft, NavbarRight, Playmusic} from '../../components/home'

const Album = () => {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
    
    return (
        <div className='h-screen overflow-x-hidden'>
        <div className='flex h-full'>
            <NavbarLeft/>
            <AlbumMain/>
            {isShowRightSidebar && <div className='w-[240px] 1600:flex flex-none flex animate-slide-left'>
                    <NavbarRight />
                </div>}
        </div>
        <div className='fixed bottom-0 right-0 left-0 h-[90px]'>
        <Playmusic setIsShowRightSidebar={setIsShowRightSidebar}/>
        </div>
        </div>
        
      )
}

export default Album