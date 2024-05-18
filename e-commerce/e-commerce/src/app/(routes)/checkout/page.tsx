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
        "3344 Birch Boulevard, Room 10, Miami, FL 33101, United States"
      ];
      
      
      
  return (
    <div>
      <div className=" bg-orange-400 h-[8rem]">
        <h1 className=" text-[5rem] px-4">CHECKOUT </h1>
      </div>
      <div className="   flex ">
        <div className=" bg-green-400 flex-1">
            <div className="py-4 px-5">
                <div className=" ">
                     <h1 className=" text-[2rem] px-2">SHIPPING ADDRESS</h1>
                     <div className="" >
                            <Input placeholder="Country" className=" my-3 border-2 border-black" />
                            <div className=" flex">
                                <Input placeholder="First Name"  className=" mr-2 my-3 border-2 border-black" />
                                <Input placeholder="Last Name"  className=" my-3 border-2 border-black" />
                            </div>
                            <Input placeholder="Adress"  className=" my-3 border-2 border-black" />
                            <Input placeholder="Apartment,suite etc"  className=" my-3 border-2 border-black" />
                            <div className=" flex">
                                <Input placeholder="City"  className=" mr-2 my-3 border-2 border-black" />
                                <Input placeholder="State"  className=" my-3 border-2 border-black" />
                            </div>
                            <Input placeholder="Landmark"  className=" my-3 border-2 border-black" />
                            <div className=" flex">
                                <Input placeholder="zip/code"  className=" mr-2 my-3 border-2 border-black" />
                                <Input placeholder="Phone number"  className=" my-3 border-2 border-black" />
                            </div>
                     </div>
                </div>

                <div>
                    <h1 className=" text-[2rem] uppercase"> Saved address</h1>
                    <div>
                        <RadioGroupComponent address={addresses} />
                    </div>
                </div>
                <div className=" border-2 border-black  mt-8">

                </div>
                <div>
                    <h1 className=" text-[2rem] px-2">PAYMENT METHOD</h1>
                    <div className=" flex">
                        <Input placeholder="Card Number"  className=" mr-2 my-3 border-2 border-black" />
                        <Input placeholder="MM/YY"  className=" my-3 border-2 border-black" />
                    </div>
                    <div className=" flex">
                        <Input placeholder="CVV"  className=" mr-2 my-3 border-2 border-black" />
                        <Input placeholder="Name on card"  className=" my-3 border-2 border-black" />
                    </div>
                    <StyledButton buttonName="Proceed to Payment" />
                </div>
            </div>
        </div>
        <div className=" bg-pink-500 flex-1">
          <div className=" px-5 py-5">
            <h1 className=" text-[3rem]"> SUMMARY</h1>
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
        </div>
      </div>
    </div>
  );
};

export default page;
