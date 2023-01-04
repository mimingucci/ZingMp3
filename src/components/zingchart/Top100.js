import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import * as actions from '../../store/action'
import icons from '../../utils/icons'
import * as apis from '../../getApi'
import { useDispatch } from 'react-redux'

const {FiMusic}=icons;
const Top100 = () => {
  const dispatch=useDispatch();
  const {vietnam}=useSelector(state=>state.top100);
  const {currentSongId} = useSelector(state=>state.app);
  const handleClickSong = async (item, index) => {
    const response=await apis.apiGetSong(item?.encodeId);
    dispatch(actions.setCurrentSongId(item?.encodeId, response?.data?.data['128'],item?.thumbnailM, item?.title, item?.artists));
    dispatch(actions.pustSongToHistory(item));
  };
 
  return (
    <div className='w-full h-auto bg-main-300 text-text-200 px-[60px] justify-center listTop100VietNam'>
       {vietnam.filter((item, index)=>index<10).map((item, index) => (
                  <div
                    key={item?.encodeId}
                    className={`h-[55px] w-full border-b border-text-200 hover:bg-main-100 flex items-center justify-between cursor-pointer px-2 rounded-md ${currentSongId===item?.encodeId ? 'bg-[#3a3344]': ''}`}
                    onClick={() => handleClickSong(item, index)}
                  >
                    <div className="flex text-xs">
                      <div className="h-full flex justify-center items-center gap-2">
                        <div className={`text-[30px] text-main-300 mr-3 ${index>2 ? 'text-shadow-default' : (index===0 ? 'text-shadow-no1': (index===1 ? 'text-shadow-no2' : 'text-shadow-no3') )} `}>{index+1}</div>
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
                    </div>
                    <td className="text-left text-[12px]">
                      {item?.album?.title}
                    </td>
                    <td className="text-right text-[12px]">
                      {moment.utc(item?.duration * 1000).format("mm:ss")}
                    </td>
                  </div>
                ))}
        
        <div className='w-full justify-center mt-5'>
           <div className='cursor-pointer w-fit px-3 py-1 justify-center rounded-full border-white mx-auto border-[1px] hover:bg-main-100' onClick={null}>Xem top 100</div>
           
        </div>
    </div>
  )
}

export default Top100