import CheckoutProductCard from '@/components/checkout product card/checkoutProductCard'
import ProductCard from '@/components/product card/productCard'
import StyledButton from '@/components/styled Button/StyledButton'
import { Delete, DollarSign, Heart, Minus, Plus, Recycle, Trash2 } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='  border-2 border-black rounded-lg '>
      <div className=' bg-orange-600 h-[8rem]'>
        Your Bag
      </div>
      <div className=' bg-green-500 flex justify-between px-10 py-4'>
       <div>
            <div className=' px-4 py-4 w-[40rem] flex-1 border-2 border-black'>
                <CheckoutProductCard />  
                </div>
       </div>
       <div className=' w-[18rem]  border-2 border-black '>

       <div className='  h-full bg-opacity-20 backdrop-blur-lg border border-white/30 bg-white'>
       <div className=' px-4 py-4 '>
            <h1> Order Summary</h1>
            <div className=' flex justify-between '>
                <div className=' self-center'>
                    2 Items
                </div>
                
                <div className=' flex self-center py-2'>
                            <div className=' self-center'>
                            <DollarSign size={20} /> 
                            </div>
                            <h1  className=' text-[1.3rem] self-center'>
                            9.99
                            </h1>
                        </div>
                </div>
                <div>
            </div>
            <div className=' flex justify-between'>
                <div className=' self-center'>
                    Delivery
                </div>
                
                <div className=' flex self-center py-2'>
                            
                            <h1  className=' text-[1.3rem] self-center'>
                           Free
                            </h1>
                        </div>
                </div>
                <div>
            </div>

            <div className=' border-b-2 border-black'></div>
            <div className=' flex justify-between '>
                <div className=' self-center font-bold'>
                    Total
                </div>
                
                <div className=' flex self-center py-2 font-bold'>
                            <div className=' self-center'>
                            <DollarSign size={20} /> 
                            </div>
                            <h1  className=' text-[1.3rem] self-center '>
                            9.99
                            </h1>
                        </div>
                </div>
                <div>
            </div>
            <div>
            <StyledButton buttonName=' Proceed to Checkout'/>
         </div>
        </div>
        
       </div>
       </div>
      </div>
      <div className=' bg-teal-500 '>
            <div className='   min-h-[30rem] px-5'>
                    <h1 className=' pt-4 pb-4'>
                    Related products 
                    </h1>

                <div className=' flex  flex-wrap pl-3'>
                    <div className=' pr-10 py-4'>
                        <ProductCard />
                        </div>
                        <div className=' pr-10 py-4'>
                        <ProductCard />
                        </div>

                </div>
                    
                </div>
      </div>
    </div>
  )
}

export default page
