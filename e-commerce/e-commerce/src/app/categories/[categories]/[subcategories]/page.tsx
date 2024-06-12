"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/main-nav";
import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import MainFooter from "@/components/footer";
import { SelectDemo } from "@/components/select";
import { Separator } from "@/components/ui/separator";
import fcard from "@/components/filters-category/filterCard";
import Fcard from "@/components/filters-category/filterCard";
import { PaginationComponent } from "@/components/pagination";
import {
  getProductsByCategory,
  getProductsByCategoryFiltered,
  getProductsByCategoryfiltered,
} from "@/actions/createProduct";
import CategoriesRelatedProduct from "@/components/categories/CategoriesRelatedProduct";

const Page = ({ params }: { params: { subcategories: string } }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState({
    products: [],
    totalPages: 0,
    totalProductsCount: 0,
    currentProductsCount: 0,
  });
  const [categoryName, setSelectedCategoryName] = useState("");
  const [parentCategoryName, setparentCategoryName] = useState(
    params.subcategories
  );
  const [brandName, setBrandName] = useState([]);
  // console.log("this is brand name", brandName)
  const [minDiscountedPrice, setMinDiscountedPrice] = useState(0);
  const [maxDiscountedPrice, setMaxDiscountedPrice] = useState(100000);
  const [minDiscountPercentage, setMinDiscountPercentage] = useState(0);
  const [maxDiscountPercentage, setMaxDiscountPercentage] = useState(100);
  const [filterData, setFilterData] = useState([]);
  // console.log("this is the parent category name", parentCategoryName);

  useEffect(() => {
    const fetchPaginatedData = async () => {
      const data = await getProductsByCategoryFiltered(
        parentCategoryName,
        categoryName,
        brandName,
        minDiscountedPrice,
        maxDiscountedPrice,
        minDiscountPercentage,
        maxDiscountPercentage,
        currentPage,
        9
      );
      setPaginatedData({
        products: data.products,
        totalPages: data.totalPages,
        totalProductsCount: data.totalProducts,
        currentProductsCount: data.products.length,
      });

      const newFilterData = [
        {
          category: "Category",
          options: data.uniqueCategories.map((category) => ({
            label: category,
            value: category,
          })),
        },
        {
          category: "Brand",
          options: data.uniqueBrands.map((brand) => ({
            label: brand,
            value: brand,
          })),
        },
        {
          category: "Price",
          options: data.priceRanges.map((range) => ({
            label: range.label,
            value: range.value,
            min: range.min,
            max: range.max,
          })),
        },
        {
          category: "Discount",
          options: data.discountRanges.map((range) => ({
            label: range.label,
            value: range.value,
           
            min: range.min,
            max: range.max,
          })),
        },
      ];
      setFilterData(newFilterData);
    };
    fetchPaginatedData();
  }, [
    currentPage,
    categoryName,
    brandName,
    minDiscountedPrice,
    maxDiscountedPrice,
    minDiscountPercentage,
    maxDiscountPercentage,
  ]);

  // const mensCollectionData =await getProductsByCategory("665a0b9f14be77720636d443")
  // const paginatedData =await getProductsByCategoryfiltered("665a0b9f14be77720636d443",1,10)

  // const categoryColors: { [key: string]: string } = {
  //     men: 'bg-red-500',
  //     women: 'bg-pink-500',
  //     kids: 'bg-green-500',
  //     furniture: 'bg-green-500',
  //     shoes: 'bg-green-500',
  // };

  // // Check if the entered category is valid
  // if (!categoryColors[params.categories]) {
  //     // Redirect to the "Not Found" page

  //     redirect(`/not-found`)

  // }
  // const filteredData = [
  //     {
  //       category: "Category",
  //       options: [
  //         { label: "Category 1", value: "category1" },
  //         { label: "Category 2", value: "category2" },
  //         // Add more category options as needed
  //       ]
  //     },
  //     {
  //       category: "Brand",
  //       options: [
  //         { label: "Brand 1", value: "brand1" },
  //         { label: "Brand 2", value: "brand2" },
  //         // Add more brand options as needed
  //       ]
  //     },
  //     {
  //       category: "Price",
  //       options: [
  //         { label: "Price Range 1", value: "price1" },
  //         { label: "Price Range 2", value: "price2" },
  //         // Add more price range options as needed
  //       ]
  //     }
  //   ];

  const completeUrl = typeof window !== "undefined" ? window.location.href : "";
  const segments = completeUrl.split("/");
  const previousSegment = segments[segments.length - 1];
  const previousSegment1 = segments[segments.length - 2];
  // console.log("this is the Previous segment:", previousSegment);
  const breadcrumbsData = [
    { id: 1, href: "/", label: "Home" },
    { id: 2, href: `/categories/${previousSegment1}`, label: previousSegment1 },
    { id: 3, href: `/categories/${previousSegment1}/${previousSegment}`, label: previousSegment },
    // { id: 4, href: params?.product, label: data?.name },
  ];

  
// Define total number of products and products per page
const totalProducts = paginatedData.totalProductsCount;
const productsPerPage = 9;

// Function to calculate start and end indexes of products to display
const calculateProductRange = (currentPage) => {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage - 1, totalProducts - 1);
  return { start: startIndex, end: endIndex };
};
const { start, end } = calculateProductRange(currentPage);

  return (
    <div className=" overflow-hidden ">
      {/* <div className="fixed top-0 left-0 right-0  z-10">
        <MainNav />
      </div> */}

      <div className=" mt-[8rem]">
        <BreadcrumbWithCustomSeparator items={breadcrumbsData} />
        <div className="filter flex justify-between w-full px-5 mt-5  overflow-hidden relative">
          <div className=" self-center font-bold">FILTERS</div>
          <div className=" px-5 py-5 flex w-[19rem] justify-between ">
            <h1 className=" self-center font-bold">SORT BY :</h1>
            <SelectDemo />
          </div>
        </div>
        <Separator />
        <div className=" flex justify-between">
          <div className=" flex-none w-1/5 border-r">
            {filterData
              .filter(
                (category) => category !== null && category.options.length > 0
              ) // Filter out null categories and those without options
              .map((category, index) => (
                <Fcard key={index} 
                category={category}
                setSelectedCategoryName={setSelectedCategoryName}
                setBrandName={setBrandName}
                setMinDiscountedPrice={setMinDiscountedPrice}
                setMaxDiscountedPrice={setMaxDiscountedPrice}
                setMinDiscountPercentage={setMinDiscountPercentage}
                setMaxDiscountPercentage={setMaxDiscountPercentage}/>
              ))}
          </div>

          <div className=" flex-grow">
            <div className={`min-h-[90vh] `}>
            <div>This is the categories page for {params.subcategories} and showing {`Displaying products ${start + 1} to ${end + 1} out of ${totalProducts} products`} </div>
              <CategoriesRelatedProduct
                relatedProduct={paginatedData.products}
              />
            </div>

            <div className=" h-[4rem] ">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={paginatedData.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>

        <MainFooter />
      </div>
    </div>
  );
};

export default Page;
