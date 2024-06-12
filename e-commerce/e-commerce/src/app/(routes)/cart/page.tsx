"use client";
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
  X,
} from "lucide-react";
import React, { use, useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import {
  calculateCartSummary,
  getProductsInCartSummary,
} from "@/actions/cart/cartSummary";
import CheckoutPorductCardComponent from "@/components/CheckoutPorductCardComponent";
import increaseProductQuantity from "@/actions/cart/increaseProduct";
import decreaseProductQuantity from "@/actions/cart/decreaseProduct";
import deleteCartItem from "@/actions/cart/deleteCartProducts";
import { getRelatedProducts } from "@/actions/cart/categoryRelatedProduct";


const page = () => {
  const user = useCurrentUser();

  const [summaryData, setSummaryData] = useState([]); // [totalItems, totalAmount
  const [productData, setproductData] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const handleClickDelete = (userID,productID) => {
    deleteCartItem(userID, productID);
    setUpdateTrigger(prev => !prev);

  };

  useEffect(() => {
    const cartSummary = async () => {
      const cartSummaryData = await calculateCartSummary(user.id);
      // console.log("this is the cart summary data", cartSummaryData);
      setSummaryData(cartSummaryData);
      const data = await getProductsInCartSummary(user.id);
      setproductData(data);
      // setupdatedProducts(data);
    };
    cartSummary();
  }, [updateTrigger]);
  // console.log("this is the updated products", updatedProducts);

  useEffect(() => {
    const relatedData = async () => {
      const data =await getRelatedProducts(user.id);
      setRelatedProducts(data);
    }
    relatedData();
    
   },[updateTrigger])

  // need to implement deboucning here for the quantity change
  const handleQuantityChange = useCallback(
    async (userId: string, productId: string, change: number) => {
      let refetch = false;
      
      const updatedProductsList = productData?.map((product) => {
        if (product.id === productId) {
          const updatedCartItems = product.cartItems.length > 0 
            ? product.cartItems.map((item) => {
                if (item.productId === productId) {
                  const newQuantity = Math.max(item.quantity + change, 0);
                  if (newQuantity === 0) refetch = true;
                  return { ...item, quantity: newQuantity };
                }
                return item;
              })
            : [{ productId, quantity: Math.max(change, 0) }];
          return { ...product, cartItems: updatedCartItems.filter(item => item.quantity > 0) };
        }
        return product;
      }).filter(product => product.cartItems.length > 0);

      setproductData(updatedProductsList);

      if (change > 0) {
        await increaseProductQuantity(userId, productId);
      } else {
        await decreaseProductQuantity(userId, productId);
      }

      if (refetch) {
        setUpdateTrigger(prev => !prev);
      } else {
        const cartSummaryData = await calculateCartSummary(user.id);
        setSummaryData(cartSummaryData);
      }
    },
    [productData]
  );
  console.log("this is the summary data", summaryData);

  return (
    <div className="  border-2 border-black overflow-hidden ">
      <div className=" bg-teal-600  px-5 py-5">
        <div>
          <h1 className=" text-[4rem] leading-none ">SHOPPING CART</h1>
          <div className=" h-[4rem]">
            <h3 className="w-80 text-[2rem] leading-none p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
              TOTAL ITEMS ({summaryData.totalUniqueItems})
            </h3>
          </div>

          <div className=" w-[15rem]">
            <div className=" text-[2rem] leading-none  border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
              <div className=" flex self-center py-2  h-[3.5rem]">
                <h1 className=" text-[2rem] self-center leading-none">
                  {summaryData?.totalAmount?.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-orange-300 flex justify-around px-30 py-4">
        <div>
          <div>
            <div className=" px-4 py-4 mt-2 w-[40rem] flex-1 ">
              {productData.map((product) => {
                return (
                  <div className=" mb-4" key={product.id}>
                    <CheckoutProductCard
                    handleClickDelete={handleClickDelete}
                      product={product}
                      handleQuantityChange={handleQuantityChange}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className=" w-[45rem]  border-b-8 border-r-4 border-2 border-black  mt-6">
          <div className="   bg-opacity-20 backdrop-blur-lg border border-white/30 bg-white">
            <div className=" px-4 py-4  ">
              <div className=" h-[4rem] pl-6 mb-8">
                <h3 className=" text-[2rem] leading-none p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                  Order Summary
                </h3>
              </div>

              {summaryData.orderSummary?.map((item) => (
                <div className="orderSummary">
                  <div className=" flex justify-between ">
                    <div className=" w-[26rem]">
                      <h1 className=" self-center  text-[1.2rem] font-bold">
                        {" "}
                        {item.name.length > 36
                          ? item.name.slice(0, 35) + "..."
                          : item.name}
                      </h1>
                    </div>
                    <span className=" flex  self-center   w-[4rem]  justify-between">
                      <div className=" self-center">
                        <X />
                      </div>{" "}
                      <h1 className=" text-[1.5rem] ">{item.quantity}</h1>
                    </span>

                    <div className=" flex self-center py-2  w-[10rem]">
                      <h1 className=" text-[1.3rem] self-center">
                        {item.amount?.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}

              <div></div>
              <div className=" flex justify-between px-12 ">
                <h1 className=" self-center text-[1.5rem] uppercase font-bold">
                  Delivery
                </h1>

                <div className=" flex self-center py-2   mr-12">
                  <h1 className=" text-[1.3rem] self-center font-bold ">
                    Free
                  </h1>
                </div>
              </div>
              <div></div>

              <div className=" border-b-2 border-black "></div>
              <div className=" flex justify-between py-8 px-8 ">
                <h1 className=" self-center font-bold text-[2rem] uppercase">
                  Total
                </h1>

                <div className=" flex self-center py-2 font-bold">
                  <h1 className=" text-[1.3rem] self-center">
                    {summaryData?.totalAmount?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h1>
                </div>
              </div>
              <div></div>
              <div className="">
                {!user ? (
                  <div className=" flex justify-center">
                    <StyledButton buttonName="Sign In" />
                  </div>
                ) : (
                  <Link href={"/checkout"}>
                    <div className=" flex justify-center">
                      <StyledButton buttonName=" Proceed to Checkout" />
                    </div>
                  </Link>
                )}
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
              Related Products
            </h3>
          </div>

          <div className=" flex  flex-wrap pl-3">
            <div className=" pr-10 py-4 flex  flex-wrap">
             {relatedProducts
              .map((product) => (
                <div className=" mb-4" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))
             
             } 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
