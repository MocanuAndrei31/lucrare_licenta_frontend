import React from "react";
import "./CarouselPromo.scss";

// ASSETS
import pic1 from "../../assets/carousel/pic1.jpg";
import pic2 from "../../assets/carousel/pic2.jpg";
import pic3 from "../../assets/carousel/pic1.jpg";

// CAROUSEL
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const CarouselPromo = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
    <div className="carousel-promo-container">
      <div className="carousel-provider-container1">
        <AutoplaySlider play={true} cancelOnInteraction={false} interval={4000}>
          <div data-src={pic1} />
          <div data-src={pic2} />
          <div data-src={pic3} />
        </AutoplaySlider>
      </div>
    </div>
  );
};

export default CarouselPromo;
