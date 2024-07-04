import React, { useState } from "react";

const SizeSelection = ({ sizes, color }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const sizeAbbreviations = {
    Small: "S",
    Medium: "M",
    Large: "L",
    "Extra Large": "XL",
    "Extra Extra Large": "XXL",
  };

  const circleStyle = (size) => ({
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px",
    cursor: "pointer",
    border: "2px solid black",
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
            <h1
             
              className="w-40  p-2  border-2 border-black text-black flex self-center justify-center border-b-8 border-r-4  bg-yellow-500"
            >
              <h1 className=" font-bold">{"SIZE"} </h1>
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
