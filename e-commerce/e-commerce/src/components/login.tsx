import Image from 'next/image'
import React from 'react'

const Login = () => {
  return (
    <div>
      <div className=" mt-8">
            <h1 className="text-4xl font-bold text-center ">
              Welcome To Purchase Pal!
            </h1> 
            <form className="mt-8" >
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-96 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-96 p-2  border-2 border-black bg-white text-black flex self-center justify-center border-b-8 border-r-4  focus:outline-none mt-4"
                />
                <div className=" h-[4rem]">
                  <button className="w-80  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-yellow-500">
                    <h1 className=" font-bold">Login </h1>
                  </button>
                </div>
              </div>
            </form>
            <div className=" mt-4 flex justify-center ">
              <p>Forgot your Password ?</p>
              <button className=" px-4"> Click Here </button>
            </div>
            <div className=' text-center'>
              <p className=" mx-[5rem] mt-4">
                Don't have an account ? <button className=" font-bold text-2xl">Sign Up</button>
              </p>
            </div>
            <div className=" flex justify-center mt-4">
              <div className=" border-2 border-gray-600 w-[10rem] h-0 self-center mr-5"></div>
              Or
              <div className=" border-2 border-gray-600  w-[10rem] h-0 ml-5 self-center"></div>
            </div>
            <div className=" flex justify-center">
              <button className="w-80 p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2">
                <Image
                  src="/google.png"
                  width={20}
                  height={20}
                  alt="Logo"
                  className=" rounded-full mr-2 "
                />
                <h1 className="">Login with Google</h1>
              </button>
            </div>
          </div>
    </div>
  )
}

export default Login
