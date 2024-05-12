import React from 'react'
import Checkboxes from './checkboxes'
import { SearchBox } from '../searchbox';

interface Category {
    category: string;
    options: { label: string; value: string }[];
  }
const Fcard: React.FC<{ category: Category }> = ({category}) => {
        return (
                <div className='mt-4 pb-2 border-b'>
                <div className='heading font-bold flex flex-col'>
                    <div>
                        
                    {category.category} 
                    </div>
                    <div className=' py-2 w-[10rem]'>
                      <SearchBox />
                    </div>
                </div>
                <div className='checkboxes'>
                    {category.options.map((option, index) => (
                        <Checkboxes key={index} label={option.label} value={option.value} />
                    ))}
                </div>
            </div>
        )
}

export default Fcard
