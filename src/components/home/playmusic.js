import React, {useEffect, useState} from 'react'
import { getCurrentSong } from '../../store/action/music'
import { useSelector } from 'react-redux'
import icons from '../../utils/icons'
const Playmusic = () => {
  const {currentSongId, image, songName, artists, linkCurrentSong}=useSelector(state=>state.music)
    const [currentSong, setCurrentSong]=useState(currentSongId);
    const [detailCurrentSong, setDetailCurrentSong]=useState(null);
    const {AiOutlineHeart, BsThreeDots, CiRepeat, AiOutlineArrowLeft, AiOutlineArrowRight, BsFillPlayFill}=icons;
    console.log(linkCurrentSong)
    const [song, setSong]=useState(new Audio(linkCurrentSong))
    // useEffect(()=>{
    //     const testGetSong=async()=>{
    //         const response=await getCurrentSong(currentSong);
    //         console.log(response)
    //         setDetailCurrentSong(response);
    //     }
    //     testGetSong();
    // }, [currentSong])
    const handlePlayAndPauseMusic=async()=>{
      await song.play();
    }
  return (
    <div className='px-5 bg-main-400 h-full w-full text-text-100 flex'>
      <div className='w-[30%] h-full flex items-center'>
        <div>
        <img src={image} alt='' className='h-[64px] w-[64px] rounded-md block'/>
        </div>
        <div className='flex flex-col text-left pl-2 text-[14px]'>
          <span>{songName}</span>
          <span>{artists.map(artist=>artist?.name).join(', ')}</span>
        </div>
        <div className='flex gap-5 pl-7'>
          <AiOutlineHeart/>
          <BsThreeDots/>
        </div>
      </div>
      <div className='w-[40%] h-full'>
        <div className='flex justify-center gap-7 items-center h-1/2'>
           <CiRepeat size={20}/>
           <AiOutlineArrowLeft size={20}/>
           <div className='border rounded-[50%] w-[35px] h-[35px] flex items-center justify-center cursor-pointer' onClick={handlePlayAndPauseMusic}>
           <BsFillPlayFill size={30}/>
           </div>
           <AiOutlineArrowRight size={20}/>
           <CiRepeat size={24}/>
        </div>
        <div className='w-full h-1/2 flex items-center'>
        <div className='bg-text-200 relative m-auto h-[3px] w-4/5 rounded-l-full rounded-r-full'>
                        <div className='bg-[#0e8080] absolute top-0 left-0 h-[3px] rounded-l-full rounded-r-full'></div>
                    </div>
        </div>
      </div>
      <div className='w-[30%] bg-slate-500 h-full'></div>
    </div>
  )
}

export default Playmusic