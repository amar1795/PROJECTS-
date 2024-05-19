"use client";
import StepProgress from "@/components/StepProgress";
import ConfettiComponent from "@/components/confetti";
import SummaryCard from "@/components/summary product card/SummaryCard";
import { CircleCheck, CircleCheckBig, DollarSign } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className=" overflow-hidden">
      <div className=" flex ">
        <ConfettiComponent />
        <div className=" bg-green-400 flex-1">
          <div className=" flex flex-col  justify-center ">
            <div className=" flex flex-col items-center mt-[10rem]">
              <CircleCheck size={140} />
              <h1 className=" text-2xl font-bold mt-4"> Thank you</h1>
              <h1 className=" text-4xl font-bold mt-2">
                {" "}
                Your Order has been Confirmed
              </h1>
              <h1 className=" text-1xl mt-4">
                {" "}
                We will send you an email Shortly to test@test.com please check
                your email
              </h1>
            </div>
            <div className=" px-8 mt-8 ">
              <div className=" bg-white h-[15rem]">
                <div className=" px-8 py-5 ">
                  <div className=" w-full h-[8rem]  mt-8 ">
                    <StepProgress />
                  </div>

                  <div>
                    <span className="  text-gray-500">
                      {" "}
                      Expected delivery Date :
                    </span>
                    <span className=" font-bold mr-6"> 20 June 2024</span>
                    <a
                      href="#"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      Track your Order
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" px-8 mt-8  pb-5">
            <div className=" border-b-2 border-black">

            
            </div>
            <div className="">
            <h1 className="w-80  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 uppercase text-2xl bg-green-500 font-bold">
                    Order Items(3)
                  </h1>
            </div>
            <div className=" flex flex-wrap justify-around pt-4">
            <div className=" py-1 mt-2 mb-2 w-[25rem] mr-3  ">
                    <SummaryCard />
            </div> <div className=" py-1 mt-2 mb-2 w-[25rem] mr-3  ">
                    <SummaryCard />
            </div> <div className=" py-1 mt-2 mb-2 w-[25rem] mr-3  ">
                    <SummaryCard />
            </div> <div className=" py-1 mt-2 mb-2 w-[25rem] mr-3  ">
                    <SummaryCard />
            </div> 
            </div>
           
          </div>
        </div>

        <div className=" bg-teal-500 w-[30rem]">
          <div className=" px-8">
            <div className=" h-[7rem] flex justify-between pt-4 border-b-2 border-black">
              <div className="">
                <h1 className=" text-2xl font-bold"> ORDER DETAIL</h1>
                <h1 className=" text-4xl font-bold">#20561</h1>
              </div>
              <div>
                <div className=" h-[4rem] ">
                  <button className="w-auto  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-green-500">
                    <h1 className=" font-bold">View or Manage orders</h1>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className=" h-[10rem] border-b-2 border-black">
                <h1 className="  h-[4rem] text-3xl font-bold mb-2 pt-3">
                  {" "}
                  Delivery Address
                </h1>
                <h1> John Doe, 1234 Elm Street</h1>
                <h1> Apt 5B, Springfield,</h1>
                <h1> IL 62704, United States</h1>
              </div>
              <div className=" h-[10rem] border-b-2 border-black">
                <h1 className="  h-[4rem] text-3xl font-bold mb-2 pt-3">
                  Billing Address
                </h1>
                <h1> John Doe, 1234 Elm Street</h1>
                <h1> Apt 5B, Springfield,</h1>
                <h1> IL 62704, United States</h1>
              </div>
              <div className=" h-[10rem] border-b-2 border-black">
                <h1 className="  h-[4rem] text-3xl font-bold mb-2 pt-3">
                  Contact Details
                </h1>
                <h1> test@test.com</h1>
                <h1> 9999999999,</h1>
                <h1> 9999999999</h1>
              </div>
            </div>
            <div>
              <div>
                <div className=" mb-5 mt-8">
                  <h1 className="w-80  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 uppercase text-2xl bg-green-500 font-bold">
                    Order Summary(3)
                  </h1>
                  {/* <div className=" py-1 mt-2 mb-2 w-auto flex-1 ">
                    <SummaryCard />
                  </div> */}
                  <div className=" border-b-2 border-black">
                    <div className=" flex justify-between">
                      <span className=" self-center">Sub Total</span>
                      <span>
                        <div className=" flex  ">
                          <div className=" self-center">
                            <DollarSign size={20} />
                          </div>
                          <h1 className=" text-[1.3rem] self-center">9.99</h1>
                        </div>
                      </span>
                    </div>
                    <div className=" flex justify-between">
                      <span className=" self-center">Delivery</span>
                      <span>
                        <div className=" flex  ">
                          <div className=" self-center">
                            <DollarSign size={20} />
                          </div>
                          <h1 className=" text-[1.3rem] self-center">9.99</h1>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className=" flex justify-between">
                    <span className=" self-center text-2xl font-bold">
                      {" "}
                      Total
                    </span>
                    <span>
                      <div className=" flex  ">
                        <div className=" self-center">
                          <DollarSign size={25} />
                        </div>
                        <h1 className=" text-[1.8rem] self-center font-bold">
                          29.99
                        </h1>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
