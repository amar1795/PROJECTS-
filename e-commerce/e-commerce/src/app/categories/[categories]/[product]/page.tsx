"use client"

import { BreadcrumbWithCustomSeparator } from '@/components/breadcrumb'
import MainFooter from '@/components/footer'
import { MainNav } from '@/components/main-nav'
import React from 'react'
import { DollarSign, Heart, Star } from 'lucide-react';
import { SelectSeparator } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import StarChart from '@/components/star charts/starChart'
const page = ({ params }: { params: { product: string } }) => {
    const [outOfStock,setoutOfStock] = React.useState(false)
    const completeUrl = window.location.href;
    const segments = completeUrl.split('/');
    const previousSegment = segments[segments.length - 2];
    console.log("this is the Previous segment:", previousSegment);

    const breadcrumbsData = [
        {id:1, href: "/", label: "Categories" },
        {id:2, href: previousSegment, label: previousSegment },
        {id:3, href: params.product, label: params.product }
      ];


return (
    <div className=' overflow-hidden'>
        <div className="fixed top-0 left-0 right-0 bg-white z-10">
            <MainNav />
        </div>
    
       <div className=' mt-[6rem]'>
       <div >
            <div className='mt-5 mb-5'>
            <BreadcrumbWithCustomSeparator items={breadcrumbsData} />
        </div>

        <div className="bg-green-700 h-[auto] flex pb-5">

            <div className=' bg-yellow-400 flex-1 '>
                product image
            </div>
            <div className=' bg-pink-500 flex-1'>
               <div className=' px-4'>
                <h1 className=' text-[2rem] font-bold'>COMPANY NAME</h1>
                <h2 className=' text-[1.2rem]'>PRODUCT HEADING</h2>
                <div className='star_rating flex justify-between w-[12rem] border border-black mt-5 h-[2rem]'>
                     <div className='star flex self-center border-r border-black pr-4'><div className=' pl-2'>
                     3.6</div>
                     <div className=' pl-2 self-center'>
                     <Star fill='black' size={18}/>
                     </div></div>
                     <div className='rating self-center pr-2'>
                        125 Ratings
                     </div>

                </div>
                <div className=' border-b-2 border-gray-300 mt-5'>
                </div>
                <div className=' mt-2'>

                
                   <div className=' flex justify-between w-[10rem]  mb-2'>
                   <h1 className=' self-center'>
                    MRP 
                    </h1>

                    <div className=' flex px-5 self-center'>
                    <div className=' self-center'>
                    <DollarSign size={16}/>
                    </div>
                    <h1 className=' text-[2.5rem] font-bold'>
                        2399
                    </h1>
                    </div>
                    
                   </div>
                    <h3>Inclusive of all taxes</h3>

                    <div className='button flex w-[15rem] justify-between mt-5'>
                     {!outOfStock ?<div>
                        <Button>Buy Now</Button>
                        </div> : <div >
                        <Button variant="destructive" className="pointer-events-none ">Out of Stock</Button>
                        
                        </div> }   
                       
                        <div className=' ml-4'>
                        <Button className=' w-[8rem]'><Heart size={18} className=' mr-2'/>Wishlist</Button>
                        </div>
                        
                    </div>
                </div>
                <div className=' border-b-2 border-gray-300 mt-5'>
                </div>
                <div className=' h-[30rem] bg-red-600 mt-10'>
                100% Original Products and product details page

                </div>

                <div className=' h-[30rem] bg-green-600 mt-10'>
                    <div className=' text-white h-auto flex flex-col '>
                      <div className=' flex mt-5 pl-8'>
                        <div>
                        <h1 > RATINGS  </h1>
                        </div>
                      <div className=' px-5'>
                            <Star fill='aqua' stroke='0.5'/>
                      </div>
                      </div>

                        <div className=' flex mt-6'>
                            <div className='left flex-1 border-r-2 border-gray-600 pl-8 pr-4 '>
                                <div className=''>
                                <div className='top flex mt-5 mb-2'>
                                <p className=' text-[5rem] leading-none m-0 p-0 font-thin '>3.6 </p>
                                <div className=' self-center ml-5'>
                                    <Star fill='aqua' size={38} stroke='0.5'/>
                                </div>
                                </div>
                                <div className='Bottom'>
                                    789  Verified Buyers

                                </div>
                                </div>
                                
                                
                            </div>
                            <div className=' text-black w-[5rem] pl-5  flex flex-col justify-between'>
                                <p className=' flex w-5' >5 <div className=' self-center pl-2 ' ><Star stroke='2' fill='aqua' size={15}/></div></p>
                                <p className=' flex w-5' >4 <div className=' self-center pl-2 ' ><Star stroke='2' fill='yellow' size={15}/></div></p>
                                <p className=' flex w-5' >3 <div className=' self-center pl-2 ' ><Star stroke='2' fill='green' size={15}/></div></p>
                                <p className=' flex w-5' >2 <div className=' self-center pl-2 ' ><Star stroke='2' fill='orange' size={15}/></div></p>
                                <p className=' flex w-5' >1 <div className=' self-center pl-2 ' ><Star stroke='2' fill='red' size={15}/></div></p>
                                
                            </div>

                            <div className='right flex-1 pl-[14rem]  z-0'>
                                <div className='  rotate-90 w-[5.5rem] h-[2rem] '>
                                    <StarChart/>
                                </div>
                             </div>
                             <div className=' text-black w-[5rem]   flex flex-col justify-between'>
                                <p className=' flex w-5 pl-0' >322 </p>
                                <p className=' flex w-5' >21 </p>
                                <p className=' flex w-5' >15 </p>
                                <p className=' flex w-5' >75 </p>
                                <p className=' flex w-5' >51 </p>
                                
                                
                            </div>
                            
                        </div>
                    </div>

                </div>
               </div>
            </div>

        </div>
        <div className='  bg-blue-500 h-[5rem]'>
            Related products 
        </div>
        
        <MainFooter />
        </div>
       </div>
    </div>
)
}

export default page
