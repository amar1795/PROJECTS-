"use client"
import Signup from "@/components/Signup";
import Login from "@/components/login";

import Image from "next/image";
import React from "react";

const page = () => {
  const [isSignup, setIsSignup] = React.useState(false);

  const toggleView = () => {
    setIsSignup(!isSignup);
  };
  return (
    <div className="h-screen bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 animate-wave bg-[length:200%_200%] flex justify-center items-center ">
      <div className="h-[35rem] w-[70rem] flex justify-center bg-opacity-20 backdrop-blur-lg border-2 border-black bg-white rounded-3xl overflow-hidden">
        <div className=" relative  w-[30rem] border-r-2 border-black ">
          <Image
            src="/6.jpg"
            alt="Logo"
            layout="fill"
            className=" object-cover"
          />
        </div>
        <div className=" flex-1">
        {isSignup ? <Signup toggleView={toggleView} /> : <Login toggleView={toggleView} />}

        </div>
      </div>
    </div>
  );
};

export default page;
