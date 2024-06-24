import { searchProductsByNameOrBrand } from '@/actions/product/findProductbySearch';
import { da } from '@faker-js/faker';
import React, { useState, useEffect, useRef } from 'react';

const CustomInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchedData, setsearchedData] = useState([]);
  const containerRef = useRef(null);
  const [lastSelectedSuggestion, setLastSelectedSuggestion] = useState('');


console.log("this is the input value",inputValue);

// useEffect(() => {
//   const timer = setTimeout(() => {
//     setDebouncedValue(inputValue);
//   }, 500); // 0.5 second delay

//   return () => {
//     clearTimeout(timer);
//   };
// }, [inputValue]);

// useEffect(() => {
//   if (debouncedValue) {
//     const fetchData = async () => {
//       const fetchedData = await searchProductsByNameOrBrand(debouncedValue);
//       setSuggestions(fetchedData.map((data) => data.name));
//       setDropdownVisible(true);
//     };

//     fetchData();
//   } else {
//     setSuggestions([]);
//     setDropdownVisible(false);
//   }
// }, [debouncedValue]);


console.log("this is the searched data",searchedData);

const handleInputChange = async (event) => {
  const value = event.target.value;
  setInputValue(value);

  // Debounce the API call
  setTimeout(async () => {
    if (value.trim() === '') {
      setSuggestions([]);
      setDropdownVisible(false);
      return;
    }

    try {
      const fetchedData = await searchProductsByNameOrBrand(value);
      setSuggestions(fetchedData.map((data) => data.name));
      setDropdownVisible(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, 500);
};

const handleSuggestionClick = (suggestion) => {
  setInputValue(suggestion);
  setDropdownVisible(false); // Close dropdown when suggestion is clicked
  setLastSelectedSuggestion(suggestion); // Remember the last selected suggestion
};


const handleClickOutside = (event) => {
  if (containerRef.current && !containerRef.current.contains(event.target)) {
    setDropdownVisible(false);
  }
};

const handleInputFocus = () => {
  if (inputValue.trim() !== '') {
    setDropdownVisible(true);
  }
};

useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);



  return (
    <div className="relative">
        {isDropdownVisible && (
        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setDropdownVisible(false)}></div>
      )}
      <input
        type="text"
        className={`w-[40rem]  outline-none bg-white text-black p-2 border-2 border-black   flex self-center justify-center border-b-8 border-r-4 `}
        placeholder="Search for products,brands and more"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}

      />
      {isDropdownVisible && (
        <div className="absolute bg-white border border-black w-[40rem] mt-2 z-20 max-h-[30rem] overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
