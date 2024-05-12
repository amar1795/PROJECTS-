"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

import ProductCarousel from "@/components/product-carousel/carousel";
import Testcarousel from "@/components/poster-carousel/carousel";
import { ThreeDCardDemo } from "@/components/3d card/3dCard";

export default function Home() {
  return (
   <main className=" ">
    <div className="">
    
    <h1>
      This is the homePage
    </h1>
    
   
    <div>
      <Testcarousel/>
    </div>

    
    <div className=" my-12">
      <h1>This is product carousel</h1>
      <ProductCarousel SlideCount={20}/>
    </div>
    <div className=" my-12">
      <h1>This is Mens carousel</h1>
      <ProductCarousel SlideCount={20}/>
    </div>
    <div className=" my-12 mb-4">
      <h1>This is Womens carousel</h1>
      <ProductCarousel SlideCount={20}/>
    </div>
    </div>

    <div>
      {/* <ThreeDCardDemo/> */}
    </div>
   </main>
  );
}
