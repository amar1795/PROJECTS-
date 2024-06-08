import React, { useState, useEffect, useRef } from 'react';

interface CustomButtonProps {
  initialButtonName: string;
  initialOptions: string[];
}

const CustomButton: React.FC<CustomButtonProps> = ({ initialButtonName, initialOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonName, setButtonName] = useState(initialButtonName);
  const [options, setOptions] = useState(initialOptions);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleOptionClick = (option: string) => {
    setButtonName(option);
    setOptions(options.filter(opt => opt !== option).concat(buttonName));
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
        <div className="absolute mt-2 w-[10rem] bg-white border border-black text-black z-10">
          <ul>
            {options.map(option => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className="p-2 hover:bg-gray-200 cursor-pointer flex justify-center"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomButton;
