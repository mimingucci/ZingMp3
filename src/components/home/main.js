import React, { useEffect , useState} from "react";
import Scrollbars from "react-custom-scrollbars-2";

import * as apis from '../../getApi'
import Header from "./header";
import { useSelector, useDispatch } from "react-redux";
import Slider from "./slider";
import Section from "./Section";
function Main({children}) {
  const [data, setData] = useState(null);
  useEffect(()=>{
       const callApi=async()=>{
        const response=await apis.getHome();
        console.log(response?.data?.data);
        setData(response?.data?.data);
       }
       callApi();
    }, []);
  const newSongEveryDay=data?.items[5];
  return (
    <div className="w-fit h-full overflow-y-hidden flex-1 bg-[#170f23]">
         <Scrollbars autoHide style={{ width: "100%", height: "85%" }}>
      <Header />
      {/* <ul className='h-32 w-full block bg-red-800'>
       {banner.map((item, index) => (
                    <img
                        key={index}
                        src={item.banner}
                        //onClick={() => handleClickBanner(item)}
                        className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${index <= 2 ? 'block' : 'hidden'}`}
                    />
                    
                ))} 
               
               
      </ul> */}
      <Slider />
      <div className="px-[60px] h-full">
      {children}
      
        
      
        
      <Section sectionType={newSongEveryDay} artists={true} sortDescription={false}/>
      </div> 
       {/* <Section sectionType={data?.items[4]} artists={false} sortDescription={true}/> */}
    </Scrollbars>
    </div> 
    
  );
}

export default Main;
