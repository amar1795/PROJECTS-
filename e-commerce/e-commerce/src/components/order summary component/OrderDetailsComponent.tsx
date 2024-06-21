import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

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
          <div className=" price py-4">
            <h1 className=" py-2 px-2">
              Product Name: {orderItem?.product.name}
            </h1>
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
          {/* <div className=' w-[5rem] flex pl-7 h-0 pt-[4.5rem]'>
                    <button className='transform transition-transform duration-300    hover:scale-110 '>                                          
                            <Trash2 size={30}/>
                            </button>
                    </div> */}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default OrderDetailsComponent;
