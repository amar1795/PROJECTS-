"use client"
import { Button } from "@/components/ui/button";
import Dropdown from "./Dropdown";
import CategoriesDropdown from "./Categories-dropdown";
import { ThemeToggle } from "./theme-toggle";
import { FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import ShoppingCart from "./shopping-cart";
import WishingListIcon from "./wishing-list-icon";
import { Heart } from "lucide-react";



const Uppernav = () => {
  return (
    <div className=" flex justify-center items-center mt-7 w-full h-10 px-[1.9rem]"> 
      <div className="w-full h-[9rem] bg-white bg-opacity-[80px] backdrop-blur-lg border border-white/30 flex justify-center items-center">
    <CategoriesDropdown/> 
          <input type="text"  placeholder="Search for products,brands and more" className=" bg-white text-black h-10 w-5/12 border-2 border-black rounded-sm  px-4 font-mono"  />

         
          <Button className=" ml-2 ">
          <Heart/>
          </Button>
                
           <div className="mx-2">
           <Dropdown/>
           </div>         

           <Link href="/cart">
          <button className=" flex ">
          <ShoppingCart />
          </button>
            </Link>

          <Link href="/wishlist">
          <button className=" flex " >
            <WishingListIcon/>
            </button>
            </Link>
          
          <div className=" px-5 ml-5">
          <ThemeToggle/>
          </div>
          </div>
    </div>
  )
}

export default Uppernav
