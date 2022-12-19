import React, { useState, useDis } from 'react'
import icons from '../../utils/icons'
import { useSelector, useDispatch } from 'react-redux'
import SongLoading from "../home/SongLoading"
import Scrollbars from 'react-custom-scrollbars-2';

import * as actions from '../../store/action'
import * as apis from '../../getApi'
const {GiAlarmClock, BsThreeDots, BsFillPlayFill}=icons;
const NavbarRight = () => {
  const dispatch=useDispatch();
  const {historySongs}=useSelector(state=>state.app);
  const [active, setActive]=useState(true);
  const {currentSongId,
    image,
    songName,
    artists,
    linkCurrentSong,
    isPlaying,
    listSongs,
    isInAlbum,
    isInPlaylist,
    }=useSelector(state=>state.music);
  console.log('albumInfo', listSongs, isInAlbum);
  const handleClickHistorySong=async(song)=>{
    const response=await apis.apiGetSong(song?.encodeId);
     setActive(true);
     dispatch(actions.setCurrentSongId(song?.encodeId, response?.data?.data['128'], song?.thumbnailM, song?.title, song?.artists));
     dispatch(actions.pustSongToHistory(song));
  }
  return (
    <div className='w-[240px] bg-main-300 overflow-y-hidden h-full border-[#2c2437] border-solid border-l text-text-100 py-5 px-1'>
      <div className='flex w-full gap-2 items-center h-fit mb-5'>
        <div className='text-[11px] w-fit rounded-full bg-main-100 h-fit p-[2px] cursor-pointer'>
          <span className={`px-2 py-1 rounded-full ${active ? 'bg-text-200': ''}`} onClick={()=>setActive(true)}>Danh sách phát</span>
          <span className={`px-2 py-1 rounded-full ${!active ? 'bg-text-200': ''}`} onClick={()=>setActive(false)}>Nghe gần đây</span>
        </div>
        <GiAlarmClock className='rounded-full bg-main-100' size={17}/>
        <BsThreeDots className='rounded-full bg-main-100'/>
      </div>
      {active && isInAlbum && <div className='w-full h-full mb-5'>
      <Scrollbars autoHide style={{ width: "100%", height: "80%" }}>
      <div className='flex bg-main-500 rounded-md p-2 mb-5'>
        <div className='relative rounded-md overflow-hidden'>
           <img src={image} className='w-[40px] h-[40px]'/>
           <div className={`absolute z-10 top-0 left-0 bottom-0 right-0 hover:bg-[rgba(0,0,0,0.3)] text-white items-center justify-center`}>
                        <span className='p-3 h-[40px] flex items-center justify-center'>
                            {(isPlaying) ? <SongLoading className='w-[16px]'/> : <BsFillPlayFill size={30} />}
                        </span>
                    </div>
        </div>
        <div className='flex flex-col text-left px-2'>
          <span className='text-[14px] font-semibold'>{songName.length>20?`${songName.slice(0, 20)}...`:songName}</span>
          <span className='text-[12px] text-[#ced5e3] font-medium'>{artists.map(artist=>artist.name).join(', ')}</span>
        </div>
      </div>
      <div className='px-[12px]'>
        <div className='flex flex-col text-left'>
          <span className='text-[14px] font-semibold'>Tiếp theo</span>
          <span className='text-[12px] font-semibold text-text-200'>Từ playlist</span>
        </div>
      </div>
      <div className='w-full h-[500px] mt-5'>
      {listSongs.map((item, index)=>(
        <div className='flex bg-main-300 rounded-md p-2 my-2 hover:bg-main-100 cursor-pointer group' key={index} onClick={()=>handleClickHistorySong(item)}>
        <div className='relative rounded-md overflow-hidden'>
           <img src={item.thumbnailM} className='w-[40px] h-[40px]'/>
           <div className={`absolute z-10 top-0 left-0 bottom-0 right-0 hover:bg-[rgba(0,0,0,0.3)] text-white items-center justify-center hidden group-hover:flex`}>
                        <span className='p-3 h-[40px] flex items-center justify-center'>
                            {<BsFillPlayFill size={30} />}
                        </span>
                    </div>
        </div>
        <div className='flex flex-col text-left px-2'>
          <span className='text-[14px] font-semibold'>{item?.title?.length>20?`${item?.title.slice(0, 20)}...`:item?.title}</span>
          <span className='text-[12px] text-[#ced5e3] font-medium'>{item?.artistsNames}</span>
        </div>
      </div>
      ))}
      </div>
      </Scrollbars>
      </div>
}
    {!active && <div className='w-full h-full'>
      <Scrollbars autoHide style={{ width: "100%", height: "85%" }}>
      {historySongs.map((item, index)=>(
        <div className='flex bg-main-300 rounded-md p-2 my-2 hover:bg-main-100 cursor-pointer group' key={index} onClick={()=>handleClickHistorySong(item)}>
        <div className='relative rounded-md overflow-hidden'>
           <img src={item.thumbnailM} className='w-[40px] h-[40px]'/>
           <div className={`absolute z-10 top-0 left-0 bottom-0 right-0 hover:bg-[rgba(0,0,0,0.3)] text-white items-center justify-center hidden group-hover:flex`}>
                        <span className='p-3 h-[40px] flex items-center justify-center'>
                            {<BsFillPlayFill size={30} />}
                        </span>
                    </div>
        </div>
        <div className='flex flex-col text-left px-2'>
          <span className='text-[14px] font-semibold'>{item?.title?.length>20?`${item?.title.slice(0, 20)}...`:item?.title}</span>
          <span className='text-[12px] text-[#ced5e3] font-medium'>{item?.artistsNames}</span>
        </div>
      </div>
      ))}
      </Scrollbars>
      </div>}
    </div>
  )
}

export default NavbarRight