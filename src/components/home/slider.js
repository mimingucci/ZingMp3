
import {useSelector} from 'react-redux'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
function SlickSlider() {
  const navigate=useNavigate()
     const {banner}=useSelector(state=>state.app)
    const handleClickBanner=(item)=>{
       if(item.type===4){
        console.log(item)
        const albumLink=item?.link?.split('.')[0];
        navigate(albumLink)
       }
    }
    const settings = {
        
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
      return (
        <Slider {...settings} className="w-full px-[60px] flex gap-3 items-center overflow-hidden">
             {banner.map((item, index)=><div>
             <img src={item.banner}
               key={index}
               className={`flex object-contain w-[90%] rounded-lg items-center justify-center`}
               onClick={()=>handleClickBanner(item)}
              />
         </div>)}
        </Slider>
      );
}

export default SlickSlider;