import OrderSummaryComponent from "@/components/order summary component/OrderSummaryComponent";
import { PaginationComponent } from "@/components/pagination";
import React from "react";

const page = () => {
  return (
    <div>
      <div className=" min-h-[95vh] bg-pink-500 ">
        <h1 className=" text-[4rem] pl-10 uppercase">Your Orders</h1>
        <div className=" px-8">
          <div className=" border-black border-b-4 "></div>
        </div>
        <div>
          <div className="  pt-5 pb-5">
            <OrderSummaryComponent />
          </div>
        </div>
        <div className="px-8  mt-[5rem] ml-[50rem]">
        <PaginationComponent />
        </div>
      </div>
    </div>
  );
};

export default page;
