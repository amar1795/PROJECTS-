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

export default function Home() {
  return (
   <main className=" h-screen ">
    <div className="">
    
    <h1>
      This is the homePage
    </h1>
    <div className="">
   
    <div>
      <Testcarousel/>
    </div>

    </div>
    <div>
      <h1>This is product carousel</h1>
      <ProductCarousel SlideCount={20}/>
    </div>
    </div>
   </main>
  );
}
