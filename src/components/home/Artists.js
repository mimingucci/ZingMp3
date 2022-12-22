import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import * as actions from '../../store/action'
import icons from '../../utils/icons'
import SongItem from './SongItem';
import moment from 'moment';
import ArtistItem from './ArtistItem';

import * as apis from '../../getApi'
import Section from './Section';
const {BsFillPlayFill, AiOutlineUserAdd, BsChevronRight}=icons;
let searchdata;
const Artists = () => {
  const format = num => 
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
  const dispatch=useDispatch();
  let {artists}=useParams();
  //const {searchdata}=useSelector(state=>state.app);
    console.log('artistsPage', searchdata);
    useEffect(()=>{
         console.log('path', artists);
         const getApi=async()=>{
          const response=await apis.getArtist(artists);
          searchdata=response?.data?.data;
         }
         getApi();
    }, [])
  return (
    <div className='w-full h-full bg-main-300'>
      <div className='relative'>
        <div className='relative h-auto w-full'>
        <img src={searchdata?.cover} className='w-full h-auto'/>
        <div className='absolute right-0 left-0 top-0 bottom-0 opacity-30 bg-gradient-to-t from-neutral-900 via-neutral-50 to-neutral-900'></div>
        </div>
        <div className='absolute bottom-3 left-10'>
          <div className='flex gap-5 items-center'><span className='font-bold text-[55px] text-text-100'>{searchdata?.name}</span><span className='bg-white rounded-full flex items-center justify-center p-[6px] text-main-500 hover:bg-main-500 hover:text-text-100 cursor-pointer'><BsFillPlayFill size={35}/></span></div>
          <div className='flex text-left gap-2 text-text-100 items-center'><span>{format(searchdata?.totalFollow)} người quan tâm</span>
            <span className='flex items-center justify-center px-3 rounded-full border w-fit mx-auto mt-1 border-text-100 hover:bg-[#a39696b3] bg-[#a396964d] py-[1px] cursor-pointer text-[12px]'><AiOutlineUserAdd size={14}/> QUAN TÂM</span>
          </div>
        </div>
      </div>
      <div className='px-[60px]'>
      <div>
            <div className="flex justify-between mt-10">
              <div className="flex items-center text-[20px] font-bold text-text-100">
              Bài hát nổi bật
              </div>
              <div className="flex items-center text-[12px] text-text-200 hover:text-main-500 cursor-pointer">
                TẤT CẢ <BsChevronRight />
              </div>
            </div>
            <div className="w-full h-auto flex gap-3 text-text-100">
              <div className="w-1/2">
                {searchdata &&
                searchdata?.sections[0].items
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
                searchdata?.sections[0].items
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
          <div>
          {searchdata?.sections.filter((item, index)=>(index===1 || index===2 || index===4 || index===5)).map((item, index)=><Section key={index} sectionType={item} title={item.title} style={'w-1/5'}/>)}
          </div>
          <div>
            <div className="flex justify-between">
              <div className="items-center text-[20px] font-bold text-text-100">MV</div>
              <div className="flex items-center text-[12px] text-text-200 hover:text-main-500 cursor-pointer">
                TẤT CẢ <BsChevronRight />
              </div>
            </div>
            <div className="flex gap-7 mt-5 text-text-100">
              {searchdata?.sections[3].items.filter((video, index)=>index<3).map((video, index)=>(<div className={`w-1/3`} key={index}>
                <div className="relative text-text-100">
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
      <div className='text-text-100'>
          <div className="flex justify-between mb-5 mt-5">
              <div className="items-center text-[20px] font-bold">{searchdata?.sections[6].title}</div>
              <div className="flex items-center text-[12px] text-text-200 hover:text-main-500 cursor-pointer">
                TẤT CẢ <BsChevronRight />
              </div>
            </div>
            <div className="w-full flex gap-7 pb-[50px]">
                {searchdata?.sections[6].items.filter((artist, index)=>index<5).map((artist, index)=>(<ArtistItem thumbnail={artist.thumbnailM} artistsNames={artist.name} followers={artist.totalFollow} playlistId={artist.playlistId} id={artist.id} key={artist.id}/>))}
            </div>
          </div>
          <div className='text-text-100'>
            <div className='text-left font-semibold text-[18px]'>
              Về {searchdata?.name}
            </div>
            <div className='flex mt-5'>
              <div className='w-2/5 h-[260px] overflow-hidden rounded-md'><img src={searchdata?.thumbnailM} className='w-full'/></div>
              <div className='w-3/5 pl-5'>
                <div className='text-text-200 text-[14px]'>
                {searchdata?.biography}
                </div>
                <div className='flex flex-col text-left mt-5'>
                  <span className='font-semibold text-[18px]'>{format(searchdata?.totalFollow)}</span>
                  <span className='text-text-200 text-[14px]'>Người quan tâm</span>
                </div>
                </div>
            </div>
          </div>
    </div>
    </div>
  )
}

export default Artists