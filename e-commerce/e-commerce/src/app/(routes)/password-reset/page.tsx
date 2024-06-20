"use client"
import React,{useRef} from 'react'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

const page = () => {
    const { toast } = useToast();
    const [showToast, setShowToast] = React.useState(false);
    const router = useRouter();
    
    const handleClick = () => {
        setShowToast(false);
        setTimeout(() => {
          setShowToast(true);
      }, 2000); // 2-second delay
    };

    React.useEffect(() => {
            if (showToast) {
              toast({
                title: "Password has been reset successfully!",
                description: "You will be redirected to the login page within 5 seconds",
              });
              setTimeout(() => {
                router.push('/login');
              }, 2000); 

              // Reset the showToast state to prevent repeated toasts
              setShowToast(false);
            }
          }, [showToast, toast]);
  return (
    <div className=" overflow-hidden border-2 border-black">
    <div className=" flex h-screen ">
      
      <div className=" bg-pink-500 flex-1  border-2 border-black">
      <div className=' flex flex-col items-center pt-[8rem] h-[30rem] '>
      <h1 className="text-4xl font-bold text-center  mt-4 mb-4 uppercase">
            Create your new password
            </h1>
            <input
                  type="password"
                  placeholder="Password"
                  className="w-[34rem] mt-4 mb-4 p-2 border-2 border-black bg-white text-black  flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-[34rem] p-2 border-2 mb-4 border-black bg-white text-black mt-4 flex self-center justify-center border-b-8 border-r-4  focus:outline-none "
                />

                
                <div className=" h-[4rem]">
                <button className="w-[15rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2  bg-yellow-400"  onClick={handleClick} >
                    <h1 className=" font-bold"> Create New Password </h1>
                  </button>
                </div>
                
            </div> 
      </div>
    </div>
  </div>
  )
}

export default page
