"use client";
import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb";
import MainFooter from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import React, { useEffect } from "react";
import {
  DollarSign,
  Heart,
  Star,
  StarIcon,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useSession } from "next-auth/react";

import { SelectSeparator } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import StarChart from "@/components/star charts/starChart";
import ProductCard from "@/components/product card/productCard";
import Image from "next/image";
import PhotoViewer from "@/components/photo viewer/photoViewer";
import CategoriesRight from "@/components/categories/CategoriesRight";
import CategoriesRelatedProduct from "@/components/categories/CategoriesRelatedProduct";
import { fetchProductAllData, getProductsByCategory, getProductsByCategoryOriginal } from "@/actions/createProduct";
import { useCurrentUser } from "@/hooks/use-current-user";
//meta data generation
// export async function generateMetadata({ params }: { params: { product: string}}) {

//   const post = await await fetchProductAllData(params.product)
//   return {
//     title: post?.name,
//     description: post?.description,
//   };
// }

export type relatedProduct = {
  id: string;
  name: string;
};

export type updatedDataResponse = {
  id: string;
  name: string;
  price: number;
  discount: number | null;
  discountedPrice: number | null;
  description: string;
  category: {
      id: string;
      name: string;
  };
  brand: {
      id: string;
      name: string;
  };
  images: {
      id: string;
      url: string;
  }[];

  ratings: {
      count: {
          1: number;
          2: number;
          3: number;
          4: number;
          5: number;
      };
      reviews: {
          rating: number;
          review: string;
      }[];
      totalReviews: number;
      totalRatings: number;
      averageRating: number;
  };
  createdAt: string;
  updatedAt: string;
};

const page = ({ params }: { params: { product: string } }) => {
  const { data: session } = useSession();
  console.log("this is the session",session?.user?.id)

  
  const [outOfStock, setoutOfStock] = React.useState(false);

  const [data, setData] = React.useState<updatedDataResponse | null>(null);  
  const [relatedProducts, setRelatedProducts] = React.useState<relatedProduct[] | null>(null);
  const [parentCategory, setParentCategory] = React.useState<string>("");
  const [mensCollectionData, setMensCollectionData] = React.useState<any[]>([]);

  // this user doesn't work for some reason whereas this is meant to be used in the client side
  const { user } = useCurrentUser();

  const currentUser = session?.user?.id;

 

  React.useEffect(() => {
    const updateData = async () => {
        const updatedData: updatedDataResponse | undefined = await fetchProductAllData(params.product);
        // console.log("this is the response:", updatedData);
        setData(updatedData || null);
        // const relatedProducts = await getProductsByCategoryOriginal(updatedData?.category?.parentId)
        const relatedProducts = await getProductsByCategory(updatedData?.category?.id)
        setRelatedProducts(relatedProducts);
        setParentCategory(updatedData?.category?.parentName || "");
        // console.log("these are the related products:", relatedProducts);
    };

    updateData();
}, [params]);

const ProductId=data?.id;
// console.log("this is the product id:", ProductId);
//   console.log("these are the related product:", relatedProducts);
  const completeUrl = typeof window !== "undefined" ? window.location.href : "";
  const segments = completeUrl.split("/");
  const previousSegment = segments[segments.length - 2];
  const previousSegment1 = segments[segments.length - 3];
  // console.log("this is the Previous segment:", previousSegment);
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
      { id: 2, href: `/categories/${previousSegment1}`, label: previousSegment1 },
      { id: 3, href: `/categories/${previousSegment1}/${previousSegment}`, label: previousSegment },
      { id: 4, href: params.product, label: data?.name },
    ];

  // console.log("this is the data:", data);

  // console.log("this is the data i am searching:", data?.images);
  return (
    <div className=" overflow-hidden">
      {/* <div className="fixed top-0 left-0 right-0  z-10">
        <MainNav mensCollectionData={mensCollectionData} />
      </div> */}

      <div className=" mt-[8rem]">
        <div>
          <div className="mt-5 mb-5">
            <BreadcrumbWithCustomSeparator items={breadcrumbsData} />
          </div>

          <div className=" bg-teal-600 h-auto flex ">
            <div className=" bg-teal-600 flex-1 h-auto">
              <PhotoViewer images={data?.images} />
            </div>
            <div className="flex-1 h-[115rem]">
              {/* right component */}
              {/* brand:string */}

               <CategoriesRight data={data} /> 
               {/* <h1 className=" text-[2rem]">{data?.brand.name}</h1>  */}
              
            </div>
          </div>
          <div>
            
            <div className="bg-teal-600 ">           
            <h3 className=" ml-8 w-[20rem] text-[2rem] leading-none p-2 border-2 border-black text-black  flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
              Related Products
            </h3>
            </div>
            <CategoriesRelatedProduct relatedProduct={relatedProducts} ProductId={ProductId} />
          </div>
          <MainFooter />
        </div>
      </div>
    </div>
  );
};

export default page;
