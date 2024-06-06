import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"

interface CheckboxesProps {
    label: string;
    value: string;
    qty: number;
  }
const Checkboxes:React.FC<CheckboxesProps> = ({ label, value, qty }) => {
  return (
    <div>
      <div className='box mt-2 mb-2'>
            <div className=' flex '>
            <div className=' pr-5 flex self-center '>
            <Checkbox />
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
