import React, { useState, useEffect } from 'react';

const CustomInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
console.log("this is the input value",inputValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 2000); // 1 second delay

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
};

  return (
    <div className="">
      <input
        type="text"
        className="w-[40rem] p-2 border-2 border-black text-black  flex self-center justify-center border-b-8 border-r-4 "
        placeholder="Search for products,brands and more"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default CustomInput;
