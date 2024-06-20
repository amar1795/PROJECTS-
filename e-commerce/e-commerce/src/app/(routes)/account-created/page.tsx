import React from "react";

const page = () => {
  return (
    <div>
      <div className=" bg-pink-500 border-2 border-black px-10 pb-10 min-h-[40rem]">
        <div>
          <div className="flex self-center justify-center">
            <h1 className=" text-[3rem] uppercase  p-2 border-2 border-black text-black mt-4  border-b-8 border-r-4 bg-yellow-500 font-bold px-10 ">
              Successfully updated the Password
            </h1>
          </div>
          <div className=" mt-10">
            <h3 className=" text-[1.5rem]  ">
              Congractulations you have successfully updated the password for
              your PurchasePal Account.If you haven't done this, please contact
              us immediately.
            </h3>

            
            
          </div>
          <div className=" mt-10">
          <h1 className=" text-[1.8rem]  font-bold" > Best Regards</h1>
          <h1 className=" text-[1.8rem]  font-bold" > Team PurchasePal</h1>
          </div>
        </div>


      </div>
    </div>
  );
};

export default page;
