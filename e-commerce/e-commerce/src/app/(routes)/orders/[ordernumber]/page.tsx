import OrderDetailsComponent from "@/components/order summary component/OrderDetailsComponent";
import OrderSummaryComponent from "@/components/order summary component/OrderSummaryComponent";
import { PaginationComponent } from "@/components/pagination";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className=" min-h-[95vh] bg-pink-500 ">
        <h1 className=" text-[4rem] pl-10 uppercase">Your Orders</h1>
        <div className=" text-[1.3rem] flex px-8 mb-5">
          <h1 className=" mr-11">Ordered on : 17 jul 2021 </h1>
          <h1>Ordered Number : #351631353</h1>
        </div>
        <div className=" px-8">
          <div className=" border-black border-b-4 "></div>
        </div>
        <div className="mx-11">
          <div className=" mt-8 pt-2  pb-5">
            <div className=" bg-yellow-500 text-white  flex justify-between px-9 mx-2 border-2 border-black border-b-8 border-r-4 text-[1.3rem] ">
              <div>
              <div className=" flex  pt-4 pb-4 w-[30rem] justify-between">
                <div className=" shippping address">
                  <h1 className="font-bold">SHIPPING ADDRESS</h1>
                 
                  <p>Street: 123 Main St</p>
                  <p>City: New York</p>
                  <p>State: NY</p>
                  <p>Zip Code: 12345</p>
                </div>
                <div className="">
                  <h1 className="font-bold">PAYMENT METHOD</h1>
                 
                  <p>Online</p>
                  
                </div>
              </div>
              </div>
              <div className=" order Summary">
                <div>
                  <h1 className=" text-[2rem]"> Order Summary</h1>
                  <div className="">
                    <div className=" flex justify-between">
                      <h1>Item(s) Subtotal </h1>
                      <div>:$681.00</div>
                    </div>
                    <div className=" flex justify-between">
                      <h1>Shipping </h1>
                      <div>:$681.00</div>
                    </div>
                    <div className=" flex justify-between">
                      <h1>Total</h1>
                      <div>:$681.00</div>
                    </div>
                    <div className=" flex justify-between font-bold">
                      <h1 className=" ">GrandTotal </h1>
                      <div>:$681.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" px-2">
              <OrderDetailsComponent />
              <OrderDetailsComponent />
            </div>
            <div className="px-8  mt-[5rem] ml-[50rem]">
        <PaginationComponent />
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
