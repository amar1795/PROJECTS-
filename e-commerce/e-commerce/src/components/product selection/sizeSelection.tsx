import React, { useEffect, useState } from "react";

const SizeSelection = ({variants, sizes, color, setSize, selectedColor,setInitialLoadColorAndSize }) => {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [initialLoadCount, setInitialLoadCount] = useState(0);
  console.log("this is the selected size", selectedSize);


  useEffect(() => {
    if (sizes ) {
     
      setSelectedSize(sizes[0]);
    }

  }, [variants]);

  // useEffect(() => {
  //   if (initialLoadCount !== 3) {
  //     // Set the initial size when the component mounts
  //     setSelectedSize(sizes[0]);
  //     setSize(sizes[0]);
  //     setInitialLoadCount(prev => prev+1);
  //   }

  // }, [sizes]);

  useEffect(() => {
    if (selectedColor) {
      // alert("Please select a color first");
      setSelectedSize(null);
      setSize(null);
      // setInitialLoadColorAndSize(true);

    }
  }, [selectedColor]);

  useEffect(() => {
    if (selectedSize) {
      setSize(selectedSize);
      // setInitialLoadColorAndSize(true);

    }
  }, [selectedSize]);

  const sizeAbbreviations = {
    Small: "S",
    Medium: "M",
    Large: "L",
    "Extra Large": "XL",
    "Extra Extra Large": "XXL",
    "UK Size 28": "28",
    "UK Size 29": "29",
    "UK Size 30": "30",
    "UK Size 31": "31",
    "UK Size 32": "32",
    "UK Size 33": "33",
    "UK Size 34": "34",
    "UK Size 35": "35",
    "UK Size 36": "36",
    "UK Size 37": "37",
    "UK Size 38": "38",
    "UK Size 39": "39",
    "UK Size 40": "40",
    "UK Size 41": "41",
    "UK Size 42": "42",
    "UK Size 43": "43",
    "UK Size 44": "44"
  };
  

  const circleStyle = (size) => ({
    borderRadius: "5%",
    width: "50px",
    height: "50px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px",
    cursor: "pointer",
    border: "2px solid black",
    borderBottom: "8px solid black",
    borderRight: "4px solid black",
    color: "white",
    backgroundColor: selectedSize === size ? "#EAB308" : color,
    fontSize: "1.5rem", // Increase this value as needed
    hover: {
      backgroundColor: "#EAB308",
    },
  });

  return (
    <div>
      <div className="flex">
        <div className=" pt-4  ">
          <div className=" h-[4rem]">
            <h1 className="w-40  p-2  border-2 border-black text-black flex self-center justify-center border-b-8 border-r-4  bg-yellow-500 font-bold">
              {"SIZE"}
            </h1>
          </div>
        </div>
        <div className=" self-center ml-5">
          {sizes.map((size, index) => (
            <div
              key={index}
              style={circleStyle(size)}
              onClick={() => setSelectedSize(size)}
            >
              {sizeAbbreviations[size] || size[0].toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SizeSelection;