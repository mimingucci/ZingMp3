import React, {memo} from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useSelector, useDispatch } from 'react-redux'
import actionType from '../../store/action/actionType'

import * as actions from '../../store/action'
import icons from '../../utils/icons'
import * as apis from '../../getApi'
import SongLoading from "../home/SongLoading"
import { useState } from 'react'
const {BsFillPlayFill} = icons;
const SongItem = ({thumbnail, title, artists, timeRelease, songId, playlist}) => {
  const {isPlaying, currentSongId}=useSelector((state)=>state.music);
  const dispatch=useDispatch();
  const handleClickSong=async()=>{
    const [response1, response2]=await Promise.all([apis.getSong(songId), apis.apiGetSong(songId)]);
    dispatch(actions.setCurrentSongId(songId, response2?.data?.data['128'], response1?.data?.data.thumbnailM, response1?.data?.data.title, response1?.data?.data.artists));
    dispatch(actions.setPlaylist(playlist));
    dispatch(actions.listSongsInAlbum(playlist));
    dispatch(actions.play(true));
  }
  return (
    <div
            className={`w-full flex p-[10px] gap-[10px] justify-between items-center rounded-md cursor-pointer hover:bg-main-100 ${songId===currentSongId ? 'bg-main-100':''}`}
            onClick={handleClickSong}
        >
            <div className='flex gap-4 group '>
                <div className='relative'>
                <img src={thumbnail} alt="thumbnail" className='w-[60px] h-[60px] object-cover rounded-md' />
                <div className={`${songId===currentSongId ? 'flex z-0': 'hidden'} absolute z-10 top-0 left-0 bottom-0 right-0 hover:bg-[rgba(0,0,0,0.3)] group-hover:flex text-white items-center justify-center`}>
                        <span className='p-3'>
                            {(songId===currentSongId && isPlaying) ? <SongLoading /> : <BsFillPlayFill size={30} />}
                        </span>
                    </div>
                </div>
                <div className='flex flex-col text-left'>
                    <span className='text-sm font-semibold'>{title}</span>
                    <span className='text-xs opacity-70'>{artists}</span>
                    {timeRelease && <span className={`text-xs opacity-70`}>{moment(timeRelease * 1000).fromNow()}</span>}
                </div>
            </div>
        </div>
  )
}

export default memo(SongItem)