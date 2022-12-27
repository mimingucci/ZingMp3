import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import icons from '../../utils/icons'
import moment from 'moment'
import * as apis from '../../getApi'
import * as actions from '../../store/action'

const {CiLineHeight, FiMusic}=icons;
const SearchSong = () => {
    const dispatch = useDispatch();
    const {currentSongId}=useSelector((state)=>state.music);
    const {searchdata}=useSelector(state=>state.app);
    console.log(searchdata);

    const handleClickSong = async (item, index) => {
        
        const response=await apis.apiGetSong(item?.encodeId)
       
        dispatch(actions.setCurrentSongId(item?.encodeId, response?.data?.data['128'],item?.thumbnailM, item?.title, item?.artists));
        dispatch(actions.pustSongToHistory(item));
      };
  return (
    <div className='bg-white w-full h-full text-black'>
       <div className='bg-main-300 h-auto px-[60px]'>
        <div className='text-left text-[20px] font-bold text-text-100 mt-[20px]'>Bài Hát</div>
       <table className="w-full h-auto">
              
              <tbody className="text-text-200">
                {searchdata?.songs?.map((item, index) => (
                  <tr
                    key={item?.encodeId}
                    className={`px-2 rounded-md cursor-pointer h-[55px] w-full border-b border-text-200 hover:bg-main-100 ${currentSongId===item?.encodeId ? 'bg-[#3a3344]': ''}`}
                    onClick={() => handleClickSong(item, index)}
                  >
                    <td className="flex text-xs">
                      <div className="h-full flex justify-center items-center gap-2">
                        
                        <div className="rounded-md h-[55px] w-auto py-[7px]">
                          <img
                            src={item?.thumbnailM}
                            alt="Song Background"
                            className="h-full w-auto rounded-md"
                          />
                        </div>
                      </div>
                      <div className="flex-col flex text-left px-2 h-[55px] py-[7px]">
                        <span className="font-bold text-text-100">
                          {item?.title}
                        </span>
                        <span>{item?.artistsNames}</span>
                      </div>
                    </td>
                    <td className="text-left text-[12px]">
                      {item?.album?.title}
                    </td>
                    <td className="text-right text-[12px]">
                      {moment.utc(item?.duration * 1000).format("mm:ss")}
                    </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
       </div>
    </div>
  )
}

export default SearchSong