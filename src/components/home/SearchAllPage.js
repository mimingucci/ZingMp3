import React, { useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../utils/icons";
import SectionItem from "./SectionItem";
import SongItem from "./SongItem";
import Section from "./Section";
import { Outlet } from "react-router-dom";

import * as apis from "../../getApi";
import * as actions from '../../store/action'
import moment from "moment";
import ArtistItem from "./ArtistItem";
import { CiLineHeight } from "react-icons/ci";
const { CiShuffle, BsChevronRight } = icons;

const SearchAllPage = () => {
  const [isHover, setIsHover] = useState([false, false, false]);
  const { searchdata, currentUrl } = useSelector((state) => state.app);
  const path=window.location.pathname;
  //console.log(searchdata);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(actions.setCurrentPage(false, true));
    dispatch(actions.setCurrentUrl(path));
    return ()=>dispatch(actions.setCurrentPage(true, false));
  }, [])
  

  const dispatchUrl=(path)=>{
    dispatch(actions.setCurrentUrl(path));
  }
  

  const imageRef0 = useRef(false);
  const imageRef1 = useRef(false);
  const imageRef2 = useRef(false);
  const handleHover = (index) => {
    const arr = [false, false, false];
    arr[index] = true;
    setIsHover(arr);
    if (index === 0) {
      imageRef0.current.classList?.remove("animate-scale-down-image");
      imageRef0.current.classList?.add("animate-scale-up-image");
    }
    if (index === 1) {
      imageRef1.current.classList?.remove("animate-scale-down-image");
      imageRef1.current.classList?.add("animate-scale-up-image");
    }
    if (index === 2) {
      imageRef2.current.classList?.remove("animate-scale-down-image");
      imageRef2.current.classList?.add("animate-scale-up-image");
    }
  };

  const handleLeave = (index) => {
    setIsHover([false, false, false]);
    if (index === 0) {
      imageRef0.current.classList?.remove("animate-scale-up-image");
      imageRef0.current.classList?.add("animate-scale-down-image");
    }
    if (index === 1) {
      imageRef1.current.classList?.remove("animate-scale-up-image");
      imageRef1.current.classList?.add("animate-scale-down-image");
    }
    if (index === 2) {
      imageRef2.current.classList?.remove("animate-scale-up-image");
      imageRef2.current.classList?.add("animate-scale-down-image");
    }
  };
  return (
    <div className="w-full text-text-100 h-full">
      <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
        <div className="flex w-full border-[#2c2437] border-solid border-b px-[60px] gap-7 text-[14px] items-center">
          <div className="text-[24px] font-bold border-[#2c2437] border-solid border-r pr-7 h-full">
            Kết Quả Tìm Kiếm
          </div>

          <div className={`cursor-pointer text-[#b0aeb3] hover:text-text-100 h-full ${currentUrl==='/tim-kiem/tat-ca'?'border-solid border-main-500 border-b': ''}`}>
            <NavLink to="/tim-kiem/tat-ca" onClick={()=>dispatchUrl('/tim-kiem/tat-ca')}>TẤT CẢ</NavLink>
          </div>
          <div className={`cursor-pointer text-[#b0aeb3] hover:text-text-100 h-full ${currentUrl==='/tim-kiem/tat-ca/bai-hat'?'border-solid border-main-500 border-b': ''}`}>
            <NavLink to="bai-hat" onClick={()=>dispatchUrl('/tim-kiem/tat-ca/bai-hat')}>BÀI HÁT</NavLink>
          </div>
          <div className={`cursor-pointer text-[#b0aeb3] hover:text-text-100 h-full ${currentUrl==='/tim-kiem/tat-ca/playlist'?'border-solid border-main-500 border-b': ''}`}>
            <NavLink to="playlist" onClick={()=>dispatchUrl('/tim-kiem/tat-ca/playlist')}>PLAYLIST/ALBUM</NavLink>
          </div>
          <div className={`cursor-pointer text-[#b0aeb3] hover:text-text-100 h-full ${currentUrl==='/tim-kiem/tat-ca/artists'?'border-solid border-main-500 border-b': ''}`}>
            <NavLink to="artists" onClick={()=>dispatchUrl('/tim-kiem/tat-ca/artists')}>NGHỆ SĨ/OA</NavLink>
          </div>
          <div className="cursor-pointer text-[#b0aeb3] hover:text-text-100 h-full">
            <NavLink to="video">MV</NavLink>
          </div>
        </div>
        
        <Outlet />
       
        <div className={`w-full h-full px-[60px] ${currentUrl!=='/tim-kiem/tat-ca' ? 'hidden': ''}`}>
          <div>
            <div className="text-left font-bold text-[20px] py-5">Nổi Bật</div>
            <div className="flex w-full gap-6">
              {/* {searchdata?.artists?.slice(0, 3).map((artist, index)=><div key={index} className='flex text-text-200 text-[12px] items-center flex-1 bg-[#231b2e] p-2 rounded-md cursor-pointer hover:bg-main-100 overflow-hidden'
               onMouseEnter={(index)=>handleHover(index)}
               onMouseLeave={(index)=>handleLeave(index)}
          >
            <div className='relative group overflow-hidden rounded-full'>
              <img ref={index===0 ? imageRef0: (index===1 ? imageRef1: imageRef2)} src={artist.thumbnailM} alt='avatar' className='h-[85px] w-[85px] rounded-full overflow-hidden'/>
              <div className={`absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-[rgba(0,0,0,0.3)] rounded-full ${isHover[index] ? 'flex' :'hidden'} text-text-100`}><CiShuffle size={24} /></div>
            </div>
            <div className='flex flex-col text-left pl-3'>
              <span>Nghệ sĩ</span>
              <span className='text-text-100 font-semibold text-[14px]'>{artist.name}</span>
              <span>{Math.floor(artist.totalFollow/1000)}K quan tâm</span>
            </div>
          </div>) } */}
              <div
                className="flex text-text-200 text-[12px] items-center flex-1 bg-[#231b2e] p-2 rounded-md cursor-pointer hover:bg-main-100 overflow-hidden"
                onMouseEnter={() => handleHover(0)}
                onMouseLeave={() => handleLeave(0)}
              >
                <div className="relative group overflow-hidden rounded-full">
                  <img
                    ref={imageRef0}
                    src={searchdata?.artists[0].thumbnailM}
                    alt="avatar"
                    className="h-[85px] w-[85px] rounded-full overflow-hidden"
                  />
                  <div
                    className={`absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-[rgba(0,0,0,0.3)] rounded-full ${
                      isHover[0] ? "flex" : "hidden"
                    } text-text-100`}
                  >
                    <CiShuffle size={24} />
                  </div>
                </div>
                <div className="flex flex-col text-left pl-3">
                  <span>Nghệ sĩ</span>
                  <span className="text-text-100 font-semibold text-[14px]">
                    {searchdata?.artists[0].name}
                  </span>
                  <span>
                    {Math.floor(searchdata?.artists[0].totalFollow / 1000)}K
                    quan tâm
                  </span>
                </div>
              </div>
              <div
                className="flex text-text-200 text-[12px] items-center flex-1 bg-[#231b2e] p-2 rounded-md cursor-pointer hover:bg-main-100 overflow-hidden"
                onMouseEnter={() => handleHover(1)}
                onMouseLeave={() => handleLeave(1)}
              >
                <div className="relative group overflow-hidden rounded-full">
                  <img
                    ref={imageRef1}
                    src={searchdata?.artists[1].thumbnailM}
                    alt="avatar"
                    className="h-[85px] w-[85px] rounded-full overflow-hidden"
                  />
                  <div
                    className={`absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-[rgba(0,0,0,0.3)] rounded-full ${
                      isHover[1] ? "flex" : "hidden"
                    } text-text-100`}
                  >
                    <CiShuffle size={24} />
                  </div>
                </div>
                <div className="flex flex-col text-left pl-3">
                  <span>Nghệ sĩ</span>
                  <span className="text-text-100 font-semibold text-[14px]">
                    {searchdata?.artists[1].name}
                  </span>
                  <span>
                    {Math.floor(searchdata?.artists[1].totalFollow / 1000)}K
                    quan tâm
                  </span>
                </div>
              </div>
              <div
                className="flex text-text-200 text-[12px] items-center flex-1 bg-[#231b2e] p-2 rounded-md cursor-pointer hover:bg-main-100 overflow-hidden"
                onMouseEnter={() => handleHover(2)}
                onMouseLeave={() => handleLeave(2)}
              >
                <div className="relative group overflow-hidden rounded-full">
                  <img
                    ref={imageRef2}
                    src={searchdata?.artists[2].thumbnailM}
                    alt="avatar"
                    className="h-[85px] w-[85px] rounded-full overflow-hidden"
                  />
                  <div
                    className={`absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-[rgba(0,0,0,0.3)] rounded-full ${
                      isHover[2] ? "flex" : "hidden"
                    } text-text-100`}
                  >
                    <CiShuffle size={24} />
                  </div>
                </div>
                <div className="flex flex-col text-left pl-3">
                  <span>Nghệ sĩ</span>
                  <span className="text-text-100 font-semibold text-[14px]">
                    {searchdata?.artists[2].name}
                  </span>
                  <span>
                    {Math.floor(searchdata?.artists[2].totalFollow / 1000)}K
                    quan tâm
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <div className="flex items-center">
              <div className="overflow-hidden rounded-md">
                <img
                  src={searchdata.top.thumbnail}
                  className="w-[50px] h-[50px] rounded-md cursor-pointer hover:animate-scale-up-image"
                />
              </div>
              <div className="flex flex-col text-left pl-4">
                <span className="text-[14px] text-text-200">
                  PLAYLIST NỔI BẬT
                </span>
                <span className="font-bold cursor-pointer hover:text-main-500">
                  {searchdata.top.name}
                </span>
              </div>
            </div>
            <div className="flex items-center text-[12px] text-text-200 hover:text-main-500 cursor-pointer">
              TẤT CẢ <BsChevronRight />
            </div>
          </div>
          <div className="flex w-full gap-6 mt-5">
            {searchdata?.playlists?.filter((playlist, index)=>index<5)?.map((playlist, index) => (
              <SectionItem
                key={playlist.encodeId}
                thumbnailM={playlist.thumbnailM}
                title={playlist.title}
                sortDescription={playlist.sortDescription}
                artistsNames={playlist.artistsNames}
                link={playlist.link.split(".")[0]}
              />
            ))}
          </div>
          <div>
            <div className="flex justify-between mt-10">
              <div className="flex items-center text-[20px] font-bold">
                Bài Hát
              </div>
              <div className="flex items-center text-[12px] text-text-200 hover:text-main-500 cursor-pointer">
                TẤT CẢ <BsChevronRight />
              </div>
            </div>
            <div className="w-full h-auto flex gap-3">
              <div className="w-1/2">
                {searchdata &&
                  searchdata.songs
                    .slice(0, 3)
                    .map((item, index) => (
                      <SongItem
                        key={item.encodeId}
                        thumbnail={item.thumbnailM}
                        title={item.title}
                        artists={item.artistsNames}
                        timeRelease={item.releaseDate}
                        songId={item.encodeId}
                        playlist={searchdata.songs}
                      />
                    ))}
              </div>
              <div className="w-1/2">
                {searchdata &&
                  searchdata.songs
                    .slice(4, 7)
                    .map((item, index) => (
                      <SongItem
                        key={item.encodeId}
                        thumbnail={item.thumbnailM}
                        title={item.title}
                        artists={item.artistsNames}
                        timeRelease={item.releaseDate}
                        songId={item.encodeId}
                        playlist={searchdata.songs}
                      />
                    ))}
              </div>
            </div>
          </div>
          <Section
            sectionType={searchdata}
            artists={false}
            sortDescription={true}
            title={"Playlist/Album"}
          />
          <div>
            <div className="flex justify-between">
              <div className="items-center text-[20px] font-bold">MV</div>
              <div className="flex items-center text-[12px] text-text-200 hover:text-main-500 cursor-pointer">
                TẤT CẢ <BsChevronRight />
              </div>
            </div>
            <div className="flex gap-7 mt-5">
              {searchdata.videos.filter((video, index)=>index<3).map((video, index)=>(<div className={`w-1/3`}>
                <div className="relative">
                  <img src={video.thumbnailM} alt='image-video' className={`rounded-md cursor-pointer ${video.streamingStatus===2 ? 'bg-[#000000cc]' : ''}`}/>
                  <span className="absolute bottom-2 right-2 bg-black px-1 rounded-lg flex items-center">{moment.utc(moment.duration(video.duration, "seconds").asMilliseconds()).format('mm:ss')}</span>
                  {video.streamingStatus===2 ? <span className="absolute top-2 left-2 bg-yellow-400 rounded-md font-semibold flex items-center justify-center px-[5px] text-black text-[12px]">VIP</span> : ''}               
                </div>
                <div className="flex mt-2">
                  <div><img src={video.artist.thumbnail} className={`rounded-full h-[40px] w-[40px] cursor-pointer ${video.streamingStatus===2 ? 'bg-[#000000e6]' : ''}`}/></div>
                  <div className="flex flex-col text-left ml-2">
                     <span>{video.title}</span>
                     <span className="text-text-200 text-[12px] hover:text-main-500 cursor-pointer hover:underline">{video.artistsNames}</span>
                  </div>
                </div>
              </div>))}
            </div>
          </div>
          <div>
          <div className="flex justify-between mb-5 mt-5">
              <div className="items-center text-[20px] font-bold">Nghệ Sĩ/OA</div>
              <div className="flex items-center text-[12px] text-text-200 hover:text-main-500 cursor-pointer">
                TẤT CẢ <BsChevronRight />
              </div>
            </div>
            <div className="w-full flex gap-7 pb-[50px]">
                {searchdata.artists.filter((artist, index)=>index<5).map((artist, index)=>(<ArtistItem thumbnail={artist.thumbnailM} artistsNames={artist.name} followers={artist.totalFollow} playlistId={artist.playlistId} id={artist.id} key={artist.id}/>))}
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default SearchAllPage;
