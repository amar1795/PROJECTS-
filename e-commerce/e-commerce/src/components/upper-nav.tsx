"use client"
import { Button } from "@/components/ui/button";
import Dropdown from "./Dropdown";
import CategoriesDropdown from "./Categories-dropdown";
import { ThemeToggle } from "./theme-toggle";
import { FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import ShoppingCart from "./shopping-cart";
import WishingListIcon from "./wishing-list-icon";



const Uppernav = () => {
  return (
    <div className=" flex justify-center items-center mt-7 w-full h-10 px-[1.9rem]"> 
      <div className="w-full h-[9rem] bg-white bg-opacity-[80px] backdrop-blur-lg border border-white/30 flex justify-center items-center">
    <CategoriesDropdown/> 
          <input type="text"  placeholder="Search for products,brands and more" className=" bg-white text-black h-10 w-5/12 border-2 border-black rounded-sm  px-4 font-mono"  />

         
          <Button className=" ml-2 ">
          <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="h</</svg>svg>ttp://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
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
