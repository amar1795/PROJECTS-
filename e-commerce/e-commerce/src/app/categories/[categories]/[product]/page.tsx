"use client"
import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb";
import MainFooter from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import React from "react";
import {
  DollarSign,
  Heart,
  Star,
  StarIcon,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { SelectSeparator } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import StarChart from "@/components/star charts/starChart";
import ProductCard from "@/components/product card/productCard";
import Image from "next/image";
import PhotoViewer from "@/components/photo viewer/photoViewer";
import CategoriesRight from "@/components/categories/CategoriesRight";
import CategoriesRelatedProduct from "@/components/categories/CategoriesRelatedProduct";

const page = ({ params }: { params: { product: string } }) => {
    
  const completeUrl = typeof window !== "undefined" ? window.location.href : "";
  const segments = completeUrl.split("/");
  const previousSegment = segments[segments.length - 2];
  console.log("this is the Previous segment:", previousSegment);
  const images = [
    "https://images.pexels.com/photos/23541799/pexels-photo-23541799/free-photo-of-shine-bright.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/17395579/pexels-photo-17395579/free-photo-of-shiny-water-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/20632751/pexels-photo-20632751/free-photo-of-a-cup-of-tea-and-dates-on-a-white-cloth.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/19602378/pexels-photo-19602378/free-photo-of-hands-holding-pizzas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/23541799/pexels-photo-23541799/free-photo-of-shine-bright.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/20582544/pexels-photo-20582544/free-photo-of-waves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/24023467/pexels-photo-24023467/free-photo-of-a-wedding-reception-in-a-greenhouse-with-chandeliers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];


  const breadcrumbsData = [
    { id: 1, href: "/", label: "Home" },
    { id: 2, href: `/categories/${previousSegment}`, label: previousSegment },
    { id: 3, href: params.product, label: params.product },
  ];

  return (
    <div className=" overflow-hidden">
      <div className="fixed top-0 left-0 right-0  z-10">
        <MainNav />
      </div>

      <div className=" mt-[8rem]">
        <div>
          <div className="mt-5 mb-5">
            <BreadcrumbWithCustomSeparator items={breadcrumbsData} />
          </div>

          <div className="bg-green-700 h-auto flex ">
            <div className=" bg-yellow-400 flex-1 h-auto">
            <PhotoViewer images={images} />

            </div>
            <div className="flex-1 h-[115rem]">
           {/* right component */}
           <CategoriesRight />
            </div>
          </div>
         <div>
         <CategoriesRelatedProduct />

         </div>
          <MainFooter />
        </div>
      </div>
    </div>
  );
};

export default page;
