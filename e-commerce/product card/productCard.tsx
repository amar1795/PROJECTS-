import { Heart, Minus, Plus, ShoppingCart, StarIcon } from "lucide-react";
import React from "react";
import "./product.css";

const ProductCard = () => {
  return (
    <div>
      <div className="embla__slide_product  ">
        <div className="embla__slide__number__product">
          <div className="ProductImageCard min-h-[15rem] over">
            <div className="ProductImage bg-red-400 h-full w-full">
              <button className=" heartButton">
                <Heart size={25} />
              </button>
            </div>
          </div>
          <div className=" text-sm flex justify-between bg-opacity-20 backdrop-blur-lg border border-white/30 ">
            <div className=" bg-gray-200 w-12  ">
              <div className=" flex justify-between px-2 pt-1">
                <span>5</span>
                <div className=" self-center">
                  <StarIcon size={20} stroke="" fill="black" />
                </div>
              </div>
            </div>
            <div>
              <div className="box flex pr-4">
                <button className=" pr-2  hover:bg-gray-200 pl-1">
                  <Plus size={20} />
                </button>
                <div className=" text-[1.5rem] w-7  bg-white  h-[2rem]">
                  <div className=" px-2 py-2 ">0</div>
                </div>
                <button className=" pl-2  hover:bg-gray-200 pr-1">
                  <Minus size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="ProductDetails ">
            <div className="card_slider px-4 pb-5 w-full text-[1.5rem] relative flex-wrap flex bg-white bg-opacity-20 backdrop-blur-lg border border-white/30">
              <div className="left flex-auto">
                <div>Company name</div>
                <div className="font-extralight text-lg">product name</div>
                <div>Price</div>
              </div>
              <div className="right flex-1">
                <button className="buynow flex items-center">
                  <div>
                    <ShoppingCart size={20} />
                  </div>
                  <div className="text-sm px-3">Buy Now</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
