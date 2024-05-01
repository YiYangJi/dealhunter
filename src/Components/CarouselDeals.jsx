import React, { useRef, useEffect } from "react";
import ListCards from "./ListCards";
import * as bootstrap from "bootstrap";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselDeals = ({ games }) => {
  // const carouselRef = useRef(null);
  // const nextButtonRef = useRef(null);
  // const prevButtonRef = useRef(null);

  // const carouselControlsRef = useRef(null);

  // useEffect(() => {
  //   let scrollPosition = 0;
  //   const carousel = carouselRef.current;
  //   const carouselWidth = carousel.scrollWidth;

  //   const nextControl = nextButtonRef.current;
  //   const prevControl = prevButtonRef.current;

  //   nextControl.addEventListener("click", function () {
  //     const cardWidth = document.querySelector(".carousel-item").offsetWidth;
  //     if (scrollPosition < carouselWidth - cardWidth * 4) {
  //       scrollPosition += cardWidth;
  //       carousel.scrollTo({
  //         left: scrollPosition,
  //         behavior: "smooth",
  //       });
  //     }
  //   });

  //   prevControl.addEventListener("click", function () {
  //     const cardWidth = document.querySelector(".carousel-item").offsetWidth;
  //     if (scrollPosition > 0) {
  //       scrollPosition -= cardWidth;
  //       carousel.scrollTo({
  //         left: scrollPosition,
  //         behavior: "smooth",
  //       });
  //     }
  //   });

  //   var bootstrap = require("bootstrap");

  //   if (window.matchMedia("(min-width: 768px)").matches) {
  //     var carouselBootstrap = new bootstrap.Carousel(carouselControlsRef.current, {
  //       interval: false,
  //       wrap: false,
  //     });
  //   } else {
  //     carouselControlsRef.current.classList.add("slide");
  //   }
  // }, []);

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 3,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable>
      <ListCards games={games} />
    </Carousel>
    // <div id="carouselControls" className="carousel" ref={carouselControlsRef}>
    //   <div className="carousel-inner p-3" ref={carouselRef}>
    //     <ListCards games={games} />
    //   </div>
    //   <button ref={prevButtonRef} className="carousel-control-prev rounded-circle top-50" type="button">
    //     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Previous</span>
    //   </button>
    //   <button ref={nextButtonRef} className="carousel-control-next rounded-circle top-50" type="button">
    //     <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Next</span>
    //   </button>
    // </div>
  );
};

export default Carousel;
