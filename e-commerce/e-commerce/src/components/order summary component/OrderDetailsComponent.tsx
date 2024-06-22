import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ReviewModal } from "../ReviewModal";

const OrderDetailsComponent = ({ orderItem }) => {
  return (
    <div>
      <div className="  bg-yellow-500 mt-4">
        <div className=" flex  text-[1.3rem] border-2 border-black border-b-8 border-r-4">
          <Image
            src={orderItem?.product.images[0].url}
            height={200}
            width={200}
            fit="cover"
            objectPosition="top"
            alt=""
            className=" h-[11rem] w-[10rem] object-cover  px-2 py-4  "
          />
          <div className=" price py-4 w-full">
            <h1 className=" py-2 px-2">
              Product Name: {orderItem?.product.name}
            </h1>
            <div className=" flex justify-between ">
              <div>
              <h1 className=" py-2 px-2">
              Brand Name :{orderItem?.product.brand.name}
            </h1>
            <h1 className=" py-2 px-2">
              Qty : <span>{orderItem?.quantity}</span>
              
            </h1>
            <h1 className="py-2 px-2">
              Price:{" "}
              <span className=" font-bold">
                {orderItem?.price?.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}{" "}
                / Item
              </span>
            </h1>
              </div>
              <div className=" mr-11 ">
                  <p>We would love to hear your review</p>
                  <ReviewModal buttonName="Add your Review" ProductImage={orderItem?.product.images[0].url} ProductName={orderItem?.product.name} />
                 

              </div>
            </div>
          </div>
         
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default OrderDetailsComponent;
