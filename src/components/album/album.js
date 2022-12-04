import React, { useEffect, useState } from 'react'
import App from '../../App'
import { useParams } from 'react-router-dom'
import { Header } from '../home'
import * as apis from '../../getApi'
const AlbumMain = () => {
    let {pid}=useParams();
    const [currentAlbumId, setCurrentAlbumId]= useState(pid)
    const [albumDetail, setAlbumDetail]=useState(null)
    console.log(pid)
    useEffect(()=>{
        const getDetailPlaylist=async()=>{
           const response=await apis.apiGetDetaiPlaylist(pid);
           console.log(response);
           setAlbumDetail(response)
        }
        getDetailPlaylist()
    }, [pid])
  return (
    <div className='h-full flex-auto bg-main-300'>
    <Header/>
    <div className='w-full h-full overflow-y-hidden bg-[#170f23] px-[60px] py-5 flex'>
        <div className='w-1/3'>
          <div className='rounded-sm w-full h-fit px-2'>
          <img src={albumDetail?.data?.data?.thumbnailM} alt="thumbnail" className='w-full object-cover rounded-md'/>
          </div>
          <div className='flex flex-col'>
                    <span className='font-semibold text-gray-700 text-sm'>{albumDetail?.data?.data?.title}</span>
                    <span className='text-xs text-gray-500'>{albumDetail?.data?.data?.artistsNames}</span>
                </div>
        </div>
        <div className='w-2/3 border'>Right</div>
    </div>
    </div>
  )
}

export default AlbumMain