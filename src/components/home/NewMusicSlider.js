import React from 'react'
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import NewMusicSection from './NewMusicSection';
import SectionItem from './SectionItem';
import icons from '../../utils/icons'
const {BsChevronRight}=icons;
const NewMusicSliderThree = ({data}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow:<SampleNextArrow />,
        prevArrow:<SamplePrevArrow />,
      };
  return (
    <Slider {...settings} className='flex'>
             {data?.map((i, index)=>(
                 <NewMusicSection key={i.encodeId} thumbnail={i.thumbnailM} title={i.title} artists={i.artistsNames} timeRelease={i.releaseDate} songId={i.encodeId} order={index+1}/>
                 
                 ))}
            <NewMusicSection thumbnail={null} title={null} artists={null} timeRelease={null} songId={null} order={null} message={'XEM TẤT CẢ'}/>
        </Slider>
  )
}

export default NewMusicSliderThree

export const NewMusicSliderFive=({sectionType, artists, sortDescription}) => {
    const settings={
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow:<SampleNextArrow />,
        prevArrow:<SamplePrevArrow />,
    }
  return (
    <div className='text-text-100 mt-[50px]'>
      
         <div className='flex w-full h-auto gap-5'>
            <Slider {...settings} className='flex w-full h-auto'>
                
            {sectionType?.items?.map(section=>(<div className='w-1/5'>
                <SectionItem key={section.encodeId} thumbnailM={section.thumbnailM} title={section.title} sortDescription={sortDescription && section.sortDescription} artistsNames={artists && section.artistsNames} link={section.link.split('/')[3].split('.')[0]} style={'w-[90%] justify-center flex'} isSong={true}/>
                </div>
                ))}
   
            </Slider>
         </div>
    </div>
  )
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display:'none' }}
        onClick={onClick}
      />
    );
  }
  
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display:'none' }}
        onClick={onClick}
      />
    );
  }