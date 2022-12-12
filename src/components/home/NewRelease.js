import React, {memo, useEffect, useState} from 'react'
import { CiLineHeight } from 'react-icons/ci';
import * as apis from '../../getApi/index'
import icons from '../../utils/icons' 
import SongItem from './SongItem'
const {BsChevronRight}=icons;
const NewRelease = () => {
    const [data, setData] = useState(null);
    const [songActive, setSongActive] = useState(null);
    useEffect(()=>{
        const callApi=async()=>{
            const response=await apis.apiGetNewRelease();
            setData(response?.data?.data);
            console.log(response?.data?.data);
          }
          callApi();
    }, [])
  return (
    <div className='text-text-100'>
        <div className='text-lg text-text-100 font-bold text-left mt-[50px]'>
        Mới Phát Hành
        </div>
        <div className='flex justify-between'>
        <div className='flex items-center gap-5 text-xs mt-[20px]'>
        <button
                    type='button'
                    
                    className='py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent bg-main-500'
                >
                   TẤT CẢ
                </button>
                <button
                    type='button'
                    
                    className='py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent'
                >
                    VIỆT NAM
                </button>
                <button
                    type='button'
                   
                    className='py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent'
                >
                    QUỐC TẾ
                </button>
            </div>
            <div className='flex text-[12px] items-center gap-2 cursor-pointer hover:text-main-500 text-text-200'>TẤT CẢ <BsChevronRight size={16}/></div>
        </div>
        <div className='h-auto my-5'>
           {data?.banner && <img src={data?.banner} className='w-full'/>}
        </div>
        <div className='flex w-full h-auto'>
           <div className='w-1/3'>
              {data && data.items.slice(0, 4).map((item, index)=>(<SongItem key={item.encodeId} thumbnail={item.thumbnailM} title={item.title} artists={item.artistsNames} timeRelease={item.releaseDate} songId={item.encodeId} playlist={data.items}/>))}
           </div>
           <div className='w-1/3'>
            {
                data && data.items.slice(4, 8).map((item, index)=>(<SongItem key={item.encodeId} thumbnail={item.thumbnailM} title={item.title} artists={item.artistsNames} timeRelease={item.releaseDate} songId={item.encodeId} playlist={data.items}/>))
            }
           </div>
           <div className='w-1/3'>
            {
                data && data.items.slice(8, 12).map((item, index)=>(<SongItem key={item.encodeId} thumbnail={item.thumbnailM} title={item.title} artists={item.artistsNames} timeRelease={item.releaseDate} songId={item.encodeId} playlist={data.items}/>))
            }
           </div>
            

            
        </div>
    </div>
  )
}

export default memo(NewRelease)