import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
const UserCustomButton = ({buttonName}:{buttonName:string}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setIsOpen(false);
    }
};

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (option:String) => {
    console.log(`You clicked ${option}`);
    setIsOpen(false);
  };

  return (
    <div className="h-[4rem] relative" ref={dropdownRef}>
      <button
        className="w-[10rem] p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 active:border-b-2 active:border-r-2 bg-yellow-500"
        onClick={handleButtonClick}
      >
        <h1 className="font-bold">{buttonName}</h1>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-[10rem]  bg-white border border-black  text-black z-10">
          <ul>
            <li onClick={() => handleOptionClick('Option 1')} className="p-2 hover:bg-gray-200 cursor-pointer flex justify-center">Mens</li>
            <li onClick={() => handleOptionClick('Option 2')} className="p-2 hover:bg-gray-200 cursor-pointer flex justify-center">Womens</li>
            <li onClick={() => handleOptionClick('Option 3')} className="p-2 hover:bg-gray-200 cursor-pointer flex justify-center">Kids</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserCustomButton;
