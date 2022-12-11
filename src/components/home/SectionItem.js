import React, {useRef, useState, memo} from 'react'
import icons from '../../utils/icons'
import { useNavigate } from 'react-router-dom';
const {AiOutlineHeart, BsFillPlayFill, BsThreeDots}=icons;
const SectionItem = ({thumbnailM, title, sortDescription, artistsNames,link}) => {

    const [isHover, setIsHover] = useState(false);
    const navigate =useNavigate();
    const imageRef = useRef();
    console.log(link)
    const toAlbumPage=()=>{
       navigate(link);
    }

    const toAlbumPageAndPlay=()=>{
        
    }

    const handleHover = () => {
        setIsHover(true)
        imageRef.current.classList?.remove('animate-scale-down-image')
        imageRef.current.classList?.add('animate-scale-up-image')
    }
    const handleLeave = () => {
        setIsHover(false)
        imageRef.current.classList?.remove('animate-scale-up-image')
        imageRef.current.classList?.add('animate-scale-down-image')
    }
  return (
    <div className='flex flex-col gap-3 flex-auto justify-start w-1/5 text-sm cursor-pointer'
    onClick={toAlbumPage}
    >
        <div 
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className='w-full relative overflow-hidden rounded-lg'>
        {isHover && <div className='absolute top-0 bottom-0 z-40 left-0 right-0 bg-overlay-30 rounded-lg text-white flex items-center justify-center gap-3 hover:bg-[rgba(0,0,0,0.3)]'>
                    <span><AiOutlineHeart size={25} /></span>
                    <span
                        // onClick={(e) => {
                        //     e.stopPropagation()
                        //     navigate(link?.split('.')[0], { state: { playAlbum: true } })
                        // }}
                        className='p-1 border border-white rounded-full'
                    >
                        <BsFillPlayFill size={35} />
                    </span>
                    <span><BsThreeDots size={25} /></span>
                </div>}
            <img ref={imageRef} src={thumbnailM} alt='thumbnailM' className='w-full h-auto rounded-lg'/>
        </div>
        <span className='flex flex-col text-left'>
                <span className='font-semibold'>{title}</span>
                <span className='text-text-200'>{artistsNames}</span>
                {<span className='text-text-200'>{sortDescription?.length >= 40 ? `${sortDescription?.slice(0, 40)}...` : sortDescription}</span>}
            </span>
    </div>
  )
}

export default memo(SectionItem)