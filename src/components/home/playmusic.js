import React, {useEffect} from 'react'
import { getCurrentSong } from '../../store/action/music'
const Playmusic = () => {
    useEffect(()=>{
        const testGetSong=async()=>{
            const response=await getCurrentSong(20);
        }
        testGetSong();
    }, [])
  return (
    <div className='px-5 bg-main-400 h-full w-full'>playmusic</div>
  )
}

export default Playmusic