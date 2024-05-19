"use client";
import UploadImage from "@/components/uploadImage";
import React from "react";
import { Check } from 'lucide-react';
import Link from "next/link";

const page = () => {
  return (
    <div className="overflow-hidden border-2 border-black  flex flex-col ">
      <div className=" bg-violet-600 w-full border-b-4 border-black fixed top-0 left-0 right-0 z-10">
        <div className="flex px-16 items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-center mt-4 uppercase">
              Profile
            </h1>
            <h1 className="mb-5 font-bold text-[25px] uppercase">
              Update your profile
            </h1>
          </div>
         
          <div className=" flex">
            <div className="h-[4rem]">
              <Link href="/">
                <button className=" mr-12 p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-green-600">
                  <h1 className="font-bold">Back to Home Page</h1>
                </button>
              </Link>
            </div>
            <div className="h-[4rem]">
              <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-pink-600">
                <h1 className="font-bold">Logout</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 ">
        {/* Adjust this margin-top to ensure content starts below the fixed topbar */}
        <div className="bg-pink-600 flex-1 border-2 border-black h-[200vh] px-[5rem] ">
          <div className="  bg-teal-600 border-2 border-black  h-[30rem] mt-5  ">
            <div className="flex justify-between h-full px-6 py-6  text-wrap">
              <div className="  h-full pr-4  w-[34rem]">
                <h1 className=" text-4xl font-bold">Profile Photo</h1>
                <p className=" text-2xl mt-4"> This image will appear as your profile photo</p>
              </div>
              <div className="flex flex-col    border-2 border-black flex-1  h-full  ">
                <div className=" flex px-4 py-4 justify-between h-full">
                  <div>
                    <div className=" pl-[2rem] pt-4 flex   h-[10rem] w-full">
                      <UploadImage />
                    </div>
                  </div>
                </div>
                <div className=" bg-yellow-500 border-t-2 border-black h-[5rem] flex w-full justify-end">
                  <div className=" flex pr-5 pb-6">
                    <div className="h-[4rem] ">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-red-600 mr-4">
                        <h1 className="font-bold">Cancel</h1>
                      </button>
                    </div>
                    <div className="h-[4rem]">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-pink-500">
                        <h1 className="font-bold">Save</h1>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="  bg-teal-600 border-2 border-black   mt-5  ">
            <div className="flex justify-between h-full px-6 py-6  text-wrap">
              <div className="  h-full pr-4 ">
                <h1 className=" text-4xl font-bold">Personal information </h1>
                <p className=" text-2xl  mt-4">Upload your personal information here</p>
              </div>
              <div className="flex flex-col  border-2 border-black w-[50vw]  h-full  ">
                <div className=" flex px-4 py-4 justify-center h-full ">
                  <div>
                  <form className="" >
              <div className="flex flex-col items-center">
               <div className=" flex ">
               <input
                  type="text"
                  placeholder="First Name"
                  className=" w-64 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none  mr-8"
                />
                 <input
                  type="text"
                  placeholder="Last Name"
                  className="w-64 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                />
               </div>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                />
                
                <div className=" flex">
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  className="w-[30rem] mr-4 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                />
          <div className=" h-[4rem]">
                  <div className="  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4  bg-green-500">
                    <h1 className=" font-bold"><Check/> </h1>
                  </div>
                </div>
                </div>
                
                <div className=" h-[4rem]">
                  <button className="  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-green-500">
                    <h1 className=" font-bold">Verify Phone Number </h1>
                  </button>
                </div>
              </div>
                  </form>
                  </div>
                </div>
                <div className=" bg-yellow-500 border-t-2 border-black h-[5rem] flex w-full justify-end">
                  <div className=" flex pr-5 pb-6">
                    <div className="h-[4rem] ">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-red-600 mr-4">
                        <h1 className="font-bold">Cancel</h1>
                      </button>
                    </div>
                    <div className="h-[4rem]">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-pink-500">
                        <h1 className="font-bold">Save</h1>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="  bg-teal-600 border-2 border-black   mt-5  ">
            <div className="flex justify-between h-full px-6 py-6  text-wrap">
              <div className="  h-full pr-4 ">
                <h1 className=" text-4xl font-bold">Update Password </h1>
                <p className=" text-2xl  mt-4">Enter your Current Password to update it </p>
              </div>
              <div className="flex flex-col  border-2 border-black w-[50vw]  h-full  ">
                <div className=" flex px-4 py-4 justify-center h-full ">
                  <div>
                  <form className="" >
              <div className="flex flex-col items-center">
               
                <input
                  type="password"
                  placeholder="Current pasword"
                  className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                />

<input
                  type="password"
                  placeholder="New pasword"
                  className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                />  
                
                                          
              </div>
                  </form>
                  </div>
                </div>
                <div className=" bg-yellow-500 border-t-2 border-black h-[5rem] flex w-full justify-end">
                  <div className=" flex pr-5 pb-6">
                    <div className="h-[4rem] ">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-red-600 mr-4">
                        <h1 className="font-bold">Cancel</h1>
                      </button>
                    </div>
                    <div className="h-[4rem]">
                      <button className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-pink-500">
                        <h1 className="font-bold">Save</h1>
                      </button>
                    </div>
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
