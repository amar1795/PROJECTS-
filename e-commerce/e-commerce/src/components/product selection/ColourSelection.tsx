import { getUniqueColors } from '@/lib/utils';
import React, { useState } from 'react';
import SizeSelection from './sizeSelection';

const ColorSelection = ({ variants }) => {

  const [selectedColor, setSelectedColor] = useState(null);

  const uniqueColors = getUniqueColors(variants);

  const sizesByColor = (color) => {
    const sizes = variants
      .filter((variant) => variant.color === color)
      .map((variant) => variant.size);
    return [...new Set(sizes)];
  };

  const circleStyle = (color) => ({
    backgroundColor: color,
    borderRadius: '50%',
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
      <div>
      <span className='text-[2rem] pt-4'>
        COLOUR:
      </span>
        {uniqueColors.map((color, index) => (
          <div
            key={index}
            style={circleStyle(color)}
            title={color}
            onClick={() => setSelectedColor(color)}
          ></div>
        ))}
      </div>
      {selectedColor && (
        <SizeSelection
          sizes={sizesByColor(selectedColor)}
          color={selectedColor}
        />
      )}
    </div>
  );
};
  

export default ColorSelection;
