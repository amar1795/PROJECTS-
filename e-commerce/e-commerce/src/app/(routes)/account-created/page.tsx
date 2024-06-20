import React from "react";

const page = () => {
  return (
    <div>
      <div className=" bg-pink-500 border-2 border-black px-10 pb-10 min-h-[40rem]">
        <div>
          <div className="flex self-center justify-center">
            <h1 className=" text-[3rem] uppercase  p-2 border-2 border-black text-black mt-4  border-b-8 border-r-4 bg-teal-500 font-bold px-10 ">
             Forgor your Password yeah ? 
            <span className=" " >&#128514;</span>
            </h1>

          </div>
          <div className=" mt-10">
            <h3 className=" text-[1.5rem]  ">
              Seems Like you forgot your password for your PurhcasesPal Account
              lol . No worries we got you covered. If this is true Please click
              the link below to reset your password.
            </h3>

            <div className="flex self-center justify-center h-28 ">
              {/* <a href={`https://localhost:3000/password-reset?token=${token}`}> */}
              <button className=" p-3 px-10  border-2 border-black bg-green-600  text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 text-[2rem] uppercase font-bold">
                {"  Reset My Password"}
               
              </button>
              {/* </a> */}
            </div>
            <h3 className=" text-[1.5rem]   mt-7">
          If you did not request a password reset, you can safely ignore this email and your account will not be affected.
          </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
