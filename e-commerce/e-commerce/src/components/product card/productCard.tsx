
import { Heart, Minus, Plus, ShoppingCart, StarIcon } from "lucide-react";
import React from "react";
import "./product.css";
import Image from "next/image";
import {
  relatedProduct,
  updatedDataResponse,
} from "@/app/categories/[categories]/[product]/page";
import Link from "next/link";

const formatPrice = (price: number): string => {
  // Format the price with the Indian Rupee symbol
  return '₹' + price?.toLocaleString('en-IN');
};

// Function to remove spaces from a string
const removeSpaces = (name: string): string => {
  return name?.replace(/\s+/g, '');
};

const ProductCard: React.FC<updatedDataResponse> = ({ product }) => {
  console.log("this is the productID from product card", product?.category?.name);
  
 const completeUrl = typeof window !== "undefined" ? window.location.href : "";
 console.log("this is the complete url", completeUrl);

 const segments = completeUrl.split("/");

 const matchingSegmentIndex = segments.findIndex(segment => removeSpaces(segment) === removeSpaces(product?.category?.name));
  console.log("this is the product category name", product?.category?.name);
 // If a matching segment is found, construct the new URL
 let newUrl = completeUrl;
 if (matchingSegmentIndex !== -1) {
   // Remove the segments from the matching segment index onwards
   const newSegments = segments.slice(0, matchingSegmentIndex);
   // Add the product category name and ID to the new segments
   newSegments.push(removeSpaces(product?.category?.name), product?.id);
   // Join the new segments to form the new URL
   newUrl = newSegments.join('/');
 }
 else
 {
 // If no matching segment is found, append the product category name and ID to the end of the URL
 newUrl = `${completeUrl}/${removeSpaces(product?.category?.name)}/${product?.id}`;
 }


  return (
    <div>
      <div className="sembla__slide_product pl-[3rem] ">
        <div
          className="sembla__slide__number__product flex flex-col relative min-h-[25rem] w-[18rem]  border-2 border-black border-b-8 border-r-4
        transition-transform duration-300 ease-in-out hover:scale-110"
        >
          {/* top part */}
          <button>
          <Link href={newUrl}>
          <div className="ProductImageCard min-h-[19rem] relative ">
            <button className={`heartButton z-10 hover:text-red-500`}>
              <Heart
                size={40}
                strokeWidth={0.8}
                className={` hover:fill-red-500 text-black`}
              />
            </button>
            <div className="ProductImage bg-red-400 h-full w-full absolute">
              <Image
                alt="product image"
                fill="true"
                objectFit="cover"
                src={product?.images[0]?.url}
              />
            </div>
          </div>
          </Link>

          </button>
          {/* middle part */}
          <div className=" text-sm flex justify-between bg-opacity-20 backdrop-blur-lg border border-white/30 ">
            <div className=" bg-gray-200 w-16  ">
              <div className=" flex justify-between px-2 pt-1">
                <span>{product?.ratings?.averageRating.toFixed(1)}</span>
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
          {/* Bottom part */}
          <div className="ProductDetails  ">
            <div className="card_slider px-2 pb-5 w-full text-[1.5rem]   flex justify-between bg-white bg-opacity-20 backdrop-blur-lg border border-white/30  ">
              <div className="left w-[9rem]  pt-1">
                <h1 className=" text-[19px] font-bold">
                  {product?.brand?.name}
                </h1>
                <p className="font-extralight text-[0.9rem]">
                  {" "}
                  {product?.name.length > 36
                    ? product?.name.slice(0, 25) + "..."
                    : product?.name}
                </p>
                <div className=" flex ">
                <h1 className=" text-[1.4rem] font-bold" style={{ textDecoration: 'line-through' }}>{product?.price}</h1>
                          <h1 className=" text-[1.2rem] font-bold ml-2" >
                            {formatPrice(product?.discountedPrice?.toFixed(2))}</h1>
                          <h1 className=" text-[1.2rem] font-bold ml-2" >({product?.discount}%OFF)</h1>
                        </div>

              </div>
              <div className="right self-center ">
                <button className="nbutton items-center border-2 border-black p-2   justify-between hidden ">
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
