import React from 'react'
import { useNavigate } from 'react-router-dom'

import SectionItem from './SectionItem';
const Section = ({sectionType, artists, sortDescription}) => {
    const navigate=useNavigate();
  return (
    <div className='text-text-100'>
        <div className='text-lg font-bold text-left mt-[50px] mb-5'>{sectionType?.title}</div>
         <div className='flex w-full h-auto gap-5'>
            {sectionType?.items.map(section=>(<SectionItem key={section.encodeId} thumbnailM={section.thumbnailM} title={section.title} sortDescription={sortDescription && section.sortDescription} artistsNames={artists && section.artists} link={section.link.split('.')[0]}/>))}
         </div>
    </div>
  )
}

export default Section