import React, { useEffect, useState, useRef } from "react";
import { getCurrentSong } from "../../store/action/music";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../utils/icons";
import * as actions from "../../store/action";
import * as apis from "../../getApi";
var intervalId;
let nextSongInfo;
let previousSongInfo;
let nextSongLink;
let previousSongLink;
const Playmusic = () => {
  
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
  const [songInfo, setSongInfo] = useState(null);
  const {
    AiOutlineHeart,
    BsThreeDots,
    CiRepeat,
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    BsFillPlayFill,
    BsPauseFill,
  } = icons;
  const [song, setSong] = useState(new Audio());
  const thumbRef = useRef();
  const trackRef = useRef();

  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log("1");
    console.log(currentSongId);
    const testGetSong = async () => {
      song.pause();
      dispatch(actions.play(false));
      const response = await apis.getSong(currentSong);
      nextSongInfo = await apis.getSong(listSongs[nextSong]);
      previousSongInfo = await apis.getSong(listSongs[prevSong]);
      nextSongLink = await apis.apiGetSong(listSongs[nextSong]);
      previousSongLink = await apis.apiGetSong(listSongs[prevSong]);
      setSongInfo(response?.data?.data);
      setSong(new Audio(linkCurrentSong));
    };
    testGetSong();
    return () => {
      console.log("clreaup function");
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
    //const thumb=document.getElementById('thumb-progress');
    const time = (e.clientX - trackRef.current.offsetLeft) / 473.43;
    console.log(time);
    song.currentTime = Math.round(songInfo.duration * time);
    thumbRef.current.style.cssText = `right: ${100 - Math.round(time * 100)}%`;
  };

  const handleClickNextSong = () => {
    setCurrentSong(nextSongInfo?.data?.data.encodeId);
    dispatch(
      actions.updateCurrentSongInAlbum(
        nextSong,
        nextSongInfo?.data?.data.encodeId,
        nextSongLink?.data?.data["128"],
        nextSongInfo?.data?.data.thumbnailM,
        nextSongInfo?.data?.data.title,
        nextSongInfo?.data?.data.artists
      )
      
    );
    // currentSongId=nextSongInfo?.data?.data.encodeId;
    // nextSong=nextSong+1;
    // image=nextSongInfo?.data?.data.thumbnailM;
  };
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
  useEffect(() => {
    console.log(currentSong);
  }, [currentSong]);
  useEffect(() => {
    console.log("2");
    setSong(new Audio(linkCurrentSong));
    song.load();
    play();
    dispatch(actions.play(true));
    return () => {
      console.log("clreaup function");
      intervalId && clearInterval(intervalId);
      song.pause();
    };
  }, []);
  useEffect(() => {
    console.log("3");
    song.load();
    if (!isPlaying) {
      play();
      dispatch(actions.play(true));
    }
    return () => {
      console.log("clreaup function");
      intervalId && clearInterval(intervalId);
      song.pause();
    };
  }, [song]);
  useEffect(() => {
    console.log("4");
    if (isPlaying) {
      play();
      const thumbEl = document.getElementById("thumb-progress");
      intervalId = setInterval(() => {
        let percent =
          Math.round((song.currentTime * 10000) / songInfo.duration) / 100;
        console.log(percent);
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
      }, 1000);
    } else {
      song.pause();
      intervalId && clearInterval(intervalId);
    }
    return () => {
      console.log("clreaup function");
      intervalId && clearInterval(intervalId);
      song.pause();
    };
  }, [isPlaying]);
  return (
    <div className="px-5 bg-main-400 h-full w-full text-text-100 flex">
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
          <CiRepeat size={20} />
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
        <div className="w-full h-1/2 flex items-center">
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
        </div>
      </div>
      <div className="w-[30%] bg-slate-500 h-full"></div>
    </div>
  );
};

export default Playmusic;
