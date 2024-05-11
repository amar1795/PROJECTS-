"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

import Testcarousel from "@/components/carousel";

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
    </div>
   </main>
  );
}
