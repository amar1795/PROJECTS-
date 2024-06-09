"use client"
import CheckoutProductCard from "@/components/checkout product card/checkoutProductCard";
import ProductCard from "@/components/product card/productCard";
import StyledButton from "@/components/styled Button/StyledButton";
import {
  Delete,
  DollarSign,
  Heart,
  Minus,
  Plus,
  Recycle,
  Trash2,
} from "lucide-react";
import React from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

const page = () => {
  const user = useCurrentUser();
  return (
    <div className="  border-2 border-black overflow-hidden ">
      <div className=" bg-teal-600  px-5 py-5">
        <div>
          <h1 className=" text-[4rem] leading-none ">SHOPPING CART</h1>
          <div className=" h-[4rem]">
            <h3 className="w-80 text-[2rem] leading-none p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
              TOTAL ITEMS (4)
            </h3>
          </div>

          <div className=" h-[4rem]">
            <div className="w-[10rem] text-[2rem] leading-none  border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
              <div className=" flex self-center py-2">
                <div className=" self-center pr-2">
                  <DollarSign size={25} />
                </div>
                <h1 className=" text-[2rem] self-center leading-none">9.99</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-orange-300 flex justify-around px-40 py-4">
        <div>
          <div className=" px-4 py-4 mt-2 w-[40rem] flex-1 ">
            <CheckoutProductCard />
          </div>

          <div className=" px-4 py-4 mt-2 mb-4 w-[40rem] flex-1 ">
            <CheckoutProductCard />
          </div>
        </div>
        <div className=" w-[25rem]  border-b-8 border-r-4 border-2 border-black h-[20rem] mt-6">
          <div className="  h-full bg-opacity-20 backdrop-blur-lg border border-white/30 bg-white">
            <div className=" px-4 py-4  ">
              <div className=" h-[4rem] pl-6">
                <h3 className="w-[20rem] text-[2rem] leading-none p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                  Order Summary
                </h3>
              </div>
              <div className=" flex justify-between ">
                <div className=" self-center">2 Items</div>

                <div className=" flex self-center py-2">
                  <div className=" self-center">
                    <DollarSign size={20} />
                  </div>
                  <h1 className=" text-[1.3rem] self-center">9.99</h1>
                </div>
              </div>
              <div></div>
              <div className=" flex justify-between">
                <div className=" self-center">Delivery</div>

                <div className=" flex self-center py-2">
                  <h1 className=" text-[1.3rem] self-center">Free</h1>
                </div>
              </div>
              <div></div>

              <div className=" border-b-2 border-black "></div>
              <div className=" flex justify-between ">
                <div className=" self-center font-bold">Total</div>

                <div className=" flex self-center py-2 font-bold">
                  <div className=" self-center">
                    <DollarSign size={20} />
                  </div>
                  <h1 className=" text-[1.3rem] self-center ">9.99</h1>
                </div>
              </div>
              <div></div>
              <div className="">
                {
                  !user ? (
                    <div className=" flex justify-center">
                      <StyledButton buttonName="Sign In" />
                    </div>
                  ) : (
                    <div className=" flex justify-center">
                      <StyledButton buttonName=" Proceed to Checkout" />
                    </div>
                  )
                }
                {/* <StyledButton buttonName=" Proceed to Checkout" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-teal-600 min-h-[37rem] ">
        <div className="px-5">
              <div className=" pt-10 mb-8 ">
                <h3 className="w-[20rem] text-[2rem] leading-none p-2 border-2 border-black text-black  flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                  Related Product
                </h3>
              </div>

          <div className=" flex  flex-wrap pl-3">
            <div className=" pr-10 py-4 ">
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
