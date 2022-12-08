import React, { useEffect } from "react";
import Header from "./header";
import { useSelector, useDispatch } from "react-redux";
import { getHome } from "../../getApi/home";
import Slider from "./slider";
function Main() {
  // useEffect(async()=>{const api=async()=>{
  //   const response=await getHome();
  //   const arr=response.data.data.items.find(item=>item.sectionType==='banner').items;
  //   for(let i=0; i<arr.length; i++){
  //       banner.push(arr[i].banner)
  // }

  // // (async()=>{
  // //     const res=await api();
  // //     const arr=res.data.data.items.find(item=>item.sectionType==='banner').items;
  // //     //console.log(arr)
  // //     //const [...spirit]=arr;
  // //     for(let i=0; i<arr.length; i++){
  // //       banner.push(arr[i].banner)
  // //     }
  //   }}, []);
  const { banner } = useSelector((state) => state.app);
  console.log(banner);
  return (
    <div className="w-fit h-full overflow-y-hidden flex-1 bg-[#170f23]">
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
    </div>
  );
}

export default Main;
