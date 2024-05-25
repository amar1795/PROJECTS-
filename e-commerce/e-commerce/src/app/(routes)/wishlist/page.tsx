import OrderDetailsComponent from '@/components/order summary component/OrderDetailsComponent'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className=" min-h-[95vh] bg-pink-500 ">
        <h1 className=" text-[4rem] pl-10 uppercase">Your Wishlisted Items</h1>
        <div className=" px-8">
          <div className=" border-black border-b-4 "></div>
        </div>       
       <div  className=' flex flex-wrap px-11'>
       <div className='w-[25rem] mr-5'>
        <OrderDetailsComponent />
        </div><div className='  w-[25rem] mr-5'>
        <OrderDetailsComponent />
        </div><div className='  w-[25rem] mr-5'>
        <OrderDetailsComponent />
        </div>
       
       </div>
      </div>
    </div>
  )
}

export default page
