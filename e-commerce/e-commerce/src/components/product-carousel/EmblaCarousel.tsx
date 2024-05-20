import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ThreeDCardDemo } from "../3d card/3dCard";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="ProductEmbla_product">
      <div className="embla__viewport_product " ref={emblaRef}>
        <div className="Product_embla__container">
          {slides.map((index) => (
            <div className="embla__slide_product " key={index}>
              <div className="embla__slide__number__product  ">
                <div className="ProductImageCard h-60 over ">
                  <div className="ProductImage bg-red-400 h-full w-full">
                    <button className=" heartButton">
                      <Heart size={40} />
                    </button>
                  </div>
                </div>
                <div className="ProductDetails">
                  <div className="card_slider px-4 pb-5">
                    <div className="">Company name</div>
                    <div className=" font-extralight text-lg">product name</div>
                    <div>Price</div>
                    <button className="buynow ">
                      <div>
                        <ShoppingCart size={30} />
                      </div>
                      <div className=" text-sm px-3">Buy Now</div>
                    </button>
                  </div>
                </div>

                {/* <ThreeDCardDemo/> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* embla__buttons_product */}
      <div className="embla__controls_product">
        <div className=" previous absolute top-52 left-5 h-full flex self-center">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <div className="next absolute top-52 right-5 ">
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      {/* <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div> */}
    </section>
  );
};

export default EmblaCarousel;
