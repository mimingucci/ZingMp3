import React, {useEffect, useState, useRef} from 'react'
import { getCurrentSong} from '../../store/action/music'
import { useDispatch, useSelector } from 'react-redux'
import icons from '../../utils/icons'
import * as actions from '../../store/action'
import * as apis from'../../getApi'
let intervalId;
const Playmusic = () => {
    const {currentSongId, image, songName, artists, linkCurrentSong, isPlaying}=useSelector(state=>state.music)
    const [currentSong, setCurrentSong]=useState(currentSongId);
    const [songInfo, setSongInfo]=useState(null);
    const {AiOutlineHeart, BsThreeDots, CiRepeat, AiOutlineArrowLeft, AiOutlineArrowRight, BsFillPlayFill, BsPauseFill}=icons;
    const [song, setSong]=useState(new Audio())

    const thumbRef=useRef();
    const trackRef=useRef();

    const dispatch=useDispatch();
    useEffect(()=>{
        const testGetSong=async()=>{
            //song.pause();
            dispatch(actions.play(false));
            const response=await apis.getSong(currentSong);
            setSongInfo(response?.data?.data);
            console.log('x', response);
            //setSong(new Audio(response?.data?.data['128']));
            setSong(new Audio(linkCurrentSong));
        }
        testGetSong();
    }, [currentSongId])
    
    const play=async()=>{
       await song.play();
    }
    const handleTogglePlayMusic=async()=>{
      //neu nhac chua phat 
      //song.load()
      if(!isPlaying){
        //  song.load();
         play();
         dispatch(actions.play(true));
       }else{
          song.pause();
          dispatch(actions.play(false));
       }
    }

  const handleSpooling=(e)=>{
      
      const thumb=document.getElementById('thumb-progress');
      //console.log(document.getElementById('thumb-progress').getBoundingClientRect().);
      const time=(e.clientX-trackRef.current.offsetLeft)/(thumb.getBoundingClientRect().right-thumb.getBoundingClientRect().left);
      console.log(time);
  }
  useEffect(()=>{
      setSong(new Audio(linkCurrentSong));
      song.load();
      play();
      dispatch(actions.play(true));
    }, [])
  useEffect(() => {
      song.load();
      if (!isPlaying){ 
       play()
       dispatch(actions.play(true))
      }
  }, [song])
  useEffect(()=>{
     if(isPlaying){
        play();
        const thumbEl = document.getElementById('thumb-progress');
        intervalId = setInterval(() => {
          let percent = Math.round(song.currentTime * 10000 / songInfo.duration) / 100;
          //console.log(percent)
          thumbRef.current.style.cssText = `right: ${100 - percent}%`
      }, 200);
     }else{
        song.pause();
        intervalId && clearInterval(intervalId);
     }
    
  }, [isPlaying])
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
           <div className='border rounded-[50%] w-[35px] h-[35px] flex items-center justify-center cursor-pointer' onClick={handleTogglePlayMusic}>
           {isPlaying ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30}/>}
           </div>
           <AiOutlineArrowRight size={20}/>
           <CiRepeat size={24}/>
        </div>
        <div className='w-full h-1/2 flex items-center'>
        <div ref={trackRef} className='bg-text-200 relative m-auto h-[3px] w-4/5 rounded-l-full rounded-r-full cursor-pointer hover:h-[6px]' onClick={handleSpooling}>
                        <div ref={thumbRef} id='thumb-progress' className='bg-[#0e8080] absolute top-0 left-0 h-full rounded-l-full rounded-r-full'></div>
                    </div>
        </div>
      </div>
      <div className='w-[30%] bg-slate-500 h-full'></div>
    </div>
  )
}

export default Playmusic