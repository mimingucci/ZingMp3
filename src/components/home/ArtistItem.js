import React, {memo} from 'react'
import icons from '../../utils/icons'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as actions from '../../store/action'
import * as apis from '../../getApi'

const {CiShuffle, AiOutlineUserAdd}=icons;
const ArtistItem = ({thumbnail, artistsNames, followers, playlistId, id}) => {
    const [isHover, setIsHover] = useState(false);
    const dispatch=useDispatch();
    const navigate =useNavigate();
    const imageRef = useRef();

    const handleClickPlaylist=async()=>{
       const playlist=await apis.apiGetDetaiPlaylist(playlistId);
        dispatch(actions.listSongsInAlbum(playlist?.data?.data?.song?.items));
        dispatch(actions.setSongId(playlist?.data?.data?.song?.items[Math.round(Math.random()*playlist?.data?.data?.song.total)-1].encodeId));
       dispatch(actions.setCurrentSongId(playlist?.data?.data?.song?.items[Math.round(Math.random()*playlist?.data?.data?.song.total)-1].encodeId,
       playlist?.data?.data?.song?.items[Math.round(Math.random()*playlist?.data?.data?.song.total)-1].link,
       playlist?.data?.data?.song?.items[Math.round(Math.random()*playlist?.data?.data?.song.total)-1].thumbnailM,
       playlist?.data?.data?.song?.items[Math.round(Math.random()*playlist?.data?.data?.song.total)-1].title,
       playlist?.data?.data?.song?.items[Math.round(Math.random()*playlist?.data?.data?.song.total)-1].artists,
       ))
 
      // console.log(playlist);
    }

    const handleClickArtists=async(artists)=>{
        dispatch(actions.setCurrentPage(false, false, true));
        const response=await apis.getArtist(artists);
        navigate('/'+artists);
        console.log('artist', response);
    }

    const handleHover = () => {
        setIsHover(true)
        imageRef.current.classList?.remove('animate-scale-down-image')
        imageRef.current.classList?.add('animate-scale-up-image')
    }
    const handleLeave = () => {
        setIsHover(false)
        imageRef.current.classList?.remove('animate-scale-up-image')
        imageRef.current.classList?.add('animate-scale-down-image')
    }
  return (
    <div className='w-1/5'>
        <div className='relative overflow-hidden rounded-full cursor-pointer'
         onMouseEnter={handleHover}
         onMouseLeave={handleLeave}
         onClick={()=>handleClickArtists(artistsNames)}
        >
            <img src={thumbnail} ref={imageRef} className='rounded-full'/>
            {isHover && <div className='absolute top-0 right-0 left-0 bottom-0 w-full h-full flex items-center justify-center bg-[#00000066]'>
                <CiShuffle size={30} className='border border-while rounded-full' onClick={handleClickPlaylist}/>
            </div>}
        </div>
        <div className='flex flex-col justify-center text-[12px] mt-3'>
            <span className='cursor-pointer hover:underline hover:text-main-500'>{artistsNames}</span>
            <span className='text-text-200'>{`${Math.floor(followers/1000)}K quan tâm`}</span>
            <span className='flex items-center justify-center px-3 rounded-full border w-fit mx-auto mt-1 border-main-100 hover:bg-[#2d2634] bg-[#2f2739] py-1 cursor-pointer'><AiOutlineUserAdd size={18}/> QUAN TÂM</span>
        </div>
    </div>
  )
}

export default memo(ArtistItem)