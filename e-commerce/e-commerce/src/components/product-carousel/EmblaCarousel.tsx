"use client"
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
import Link from "next/link";


type Brand = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type Image = {
  url: string;
  altText?: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  brandId: string;
  discount: number | null;
  discountedPrice: number | null;
  description: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  brand: Brand;
  images: Image[];
};

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  products: Product[];
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options,products } = props;
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


  const formatPrice = (price: number): string => {
    // Format the price with the Indian Rupee symbol
    return '₹' + price.toLocaleString('en-IN');
  };
  return (
    <section className="ProductEmbla_product">
      <div className="embla__viewport_product " ref={emblaRef}>
        <div className="Product_embla__container">
        {
          !products ?<>
          {slides.map((index) => (
             <div className="embla__slide_product " key={index}>
               <div className="embla__slide__number__product  ">
                 <div className="ProductImageCard h-60 over ">
                 <Link href={`categories/men/sdgsg`}>
                   <div className="ProductImage bg-red-400 h-full w-full">
                     <button className=" heartButton">
                       <Heart size={40} />
                     </button>
                   </div>
                   </Link>
                 </div>
                 <div className="ProductDetails">
                   <div className="card_slider px-4 pb-5 ">
                     <div className="">Company name</div>
                     <div className=" font-extralight text-lg">product name</div>
                     <div>Price</div>
                     <Link href={`categories/men/sdgsg`}>
                     <button className="buynow ">
                       <div>
                         <ShoppingCart size={30} />
                       </div>
                       <div className=" text-sm px-3">Buy Now</div>
                     </button>
                     </Link>
                   </div>
                 </div>
 
                 {/* <ThreeDCardDemo/> */}
               </div>
             </div>
           ))}
          </>
          :<>
          {products.slice(0,7).map((product, index) => (
<div className="embla__slide_product" key={product.id}>
  <div className="embla__slide__number__product">
    {/* Rendering the product image */}
    <div className="ProductImageCard h-60 over">
      <Link href={`categories/men/${product.id}`}>
        <div className="ProductImage bg-red-400 h-full w-full">
        <button className="heartButton hover:text-red-500">
        <Heart size={40} className=" hover:fill-red-500" />
</button>
          {/* Adding alt text to the product image */}
          <img src={product.images[0].url} alt={product.images[0].altText || "Product Image"} />
        </div>
      </Link>
    </div>
    <div className="ProductDetails ">
      <div className="card_slider px-4 pb-5 bg-white">
        {/* Rendering the brand name */}
        <div>{product.brand.name}</div>
        {/* Rendering the product name */}
        <div className="font-extralight text-lg">
        {product.name.length > 36 ? product.name.slice(0, 36) + '...' : product.name}
        </div>
        {/* Rendering the product price */}
        <div>{formatPrice(product.price)}</div>
        <Link href={`categories/men/${product.id}`}>
          <button className="buynow">
            <div>
              <ShoppingCart size={30} />
            </div>
            <div className="text-sm px-3">Buy Now</div>
          </button>
        </Link>
      </div>
    </div>
  </div>
</div>
))}
          </>

        } 
            
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
