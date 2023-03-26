import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

export default function ImageSlider() {
    
    const images = [
        {
          id: 1,
          src: require("../Images/sliding.PNG")
        },
        {
          id: 2,
          src: require("../Images/merging.PNG")
        }
      ];


      const settings = {
      infinite: true,
      dots: true,
      slidesToShow: 1,
      arrows: true,
      slidesToScroll: 1,
      lazyLoad: true
    };
  


    return (
      <div>
        <Slider {...settings}>
        {images.map((item) => (
        <div key={item.id}>
          <img src={item.src}/>
        </div>
      ))}
        </Slider>
      </div>
    );
  }