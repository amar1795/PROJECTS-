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

export default async function Home() {
  
 

  return (
   <main className=" ">
    {/* hscreen was causing the issue for the footer as hscreen sets the height of the current viewable screen hence the footer waas not going to the bottom */}
    <div className="">
    <div className=" h-[4rem] mb-[2rem]">
                  <h1 className="w-[50rem]  text-[2rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4  bg-yellow-500">
                  Experience Shopping Like Never Before
                  </h1>
                </div>
    
    <div>
      <Testcarousel />
    </div>

    <div className="">
      
    <div className=" my-12 ">
    <div className=" h-[4rem] mb-[2rem]">
                  <h1 className="w-80  text-[2rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4  bg-yellow-500">
                    Mens Collection
                  </h1>
                </div>
      <ProductCarousel SlideCount={20}/>
    </div>
    <div className=" my-12">
    <div className=" h-[4rem] mb-[2rem]">
                  <h1 className="w-[25rem]  text-[2rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4  bg-yellow-500">
                    Womens Collection
                  </h1>
                </div>
      <ProductCarousel SlideCount={20}/>
    </div>
    <div className=" my-12 mb-4">
    <div className=" h-[4rem] mb-[2rem]">
                  <h1 className="w-80  text-[2rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4  bg-yellow-500">
                    Kids Collection
                  </h1>
                </div>
      <ProductCarousel SlideCount={5}/>
    </div>
    </div>
    </div>

    <div>
      {/* <ThreeDCardDemo/> */}
    </div>
   </main>
  );
}
