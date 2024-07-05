import React from 'react'

const SelectionSizeBox = ({size,color}) => {

    const sizeAbbreviations = {
        Small: "S",
        Medium: "M",
        Large: "L",
        "Extra Large": "XL",
        "Extra Extra Large": "XXL",
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
              {sizeAbbreviations[size] || size[0].toUpperCase()}
            </div>
    </div>
  )
}

export default SelectionSizeBox
