import React from 'react';
import { redirect } from 'next/navigation'
import { MainNav } from "@/components/main-nav";
import { BreadcrumbWithCustomSeparator } from '@/components/breadcrumb'
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import MainFooter from "@/components/footer";
import { SelectDemo } from "@/components/select";
import { Separator } from "@/components/ui/separator"
import fcard from "@/components/filters-category/filterCard";
import Fcard from "@/components/filters-category/filterCard";
import { PaginationComponent } from "@/components/pagination";

const Page = ({ params }: { params: { categories: string } }) => {
    const categoryColors: { [key: string]: string } = {
        men: 'bg-red-500',
        women: 'bg-pink-500',
        kids: 'bg-green-500',
    };

    // Check if the entered category is valid
    if (!categoryColors[params.categories]) {
        // Redirect to the "Not Found" page
         
        redirect(`/not-found`)         
       
    }

    const filterData = [
        {
          category: "Category",
          options: [
            { label: "Category 1", value: "category1" },
            { label: "Category 2", value: "category2" },
            // Add more category options as needed
          ]
        },
        {
          category: "Brand",
          options: [
            { label: "Brand 1", value: "brand1" },
            { label: "Brand 2", value: "brand2" },
            // Add more brand options as needed
          ]
        },
        {
          category: "Price",
          options: [
            { label: "Price Range 1", value: "price1" },
            { label: "Price Range 2", value: "price2" },
            // Add more price range options as needed
          ]
        }
      ];
      

    const breadcrumbsData = [
        {id:1, href: "/", label: "Home" },
        {id:2, href: "men", label: "Men" },
        {id:3, href: "women", label: "women" }
      ];

    return (
        <div>
           <MainNav className=" mt-5" />

            <BreadcrumbWithCustomSeparator items={breadcrumbsData} />
            <div className='filter flex justify-between w-full px-5 mt-5  overflow-hidden relative'>
                <div className=" self-center font-bold">FILTERS</div>
                <div className=" px-5 py-5 flex w-[19rem] justify-between "><h1 className=" self-center font-bold">
                    SORT BY :
                </h1>
                    <SelectDemo />
                </div>

            </div>
            <Separator />
            <div className=" flex justify-between">
                <div className=" flex-none w-1/5 border-r">
                    {filterData.map((category, index) => (
                        <Fcard key={index} category={category} />))}


                </div>

                <div className=" flex-grow">
                    <div className={`h-[90vh] ${categoryColors[params.categories]}`}>
                        This is the categories page for {params.categories}
                    </div>
               
                    <div className=" h-[4rem] ">
                        <PaginationComponent />
                    </div>
                    </div>
            </div>

            <MainFooter />
        
        </div>

    );
};

export default Page;
