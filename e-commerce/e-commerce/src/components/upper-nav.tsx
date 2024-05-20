"use client";
import { Button } from "@/components/ui/button";
import Dropdown from "./Dropdown";
import CategoriesDropdown from "./Categories-dropdown";
import { ThemeToggle } from "./theme-toggle";
import { FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import ShoppingCart from "./shopping-cart";
import WishingListIcon from "./wishing-list-icon";
import { Heart, Moon, MoonIcon, SunIcon } from "lucide-react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import CustomThemeToggle from "./DarkModeButton/CustomThemeToggle";
import { useTheme } from "next-themes"

const Uppernav = () => {

  return (
    <div className=" flex justify-center items-center mt-7 w-full h-10 px-[1.9rem]">
      <div className="w-full h-[9rem] bg-white bg-opacity-[80px] backdrop-blur-lg border border-white/30 flex justify-center items-center">
        <div className=" mr-5">
          <CustomButton buttonName="All" />
        </div>

        <div className=" mr-12">
          <CustomInput  />
        </div>

        <div className="mx-2 ">
          <CustomButton buttonName="Hello User" />
        </div>

        <Link href="/cart">
          <div className=" mr-4">
            <button className=" p-2 border-2 border-black text-black flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-yellow-500">
              <ShoppingCart />
            </button>
          </div>
        </Link>

        <Link href="/wishlist">
          <div className=" ">
            <button className=" p-2 border-2 border-black text-black flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-yellow-500">
              <WishingListIcon />
            </button>
          </div>
        </Link>

        <div className=" px-5 ml-5">
          <CustomThemeToggle />
          
        </div>
      </div>
    </div>
  );
};

export default Uppernav;
