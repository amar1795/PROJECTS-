import { getUniqueColors } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import SizeSelection from './sizeSelection';

const ColorSelection = ({ variants,setSize,setColor }) => {
  const uniqueColors = getUniqueColors(variants);
  
  const [selectedColor, setSelectedColor] = useState(null);



  console.log("this is the selected color", selectedColor);
  
  console.log("this is the unique colours", uniqueColors[0]);

  useEffect(() => {
    if (selectedColor) {
      setColor(selectedColor);
    }
    // else if(selectedColor === null){
    //   // alert(uniqueColors[0])
    //   setSelectedColor(uniqueColors[0]);
    //   // setColor(uniqueColors[0]);
    // }
  }, [selectedColor]);

  const handleClickColour = (e) => {
    setSelectedColor(e.target.title);
  }



  const sizesByColor = (color) => {
    const sizes = variants
      ?.filter((variant) => variant.color === color)
      ?.map((variant) => variant.size);
    return [...new Set(sizes)];
  };

  const circleStyle = (color) => ({
    backgroundColor: color,
    borderRadius: '5%',
    width: '30px',
    height: '30px',
    display: 'inline-block',
    margin: '5px',
    cursor: 'pointer',
    border: selectedColor === color ? '2px solid black' : 'none',
  });

  return (
    <div>
      {/* <h2>Select Color</h2> */}
      <div className=' flex'>
      <div className=" pt-4  ">
          <div className=" h-[4rem]">
            <h1
             
              className="w-40  p-2  border-2 border-black text-black flex self-center justify-center border-b-8 border-r-4  bg-yellow-500 font-bold"
            >
             {"COLOUR"} 
            </h1>
          </div>
        </div>
       <div className=' self-center ml-5'>
       {uniqueColors.map((color, index) => (
          <div
            key={index}
            style={circleStyle(color)}
            title={color}
            onClick={handleClickColour}
          ></div>
        ))}
       </div>
      </div>
      { (
        <SizeSelection
        setSize={setSize}
        selectedColor={selectedColor}
          sizes={selectedColor ? sizesByColor(selectedColor):sizesByColor(uniqueColors[0])}
          color={selectedColor || uniqueColors[0]}
        />
      )}
    </div>
  );
};
  

export default ColorSelection;
