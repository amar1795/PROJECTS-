import { DollarSign, Heart, Minus, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const CheckoutProductCard = () => {
  return (
    <div>
       <div className=' border-2 border-black  rounded-xl overflow-hidden'>
                <div className=' overflow-hidden flex justify-between bg-opacity-20 backdrop-blur-lg border border-white/30 bg-white '>

                    

                <div className=' flex'>
                            <img src="https://images.pexels.com/photos/23541799/pexels-photo-23541799/free-photo-of-shine-bright.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                            'https://images.pexels.com/photos/17395579/pexels-photo-17395579/free-photo-of-shiny-water-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className=' h-[11rem] w-[10rem] object-cover  px-2 py-4 transform transition-transform duration-300 hover:scale-110 '  />
                            <div className=' price py-4'>
                                    <h1 className=' py-2 px-2'>
                                        Product Name
                                    </h1>
                                    <h1 className=' py-2 px-2'>
                                        Company Name
                                    </h1>
                                    <div className='box flex pr-4 py-2 px-2'>
                        <button className=' pr-2  hover:bg-gray-200 pl-1'>
                        <Minus size={20} />
                        </button>
                            <div className=' text-[1.5rem] w-7  h-[2rem]'>
                                <div className=' px-2  '>
                                0
                                </div>
                            </div>
                            <button className=' pl-2  hover:bg-gray-200 pr-1'>
                            <Plus size={20} />
                            </button>
                        </div>

                        </div>
                
                </div>
                <div className='  w-[6rem] px-2 self-center h-[5rem]  mr-5'>
                        <div className=''>
                        <div className=' flex self-center py-2'>
                            <div className=' self-center'>
                            <DollarSign size={20} /> 
                            </div>
                            <h1  className=' text-[1.3rem] self-center'>
                            9.99
                            </h1>
                        </div>
                        <div className=' flex justify-between '>
                        <button className='transform transition-transform duration-300 hover:scale-110'>
                        <Heart size={25} />
                        </button>
                            <button className='transform transition-transform duration-300 hover:scale-110'>                                          
                            <Trash2/>
                            </button>


                        </div>
                        </div>
                    </div>

                    

                </div>    
            </div>
    </div>
  )
}

export default CheckoutProductCard
