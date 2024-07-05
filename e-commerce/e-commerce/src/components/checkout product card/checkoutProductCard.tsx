"use client";
import decreaseProductQuantity from "@/actions/cart/decreaseProduct";
import deleteCartItem from "@/actions/cart/deleteCartProducts";
import increaseProductQuantity from "@/actions/cart/increaseProduct";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DollarSign, Heart, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import ColourBox from "../product selection/colourBox";
import SelectionSizeBox from "../product selection/selectionBox";

const CheckoutProductCard = ({
  product,
  handleQuantityChange,
  handleClickDelete,
}) => {
  // console.log("this is the updated products", updatedProducts);
  const user = useCurrentUser();

  // Assuming the product object has cartItems array and we are getting the quantity from it
  const quantity =
    product?.cartItems?.find((item) => item.productId === product.id)
      ?.quantity || 0;

  return (
    <div>
      <div className=" border-2 border-black border-b-8 border-r-4  overflow-hidden">
        <div className=" overflow-hidden flex justify-between bg-opacity-20 backdrop-blur-lg border border-white/30 bg-white  ">
          <div className=" flex">
            <div>
              <Image
                width={150}
                height={100}
                objectFit="cover"
                src={product?.images[0].url}
                alt=""
                className=" h-[11rem] w-[10rem] object-cover  px-2 py-4 transform transition-transform duration-300 hover:scale-110 "
              />
            </div>
            <div className=" price py-4">
              <h1 className=" self-center px-2  text-[1.2rem] ">
                <span className=" font-bold ">NAME:</span>{" "}
                {product?.name.length > 36
                  ? product?.name.slice(0, 40) + "..."
                  : product?.name}
              </h1>
              <h1 className="  px-2 text-[1.2rem] uppercase">
                <span className=" font-bold">BRAND : </span>
                {product?.brand?.name}
              </h1>

              {product?.cartItems && product?.cartItems[0]?.productSize && (
                <div className="  px-2 text-[1.2rem] uppercase flex self-center">
                  <span className=" font-bold self-center">SIZE:</span>
                  {/* {product?.cartItems[0]?.productSize} */}
                  <SelectionSizeBox size={product?.cartItems[0]?.productSize} color={product?.cartItems[0]?.productColour} />
                </div>
              )}

              {product?.cartItems && product?.cartItems[0]?.productColour && (
                <div className="  px-2 text-[1.2rem] uppercase flex self-center">
                  <span className=" font-bold mt-1">COLOUR:</span>
                  {/* {product?.cartItems[0]?.productColour} */}
                  <ColourBox color={product?.cartItems[0]?.productColour} />
                </div>
              )}

              <div>
                
                <div>
                <div className="box flex pr-4 px-2">
                  <span className=" font-bold text-[1.2rem]">QUANTITY :</span>
                <button className=" pr-2  hover:bg-gray-200 pl-1">
                  <Minus
                    size={20}
                    onClick={() =>
                      handleQuantityChange(user?.id, product?.id, -1)
                    }
                  />
                </button>
                <div className=" text-[1.5rem] w-7  h-[2rem]">
                  <div className=" px-2  ">{product?.cartQuantity}</div>
                </div>
                <button className=" pl-2  hover:bg-gray-200 pr-1">
                  <Plus
                    size={20}
                    onClick={() =>
                      handleQuantityChange(user?.id, product?.id, 1)
                    }
                  />
                </button>
              </div>
                </div>
              </div>
            </div>
          </div>
          <div className="  w-[6rem] px-2 self-center h-[5rem]  mr-10">
            <div className="">
              <div className=" flex self-center py-2 ">
                <h1 className=" text-[1.3rem] self-center">
                  {product?.discountedPrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </h1>
              </div>
              <div className=" flex justify-between ">
                <button className="transform transition-transform duration-300 hover:scale-110">
                  <Heart size={25} />
                </button>
                <button
                  className="transform transition-transform duration-300 hover:scale-110"
                  onClick={() => handleClickDelete(user?.id, product?.id)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
