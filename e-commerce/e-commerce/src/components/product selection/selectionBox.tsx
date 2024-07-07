import React from 'react'

const SelectionSizeBox = ({size,color}) => {

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
    "UK Size 44": "44",
    "UK Size 6": "6",
    "UK Size 7": "7",
    "UK Size 8": "8",
    "UK Size 9": "9",
    "UK Size 10": "10",
    "UK Size 11": "11",
    "UK Size 12": "12"
  };
  
    const circleStyle = (size) => ({
        borderRadius: "5%",
        width: "40px",
        height: "40px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px",
        cursor: "pointer",
        border: "2px solid black",
        color: "white",
        backgroundColor: color,
        fontSize: "2rem", // Increase this value as needed
        hover: {
          backgroundColor: "#EAB308",
        },
      });
  return (
    <div>
      <div
              style={circleStyle(size)}
            >
              { sizeAbbreviations[size] || size[0].toUpperCase()}
            </div>
    </div>
  )
}

export default SelectionSizeBox
