"use client"

import { BreadcrumbWithCustomSeparator } from '@/components/breadcrumb'
import MainFooter from '@/components/footer'
import { MainNav } from '@/components/main-nav'
import React from 'react'
import { DollarSign, Heart, Star } from 'lucide-react';
import { SelectSeparator } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

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
    <div className=' '>
        <div className="fixed top-0 left-0 right-0 bg-white">
            <MainNav className="mt-5" />
        </div>
    
       <div className=' mt-[6rem]'>
       <div >
            <div className='mt-5 mb-5'>
            <BreadcrumbWithCustomSeparator items={breadcrumbsData} />
        </div>

        <div className="bg-green-700 h-[130vh] flex">

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
                <div>
                100% Original Products and product details page

                </div>
               </div>
            </div>

        </div>
        <div className=' bg-blue-500 h-[5rem]'>
            Related products 
        </div>
        
        <MainFooter />
        </div>
       </div>
    </div>
)
}

export default page
