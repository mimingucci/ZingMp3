import React, { useEffect , useState} from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector, useDispatch } from "react-redux";
import icons from '../../utils/icons'
import { Outlet } from "react-router-dom";

import * as apis from '../../getApi'
import * as actions from '../../store/action'
import Header from "./header";
import Slider from "./slider";
import Event from "./Event";
import Section from "./Section";
import NewMusicSlider from "./NewMusicSlider";
import { NewMusicSliderFive } from "./NewMusicSlider";
import Chart from "./Chart";
const {BsChevronRight}=icons;
function Main({children}) {
  const dispatch=useDispatch();
  const [data, setData] = useState(null);
  const [dt, setDt]=useState(null);
  useEffect(()=>{
       const callApi=async()=>{
        const [response, res]=await Promise.all([apis.getHome(), apis.apiGetNewRelease()]);
        setData(response?.data?.data);
        setDt(res?.data?.data);
        if(response?.data.err===0){
           dispatch(actions.setEvents(response?.data?.data?.items.find((item)=>(item.sectionId==="hSlider" && item.sectionType==='event')).items));
           dispatch(actions.setChart(response?.data?.data?.items.find(item=>(item.sectionType==="weekChart")).items, response?.data?.data?.items.find(item=>(item.sectionId==="hZC" && item.sectionType==="RTChart"))));
        }
        console.log('home',response);
       }
       callApi();
    }, []);
  return (
    <div className="w-fit h-full overflow-y-hidden flex-1 bg-[#170f23]">
         <Scrollbars autoHide style={{ width: "100%", height: "85%" }}>
      <Header />
      {children } 
      { <div className={`${children ? 'hidden' : 'w-full h-full'}`}><Slider />
      {<div className="px-[60px] h-full">
      {data?.items.filter((dt, index)=>((dt.sectionId==='hArtistTheme') || (dt.sectionId==="hAutoTheme1") || (dt.sectionId==='h100') || (dt.sectionId==='hXone'))).map((i)=><Section sectionType={i} artists={false} sortDescription={true}/>)}
      <div className='text-text-100 mt-[50px]'>
      <div className='flex justify-between items-center mb-5'>
        <div className='text-lg font-bold text-left flex items-center'>{data?.items.find((item)=>item.sectionId==='hNewrelease').title}</div>
        <div className='flex text-[12px] items-center gap-2 cursor-pointer hover:text-main-500 text-text-200'>TẤT CẢ <BsChevronRight size={16}/></div>
      </div>
      <div>
        <NewMusicSlider data={data?.items.filter((item)=>item.sectionId==='hNewrelease').map((it)=>it.items)[0]} className='w-full'/>
      </div>
      <div className="w-full h-auto">
      {<NewMusicSliderFive sectionType={dt} artists={true} sortDescription={false}/>}
      </div>
      <Chart/>
      <Event />
      
    </div>
      </div> 
      }
      </div>} 
      
      
    </Scrollbars>
    </div> 
    
  );
}

export default Main;
