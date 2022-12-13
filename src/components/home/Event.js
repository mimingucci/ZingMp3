import React, {memo} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Slider from 'react-slick';

import icons from '../../utils/icons'
import EventItem from './EventItem';
const {BsChevronRight, BsChevronLeft}=icons;
const Event = () => {
  const {events}=useSelector((state)=>state.app);
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow:<SampleNextArrow />,
    prevArrow:<SamplePrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <div className='text-text-100 flex flex-col relative'>
        <div className='flex items-center justify-between'>
            <span className='font-semibold text-[18px]'>Sự Kiện</span>
            {/* <span className='flex gap-6 items-center'><BsChevronLeft/><BsChevronRight/></span> */}
        </div>
        <div className='flex items-center justify-center mt-5'>
          <Slider {...settings} className='w-full flex gap-5 justify-between mr-[-10px] ml-[-10px]'>
          {events.map((ev)=><EventItem label={ev.label} title={ev.title} startText={ev.startText} coverHM={ev.coverHM} followers={ev.followers} totalFollow={ev.totalFollow} startUrl={ev.startUrl} publishTime={ev.publishTime} startTime={ev.startTime}/>)}
          </Slider>
        </div>
    </div>
  )
}

export default Event

function SampleNextArrow() {
  return (
    <div
      style={{ display:'none' }}
      //onClick={onClick}
    />
  );
}

function SamplePrevArrow() {
  return (
    <div
      style={{ display:'none' }}
     // onClick={onClick}
    />
  );
}