import React from 'react'
import { useNavigate } from 'react-router-dom'

import icons from '../../utils/icons'
import SectionItem from './SectionItem';
const {BsChevronRight}=icons;
const Section = ({sectionType, artists, sortDescription, title, style=null}) => {
    const navigate=useNavigate();
    // if(sectionType?.items.length<5){
    //   for(let i=0; i<5-sectionType?.items.length; i++){
    //     sectionType?.items.push({encodeId: null,
    //     thumbnailM: null,
    //     title:null,
    //     artists: null,
    //     link: null,
    //     })
    //   }
    // }
  return (
    <div key={sectionType?.sectionId} className='text-text-100 mt-[50px]'>
      <div className='flex justify-between items-center mb-5'>
        <div className='text-lg font-bold text-left flex items-center'>{(sectionType?.title && sectionType?.title) &&
          (title && title)}
        </div>
        <div className='flex text-[12px] items-center gap-2 cursor-pointer hover:text-main-500 text-text-200'>TẤT CẢ <BsChevronRight size={16}/></div>
      </div>
         <div className='flex w-full h-auto gap-5'>
            {sectionType?.items && sectionType?.items.filter((item, index)=>index<5).map(section=>(<SectionItem key={section.encodeId} thumbnailM={section.thumbnailM} title={section.title} sortDescription={sortDescription && section.sortDescription} artistsNames={artists && section.artists} link={section?.link.split('.')[0]} timeRelease={section?.releaseDateText} style={style}/>))}
            {sectionType?.playlists && sectionType?.playlists.map(section=>(<SectionItem key={section.encodeId} thumbnailM={section.thumbnailM} title={section.title} sortDescription={sortDescription && section.sortDescription} artistsNames={ artists  && section.artists} link={section.link.split('.')[0]}/>))}
        
         </div>
    </div>
  )
}

export default Section