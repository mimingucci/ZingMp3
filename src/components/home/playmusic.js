import React, { useEffect, useState, useRef } from "react";
import { getCurrentSong } from "../../store/action/music";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import icons from "../../utils/icons";
import * as actions from "../../store/action";
import * as apis from "../../getApi";
var intervalId;
let nextSongInfo;
let previousSongInfo;
let nextSongLink;
let previousSongLink;
let duration;
const {
  AiOutlineHeart,
  BsThreeDots,
  CiRepeat,
  CiShuffle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  BsFillPlayFill,
  BsPauseFill,
  SlVolume1, 
  SlVolume2, 
  SlVolumeOff,
  BsMusicNoteList,
} = icons;
const Playmusic = ({setIsShowRightSidebar}) => {
  console.log('header')
  const {
    currentSongId,
    image,
    songName,
    artists,
    linkCurrentSong,
    isPlaying,
    prevSong,
    nextSong,
    listSongs,
  } = useSelector((state) => state.music);
  const [currentSong, setCurrentSong] = useState(currentSongId);
  const [volume, setVolume] = useState(50);
  const [songInfo, setSongInfo] = useState(null);
  const [isShuffle, setIsShuffle]=useState(false);
  const [currentTime, setcurrentTime] = useState(0);
  const [song, setSong] = useState(new Audio());
  const thumbRef = useRef();
  const trackRef = useRef();
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log("1");
    const testGetSong = async () => {
      song.pause();
      dispatch(actions.play(false));
      const [response1, response2] = await Promise.all([apis.getSong(currentSongId), apis.apiGetSong(currentSongId)]);
      if(response1.data.err===0){
        setSongInfo(response1?.data?.data);
      }
      if (response2.data.err === 0) {
        song.pause();
        setSong(new Audio(response2.data.data['128']));
        song.volume=volume/100;
    }}
    testGetSong();
    return () => {
      intervalId && clearInterval(intervalId);
      song.pause();
    };

  }, [currentSongId]);

  const play = async () => {
    await song.play();
  };
  const handleTogglePlayMusic = async () => {
    //neu nhac chua phat
    //song.load()
    if (!isPlaying) {
      //  song.load();
      await play();
      dispatch(actions.play(true));
    } else {
      song.pause();
      intervalId && clearInterval(intervalId);
      dispatch(actions.play(false));
    }
  };

  const handleSpooling = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect()
    const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
    thumbRef.current.style.cssText = `right: ${100 - percent}%`
    song.currentTime = percent * songInfo.duration / 100
    //setCurSeconds(Math.round(percent * songInfo.duration / 100))
  };

  const handleClickNextSong = async() => {
    nextSongInfo = await apis.getSong(listSongs[nextSong]);
   // previousSongInfo = await apis.getSong(listSongs[prevSong]);
    nextSongLink = await apis.apiGetSong(listSongs[nextSong]);
    //previousSongLink = await apis.apiGetSong(listSongs[prevSong]);
    console.log(nextSongInfo);
    //setCurrentSong(nextSongInfo?.data?.data.encodeId);
    // dispatch(
    //   actions.updateCurrentSongInAlbum(
    //     nextSong,
    //     nextSongInfo?.data?.data.encodeId,
    //     nextSongLink?.data?.data["128"],
    //     nextSongInfo?.data?.data.thumbnailM,
    //     nextSongInfo?.data?.data.title,
    //     nextSongInfo?.data?.data.artists
    //   )
      
    //);
    

  };

  useEffect(()=>{
    console.log('first');
  }, [])

  const handleClickPreviousSong = () => {
    dispatch(
      actions.updateCurrentSongInAlbum(
        prevSong,
        previousSongInfo?.data?.data.encodeId,
        previousSongLink?.data?.data["128"],
        previousSongInfo?.data?.data.thumbnailM,
        previousSongInfo?.data?.data.title,
        previousSongInfo?.data?.data.artists
      )
    );
  };

  const handleSetShuffle=()=>{
    if(!isShuffle){
      const handleRandomSong=()=>{
        const lengthAlbum=listSongs.length;
        const randomSongIndex=Math.random()*lengthAlbum-1;
        while(listSongs[randomSongIndex]===currentSongId){
           randomSongIndex=Math.random()*lengthAlbum-1;
        }
        dispatch(actions.setSongId(listSongs[randomSongIndex]));
      }
      song.addEventListener('ended', handleRandomSong);
    }
    setIsShuffle(!isShuffle);
  }

  useEffect( ()=>{
    const handleEnded=()=>{
      song.pause();
      dispatch(actions.play(false));
      alert('ended');
    }
    song.addEventListener("ended", handleEnded);
  },[song])

  useEffect(()=>{
    // console.log("change")
    // const randomIndex = Math.round(Math.random() * songs?.length) - 1
    // dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
    // dispatch(actions.play(true))
  } , [isShuffle])

  useEffect(() => {
    console.log(currentSong);
  }, [currentSong]);
  // useEffect(() => {
  //   console.log("2");
  //   setSong(new Audio(linkCurrentSong));
  //   song.load();
  //   play();
  //   dispatch(actions.play(true));
  //   return () => {
  //     intervalId && clearInterval(intervalId);
  //     song.pause();
  //   };
  // }, []);
  useEffect(() => {
    song.volume = volume / 100
}, [volume])

  useEffect(() => {
    console.log("3");
    song.load();
    if (!isPlaying) {
      song.volume=volume/100;
      play();
      dispatch(actions.play(true));
    }
    return () => {
      intervalId && clearInterval(intervalId);
      song.pause();
    };
  }, [song]);

  useEffect(() => {
    console.log("4");
    if (isPlaying) {
      play();
      //const thumbEl = document.getElementById("thumb-progress");
      intervalId = setInterval(() => {
        let percent =
        Math.round((song.currentTime * 10000) / songInfo.duration) / 100;
        //console.log(percent);
        setcurrentTime(Math.round(song.currentTime));
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
      }, 1000);
    } else {
      song.pause();
      intervalId && clearInterval(intervalId);
    }
    return () => {
      console.log("cleaup function");
      intervalId && clearInterval(intervalId);
      song.pause();
    };
  }, [isPlaying]);
  return (
    <div className="px-5 bg-main-400 h-full w-full text-text-100 flex flex-none">
      <div className="w-[30%] h-full flex items-center">
        <div>
          <img
            src={image}
            alt=""
            className="h-[64px] w-[64px] rounded-md block"
          />
        </div>
        <div className="flex flex-col text-left pl-2 text-[14px]">
          <span>{songName}</span>
          <span>{artists.map((artist) => artist?.name).join(", ")}</span>
        </div>
        <div className="flex gap-5 pl-7">
          <AiOutlineHeart />
          <BsThreeDots />
        </div>
      </div>
      <div className="w-[40%] h-full">
        <div className="flex justify-center gap-7 items-center h-1/2">
          <CiShuffle size={20} className={`cursor-pointer ${isShuffle ? 'text-main-500': ''}`} onClick={handleSetShuffle}/>
          <AiOutlineArrowLeft
            size={20}
            onClick={handleClickPreviousSong}
            className="cursor-pointer"
          />
          <div
            className="border rounded-[50%] w-[35px] h-[35px] flex items-center justify-center cursor-pointer"
            onClick={handleTogglePlayMusic}
          >
            {isPlaying ? (
              <BsPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </div>
          <AiOutlineArrowRight
            size={20}
            onClick={handleClickNextSong}
            className="cursor-pointer"
          />
          <CiRepeat size={24} />
        </div>
        <div className="w-full h-1/2 flex items-center text-[12px] text-text-200">
        <span className=''>{currentTime && moment.utc(currentTime * 1000).format('mm:ss')}</span>
          <div
            ref={trackRef}
            className="bg-text-200 relative m-auto h-[3px] w-4/5 rounded-l-full rounded-r-full cursor-pointer hover:h-[6px]"
            onClick={handleSpooling}
          >
            <div
              ref={thumbRef}
              id="thumb-progress"
              className="bg-[#0e8080] absolute top-0 left-0 h-full rounded-l-full rounded-r-full"
            ></div>
          </div>
          <span className=''>{songInfo?.duration && moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
        </div>
      </div>
      <div className="w-[30%] h-full">
      <div className='flex gap-2 items-center justify-center h-full'>
                    <span onClick={() => setVolume(prev => +prev === 0 ? 50 : 0)}>{+volume >= 50 ? <SlVolume2 /> : +volume === 0 ? <SlVolumeOff /> : <SlVolume1 />}</span>
                    <input
                        type="range"
                        step={1}
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                    />
                    <span onClick={() => setIsShowRightSidebar(prev => !prev)} className='p-1 rounded-sm cursor-pointer bg-main-500 opacity-90 hover:opacity-100'><BsMusicNoteList size={20} /></span>

                </div>
      </div>
    </div>
  );
};

export default Playmusic;
