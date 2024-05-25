import { Trash2 } from 'lucide-react'
import React from 'react'

const OrderDetailsComponent = () => {
  return (
    <div>
      <div className="  bg-yellow-500 mt-4">
                  <div className=" flex  text-[1.3rem] border-2 border-black border-b-8 border-r-4">
                    <img
                      src="https://images.pexels.com/photos/23541799/pexels-photo-23541799/free-photo-of-shine-bright.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                            'https://images.pexels.com/photos/17395579/pexels-photo-17395579/free-photo-of-shiny-water-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                      className=" h-[11rem] w-[10rem] object-cover  px-2 py-4  "
                    />
                    <div className=" price py-4">
                      <h1 className=" py-2 px-2">Product Name</h1>
                      <h1 className=" py-2 px-2">Company Name</h1>
                      <h1 className=" py-2 px-2">Qty <span>1</span></h1>
                      
                    </div>
                    <div className=' w-[5rem] flex pl-7 h-0 pt-[4.5rem]'>
                    <button className='transform transition-transform duration-300    hover:scale-110 '>                                          
                            <Trash2 size={30}/>
                            </button>
                    </div>
                  </div>
                  
                  <div>
                  
                  </div>
                </div>
    </div>
  )
}

export default OrderDetailsComponent
