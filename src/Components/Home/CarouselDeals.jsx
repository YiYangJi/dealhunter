// Importa las librerías de react y react-bootstrap
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// Importa el componente HomeGameCard
import HomeGameCard from "./HomeGameCard";

// Define y exporta la función CarouselDeals
export default function CarouselDeals({ uniqueGames }) {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerclassName="container"
      dotListclassName=""
      draggable
      focusOnSelect={false}
      infinite={false}
      itemclassName=""
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
        tablet: {
          breakpoint: {
            max: 1024,
            min: 767,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
        mobile: {
          breakpoint: {
            max: 767,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderclassName=""
      slidesToSlide={1}
      swipeable>
      {uniqueGames &&
        uniqueGames.map((game) => {
          // Mapea uniqueGames y para cada juego crea un componente HomeGameCard utilizando gameID como clave
          return <HomeGameCard game={game} key={game.gameID} />;
        })}
    </Carousel>
  );
}
