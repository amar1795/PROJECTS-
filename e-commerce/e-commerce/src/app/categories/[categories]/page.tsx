"use client"
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
import { getProductsByCategory, getProductsByCategoryfiltered } from '@/actions/createProduct';
import CategoriesRelatedProduct from '@/components/categories/CategoriesRelatedProduct';

const Page = ({ params }: { params: { categories: string } }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [paginatedData, setPaginatedData] = React.useState({ products: [], totalPages: 0 });

  React.useEffect(() => {
    const fetchPaginatedData = async () => {
      const data = await getProductsByCategoryfiltered("665a0b9f14be77720636d443", currentPage, 10);
      setPaginatedData({ products: data.products, totalPages: data.totalPages });
    };
    fetchPaginatedData();
  }, [currentPage]);

  console.log("this is the paginated data", paginatedData)

  // const mensCollectionData =await getProductsByCategory("665a0b9f14be77720636d443")
  // const paginatedData =await getProductsByCategoryfiltered("665a0b9f14be77720636d443",1,10)

    const categoryColors: { [key: string]: string } = {
        men: 'bg-red-500',
        women: 'bg-pink-500',
        kids: 'bg-green-500',
        furniture: 'bg-green-500',
        shoes: 'bg-green-500',
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
      
      <div className=' overflow-hidden '>
           <div className="fixed top-0 left-0 right-0  z-10">
            <MainNav  />
          </div>

          <div className=' mt-[8rem]'>
         
         

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
                    <div className={`min-h-[90vh] ${categoryColors[params.categories]}`}>
                        <div>
                        This is the categories page for {params.categories}
                        </div>
                        <CategoriesRelatedProduct relatedProduct={paginatedData.products}  />

                    </div>
               
                    <div className=" h-[4rem] ">
                        <PaginationComponent currentPage={currentPage} 
                totalPages={paginatedData.totalPages} 
                onPageChange={setCurrentPage}  />
                    </div>
                    </div>
            </div>

            <MainFooter />
            </div>
           </div>
       

    );
};

export default Page;
