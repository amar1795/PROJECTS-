import SummaryCard from "@/components/summary product card/SummaryCard";
import React from "react";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import { RadioGroupComponent } from "@/components/RadioGroupComponent";
import StyledButton from "@/components/styled Button/StyledButton";

const page = () => {
  const addresses = [
    "1234 Elm Street, Apt 5B, Springfield, IL 62704, United States",
    "5678 Maple Avenue, Suite 101, Austin, TX 73301, United States",
    "9101 Oak Drive, Unit 22, San Francisco, CA 94103, United States",
    "1122 Pine Lane, Floor 3, New York, NY 10001, United States",
    "3344 Birch Boulevard, Room 10, Miami, FL 33101, United States",
  ];

  return (
    <div>
      <div className=" bg-teal-600 h-[8rem] border-b-4 border-black">
        <h1 className=" text-[5rem] px-4">CHECKOUT </h1>
      </div>
      <div className="  bg-green-400  ">
        <div className="">
          <div className=" ">
            <div className="py-4 px-5">
              <div className=" flex">
                <div className=" flex-1">
                  <div className=" mb-8 ">
                    <h3 className="w-[20rem] text-[2rem] leading-none p-2 border-2 border-black text-black  flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                      Shipping Address
                    </h3>
                  </div>
                  <div className="">
                  <input
                    type="text"
                    placeholder="Country"
                   className=" w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                  />
                  
                    <div className=" flex justify-between">
                    <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full ml-5 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                  />
                      
                    </div>
                    <input
                    type="text"
                    placeholder="Address"
                    className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                  />
                  <input
                    type="text"
                    placeholder="Apartment,suite etc"
                    className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                  />
                   
                    <div className=" flex">
                    <input
                    type="text"
                    placeholder="City"
                    className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                  />
                   <input
                    type="text"
                    placeholder="State"
                    className="w-full ml-5 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                  />

                      
                    </div>
                    <input
                    type="text"
                    placeholder="Landmark"
                    className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                  />
                    <div className=" flex">
                    <input
                    type="text"
                    placeholder="Zipcode"
                    className="w-full p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                  />
                   <input
                    type="text"
                    placeholder="Phone number"
                    className="w-full ml-5 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                  />
                     
                    </div>
                  </div>
                </div>

                <div className=" flex-1 ml-14 pl-14">
                  <div className="   mb-8 ">
                    <h3 className="w-[20rem] text-[2rem] leading-none p-2 border-2 border-black text-black  flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                      Saved Address
                    </h3>
                  </div>
                  <div>
                    <div>
                      
                    </div>
                    <RadioGroupComponent address={addresses} />
                  </div>
                </div>
              </div>

              <div className=" border-2 border-black  mt-8"></div>
              <div className=" w-[20rem]">
                <div className=" pt-10 mb-8 ">
                  <h3 className="w-[20rem] text-[2rem] leading-none p-2 border-2 border-black text-black  flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                    Payment Method
                  </h3>
                </div>
                <div className=" ">
                  
                <input
                    type="text"
                    placeholder="Card Number"
                    className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                  />
                 <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                  />
                </div>
                <div className=" ">

                <input
              type="text"
              
              placeholder="CVV"
              className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
            />

<input
              type="text"
              placeholder="Name on card"
              className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
            />
              
                 
                </div>
               <div className=" mt-5">
               <StyledButton buttonName="Proceed to Payment"  />
               </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className=" bg-pink-500 flex-1">
          <div className=" px-5 py-5">
          <div className=" pt-5 mb-8 ">
            <h3 className="w-[20rem] text-[3rem] leading-none p-2 border-2 border-black text-black  flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
              Summary
            </h3>
          </div>
            <div>
              <div className=" px-4 py-1 mt-2 mb-2 w-[40rem] flex-1 ">
                <SummaryCard />
              </div>{" "}
              <div className=" px-4 py-1 mt-2 mb-2 w-[40rem] flex-1 ">
                <SummaryCard />
              </div>
            </div>

            <div></div>

            <div className=" w-[25rem] px-4 flex py-3">
              <Input placeholder="Enter Promo Code" />
              <button className=" bg-black text-white w-[10rem] p-2 ml-5 rounded-md">
                Apply
              </button>
            </div>

            <div>
              <div className=" flex justify-between  px-5 w-[40rem]">
                <div className=" self-center">SUBTOTAL</div>

                <div className=" flex self-center py-2 ">
                  <div className=" self-center">
                    <DollarSign size={20} />
                  </div>
                  <h1 className=" text-[1.3rem] self-center">9.99</h1>
                </div>
              </div>
              <div className=" flex justify-between  px-5 w-[40rem]">
                <div className=" self-center">SHIPPING</div>

                <div className=" flex self-center py-2 ">
                  <div className=" self-center">
                    <DollarSign size={20} />
                  </div>
                  <h1 className=" text-[1.3rem] self-center">FREE</h1>
                </div>
              </div>

              <div className=" flex justify-between  px-5 w-[40rem]">
                <div className=" self-center font-bold text-[1.5rem]">
                  SUBTOTAL
                </div>

                <div className=" flex self-center py-2 font-bold">
                  <div className=" self-center">
                    <DollarSign size={20} />
                  </div>
                  <h1 className=" text-[1.3rem] self-center">9.99</h1>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default page;
