import React, { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useDispatch } from 'react-redux';

import { Header } from '../home'
import * as apis from '../../getApi'
import icons from '../../utils/icons'
import * as actions from '../../store/action'
const AlbumMain = () => {
  const dispatch=useDispatch();
    const {CiLineHeight, FiMusic, BsDot}=icons
    let {pid}=useParams();
    const [currentAlbumId, setCurrentAlbumId]= useState(pid)
    const [albumDetail, setAlbumDetail]=useState(null)
    console.log(pid)
    useEffect(()=>{
        const getDetailPlaylist=async()=>{
           const response=await apis.apiGetDetaiPlaylist(pid);
           console.log('playlist',response);
           setAlbumDetail(response)
        }
        getDetailPlaylist()
    }, [pid])
    const handleClickSong=async(item)=>{
      console.log('item',item)
      const response=await apis.apiGetSong(item?.encodeId)
      dispatch(actions.setCurrentSongId(item?.encodeId, response?.data?.data['128'],item?.thumbnailM, item?.title, item?.artists))
      console.log('song detail', response)
    }
  return (
    <div className='h-full flex-auto bg-main-300'>
    <Header/>
    <div className='w-full h-full overflow-y-hidden bg-[#170f23] px-[60px] py-5 flex'>
        <div className='w-1/3'>
          <div className='rounded-sm w-full h-fit px-2'>
          <img src={albumDetail?.data?.data?.thumbnailM} alt="thumbnail" className='w-full object-cover rounded-md'/>
          </div>
          <div className='flex flex-col pt-2'>
                    <span className='font-semibold text-text-100 text-[20px]'>{albumDetail?.data?.data?.title}</span>
                    <span className='text-text-200 text-[14px]'>Cập nhật: {moment.unix(albumDetail?.data?.data?.contentLastUpdate).format("DD/MM/YYYY")} </span>
                    <span className='text-text-200 text-[14px]'>{albumDetail?.data?.data?.artistsNames}</span>
                    <span className='text-text-200 text-[14px]'>{`${Math.round(albumDetail?.data?.data?.like / 1000)}K người yêu thích`}</span>
                </div>
        </div>
        
      <Scrollbars style={{  width: '100%', height: '80%' }}>
        <div className='h-auto'>
          <span className='text-text-200 text-[14px] items-start flex'>Lời tựa <span className='text-text-100'> {albumDetail?.data?.data?.sortDescription}</span></span>
          <table className='w-full'>
            <thead>
               <tr className='text-text-200 border-b border-text-200 '>
                  <th className='w-[50%] text-left text-[12px] flex items-center gap-2'><CiLineHeight/> BÀI HÁT</th>
                  <th className='w-[30%] text-left text-[12px]'>ALBUM</th>
                  <th className='w-[20%] text-right text-[12px]'>THỜI GIAN</th>
               </tr>
            </thead>
            <tbody className='text-text-200'>
              {
                albumDetail?.data?.data?.song?.items?.map((item, index)=>(
                  <tr key={item?.encodeId} className='h-[55px] w-full border-b border-text-200 hover:bg-main-100' onClick={()=>handleClickSong(item)}>
                    <td className='flex text-xs'>
                      <div className='h-full flex justify-center items-center gap-2'>
                          <FiMusic/>
                          <div className='rounded-md h-[55px] w-auto py-[7px]'>
                             <img src={item?.thumbnailM} alt='Song Background' className='h-full w-auto rounded-md'/>
                          </div>
                      </div>
                      <div className='flex-col flex text-left px-2 h-[55px] py-[7px]'>
                        <span className='font-bold text-text-100'>{item?.title}</span>
                        <span>{item?.artistsNames}</span>
                      </div>
                    </td>
                    <td className='text-left text-[12px]'>{item?.album?.title}</td>
                    <td className='text-right text-[12px]'>{moment.utc(item?.duration*1000).format('mm:ss')}</td>
                  </tr>
                ))
              }
              <tr className='h-[55px] w-full'>
                <td className='flex items-center text-left text-[12px] py-[7px]'>{albumDetail?.data?.data?.song?.total} bài hát <BsDot/> {moment.utc(albumDetail?.data?.data?.song?.totalDuration * 1000).format('HH:mm:ss')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </Scrollbars>
    </div>
    </div>
  )
}

export default AlbumMain