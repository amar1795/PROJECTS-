import React from 'react'
interface SignupProps {
  toggleView: () => void;
}
const Signup:React.FC<SignupProps> = ({toggleView }) => {
  return (
    <div>
       <div className=" mt-8">
            <h1 className="text-4xl font-bold text-center ">
            Get Started with Us !
            </h1> 
            <h1 className="text-4xl font-bold text-center">
            Create Your Free Account
            </h1>
            <form className="mt-8" >
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
                <input
                  type="password"
                  placeholder="Password"
                  className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-[34rem] p-2 border-2 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                />

                
                <div className=" h-[4rem]">
                  <button className="w-80  p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-green-500">
                    <h1 className=" font-bold">Create Account </h1>
                  </button>
                </div>
              </div>
            </form>
           
            <div className=" text-center">
              <p className=" mx-[5rem] mt-4">
                Already have an Account ? <button className=" font-bold text-2xl" onClick={toggleView}>Login </button>
              </p>
            </div>
            
         
          </div>
    </div>
  )
}

export default Signup
