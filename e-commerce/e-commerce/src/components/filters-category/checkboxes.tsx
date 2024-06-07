import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { getProductsByCategory } from '@/actions/createProduct';

interface CheckboxesProps {
    label: string;
    value: string;
    qty: number;
    min: number;
    max: number;
    setSelectedCategoryName : (name: string) => void; 
    setBrandName : (name: string) => void;
    setMinDiscountedPrice : (price: number) => void;
    setMaxDiscountedPrice : (price: number) => void;
    setMinDiscountPercentage : (percentage: number) => void;
    setMaxDiscountPercentage : (percentage: number) => void;
  }

const Checkboxes:React.FC<CheckboxesProps> = ({ label, value, qty,setSelectedCategoryName,
  min,
  max,
  parentCategory,
  setBrandName,
  setMinDiscountedPrice,
  setMaxDiscountedPrice,
  setMinDiscountPercentage,
  setMaxDiscountPercentage
  }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    // alert(`${label} checkbox clicked. New checked state: ${!isChecked} and this is the parentcategory: ${parentCategory} and this is min: ${min} and this is max: ${max}`)
    const newCheckedState = !isChecked;
    setIsChecked(!isChecked);
    if (parentCategory === "Brand") {
      setBrandName(newCheckedState ? label : "");
    } else if (parentCategory === "Category") {
      setSelectedCategoryName(newCheckedState ? label : "");
    } else if (parentCategory === "Discount") {
      // Assuming min and max are already defined in the component state
      if (newCheckedState) {
        setMinDiscountPercentage(min);
        setMaxDiscountPercentage(max);
      } else {
        setMinDiscountPercentage(0);
        setMaxDiscountPercentage(100);
      }
    } else if (parentCategory === "Price") {
      // Assuming min and max are already defined in the component state
      if (newCheckedState) {
        setMinDiscountedPrice(min);
        setMaxDiscountedPrice(max);
      } else {
        setMinDiscountedPrice(0);
        setMaxDiscountedPrice(100000);
      }
    }
    console.log(`${label} checkbox clicked. New checked state: ${!isChecked}`);
  };

  return (
    <div>
      <div className='box mt-2 mb-2'>
            <div className=' flex '>
            <div className=' pr-5 flex self-center '>
            <Checkbox checked={isChecked} onClick={handleCheckboxClick} />
            </div>
            <h1 className=' uppercase'>
            {label} (
              <span className='text-gray-500'>1024</span>
            )
            </h1>
            </div>
           
        </div>
    </div>
  )
}

export default Checkboxes
