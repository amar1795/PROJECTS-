import React from "react";
import Checkboxes from "./checkboxes";
import { SearchBox } from "../searchbox";

interface Category {
  category: string;
  
  options: { label: string; value: string,min:number,max:number }[];
  setSelectedCategoryName: (name: string) => void;
    setBrandName: (name: string) => void;
    setMinDiscountedPrice: (price: number) => void;
    setMaxDiscountedPrice: (price: number) => void;
    setMinDiscountPercentage: (percentage: number) => void;
    setMaxDiscountPercentage: (percentage: number) => void;
    setBrandSelected: (selected: boolean) => void;
}

const Fcard: React.FC<{ category: Category }> = ({
  category,
  setBrandName,
  setSelectedCategoryName,
  setMinDiscountedPrice,
  setMaxDiscountedPrice,
  setMinDiscountPercentage,
  setMaxDiscountPercentage,
  setBrandSelected
}) => {
  return (
    <div className="mt-4 pb-2 border-b">
      <div className="heading font-bold flex flex-col">
        <div>{category.category}</div>
        {/* <div className=" py-2 w-[10rem]">
          <SearchBox />
        </div> */}
      </div>
      <div className="checkboxes">
        {category.options.map((option, index) => (
          <Checkboxes
          setBrandSelected={setBrandSelected}
          parentCategory={category.category}
            key={index}
            label={option.label}
            value={option.value}
            min={option?.min}
            max={option?.max}
            setSelectedCategoryName={setSelectedCategoryName}
            setBrandName={setBrandName}
            setMinDiscountedPrice={setMinDiscountedPrice}
            setMaxDiscountedPrice={setMaxDiscountedPrice}
            setMinDiscountPercentage={setMinDiscountPercentage}
            setMaxDiscountPercentage={setMaxDiscountPercentage}
          />
        ))}
      </div>
    </div>
  );
};

export default Fcard;
