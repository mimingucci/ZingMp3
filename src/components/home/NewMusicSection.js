import React,{useRef} from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import actionType from '../../store/action/actionType'

import * as actions from '../../store/action'
import icons from '../../utils/icons'
import * as apis from '../../getApi'
import SongLoading from "../home/SongLoading"
import { useState } from 'react'

const {BsFillPlayFill}=icons;
const NewMusicSection = ({thumbnail, title, artists, timeRelease, songId, order, message}) => {
    const {currentSongId, isPlaying}=useSelector(state=>state.music);
    const dispatch=useDispatch();

    const [isHover, setIsHover] = useState(false);
    const imageRef = useRef();

    const handleClickSong=async()=>{
      const [response, res]=await Promise.all([apis.apiGetSong(songId), apis.getSong(songId)]);
      dispatch(actions.setCurrentSongId(songId, response?.data?.data['128'], thumbnail, title, artists));
      dispatch(actions.play(true));
      //console.log('res', res)
      dispatch(actions.pustSongToHistory(res?.data?.data));
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
    <div
            className={`w-[95%] flex p-[10px] gap-[10px] items-center rounded-md cursor-pointer bg-main-100 justify-center mx-auto`}
            onClick={handleClickSong}
        >
            <div className='flex gap-4 group '
            
            >
                <div className='relative overflow-hidden rounded-md'
               onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                >
                    {isHover && <div className='absolute top-0 bottom-0 z-40 left-0 right-0 bg-overlay-30 rounded-lg text-white flex items-center justify-center gap-3 hover:bg-[rgba(0,0,0,0.3)]'>
                    <span
                       
                        className='p-1 border border-white rounded-full'
                    >
                        
                        {(songId===currentSongId && isPlaying) ? <SongLoading /> : <BsFillPlayFill size={30} />}
                    </span>
                   
                </div>}
                {thumbnail && <img ref={imageRef} src={thumbnail} alt="thumbnail" className='w-[120px] h-[120px] object-cover rounded-md' />}
                <div className={`${songId===currentSongId ? 'flex z-0': 'hidden'} absolute z-10 top-0 left-0 bottom-0 right-0 hover:bg-[rgba(0,0,0,0.3)] group-hover:flex text-white items-center justify-center`}>
                        <span className='p-3'>
                            {(songId===currentSongId && isPlaying) ? <SongLoading /> : <BsFillPlayFill size={30} />}
                        </span>
                    </div>
                </div>
                <div className='flex flex-col text-left text-text-100 relative h-[120px]'>
                    <span className='text-base font-semibold'>{title}</span>
                    <span className='text-xs opacity-70 text-text-200'>{artists}</span>
                    <div className='text-text-200 flex justify-between absolute bottom-0 w-full'>
                    {order && <div className='align-bottom inline-block text-[50px] mt-auto'>#{order}</div>}
                    {timeRelease && <div className={`text-xs opacity-70 align-text-bottom inline-block mt-auto `}>{moment.unix(timeRelease).format("MM.DD.YYYY")}</div>}

                    </div>
                </div>
            </div>
            {message && <span className='text-[16px] text-text-200 hover:text-main-500'>{message}</span>}
        </div>
  )
}

export default NewMusicSection