const ProductSizeData = [
  { id: "665aca6d5788e185779d7ce5", name: "Extra Small", value: "XS" },
  { id: "665aca6e5788e185779d7ce6", name: "Small", value: "S" },
  { id: "665aca6e5788e185779d7ce7", name: "Medium", value: "M" },
  { id: "665aca6e5788e185779d7ce8", name: "Large", value: "L" },
  { id: "665aca6e5788e185779d7ce9", name: "Extra Large", value: "XL" },
  { id: "665aca6e5788e185779d7cea", name: "Extra Extra Large", value: "XXL" },
];

const ProductColourData = [
  { id: "665af3c03220eba7c7eab93e", name: "White", value: "FFFFFF" },
  { id: "66570726617228492bfcb586", name: "Blue", value: "3a86ff" },
  { id: "66570726617228492bfcb587", name: "Purple", value: "8338ec" },
  { id: "66570726617228492bfcb588", name: "Red", value: "ff006e" },
  { id: "66570726617228492bfcb589", name: "Orange", value: "fb5607" },
  { id: "66570726617228492bfcb58a", name: "Yellow", value: "ffbe0b" },
  { id: "66570726617228492bfcb58b", name: "Black", value: "000000" },
];

const PantsProductData = [
    { id: "668a8033600804a6d384884a", name: "UK Size 28", value: "28" },
    { id: "668a8033600804a6d384884b", name: "UK Size 29", value: "29" },
    { id: "668a8033600804a6d384884c", name: "UK Size 30", value: "30" },
    { id: "668a8033600804a6d384884d", name: "UK Size 31", value: "31" },
    { id: "668a8033600804a6d384884e", name: "UK Size 32", value: "32" },
    { id: "668a8033600804a6d384884f", name: "UK Size 33", value: "33" },
    { id: "668a8033600804a6d3848850", name: "UK Size 34", value: "34" },
    { id: "668a8033600804a6d3848851", name: "UK Size 35", value: "35" },
    { id: "668a8033600804a6d3848852", name: "UK Size 36", value: "36" },
    { id: "668a8033600804a6d3848853", name: "UK Size 37", value: "37" },
    { id: "668a8033600804a6d3848854", name: "UK Size 38", value: "38" },
    { id: "668a8034600804a6d3848855", name: "UK Size 39", value: "39" },
    { id: "668a8034600804a6d3848856", name: "UK Size 40", value: "40" },
    { id: "668a8034600804a6d3848857", name: "UK Size 41", value: "41" },
    { id: "668a8034600804a6d3848858", name: "UK Size 42", value: "42" },
    { id: "668a8034600804a6d3848859", name: "UK Size 43", value: "43" },
    { id: "668a8034600804a6d384885a", name: "UK Size 44", value: "44" }
  ];
  

export function generateCombinations(productID) {
  const data = [];
  const sizes = [
    "Small",
    "Medium",
    "Large",
    "Extra Large",
    "Extra Extra Large",
  ];

  ProductColourData.forEach((color) => {
    let sizeCount = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

    let stockValues = Array.from({ length: sizeCount }, (_, i) =>
      i === 0 ? getRandomStock(100, 200) : getRandomStock(0, 200)
    );

    for (let i = 0; i < sizeCount; i++) {
      const size = ProductSizeData.find((s) => s.name === sizes[i]);
      data.push({
        productId: productID,
        colorId: color.id,
        sizeId: size.id,
        stock: stockValues[i],
      });
    }
  });

  console.log("this is the data ", data);
  return data;
}

export function generatePantCombinations(productID) {
    const data = [];
  
    // Iterate over each color
    ProductColourData.forEach((color) => {
      // Iterate over each pant size (from 28 to 44)
      PantsProductData.forEach((pantsSize) => {
        data.push({
          productId: productID,
          colorId: color.id,
          sizeId: pantsSize.id,
          stock: getRandomStock(0, 200), // Assuming random stock between 0 to 200
        });
      });
    });
  
    console.log("Generated Pant Combinations:", data);
    return data;
  }

function getRandomStock(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const productID = "some-product-id";
//   const combinations = generateCombinations("665b00173220eba7c7eabab3");
//   console.log(combinations);

const testData = [
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "665af3c03220eba7c7eab93e",
    sizeId: "665aca6e5788e185779d7ce6",
    stock: 109,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "665af3c03220eba7c7eab93e",
    sizeId: "665aca6e5788e185779d7ce7",
    stock: 19,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "665af3c03220eba7c7eab93e",
    sizeId: "665aca6e5788e185779d7ce8",
    stock: 199,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "665af3c03220eba7c7eab93e",
    sizeId: "665aca6e5788e185779d7ce9",
    stock: 158,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb586",
    sizeId: "665aca6e5788e185779d7ce6",
    stock: 181,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb586",
    sizeId: "665aca6e5788e185779d7ce7",
    stock: 107,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb586",
    sizeId: "665aca6e5788e185779d7ce8",
    stock: 0,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb587",
    sizeId: "665aca6e5788e185779d7ce6",
    stock: 159,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb587",
    sizeId: "665aca6e5788e185779d7ce7",
    stock: 175,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb587",
    sizeId: "665aca6e5788e185779d7ce8",
    stock: 129,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb587",
    sizeId: "665aca6e5788e185779d7ce9",
    stock: 0,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb588",
    sizeId: "665aca6e5788e185779d7ce6",
    stock: 182,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb588",
    sizeId: "665aca6e5788e185779d7ce7",
    stock: 100,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb588",
    sizeId: "665aca6e5788e185779d7ce8",
    stock: 176,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb588",
    sizeId: "665aca6e5788e185779d7ce9",
    stock: 0,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb589",
    sizeId: "665aca6e5788e185779d7ce6",
    stock: 160,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb589",
    sizeId: "665aca6e5788e185779d7ce7",
    stock: 46,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb589",
    sizeId: "665aca6e5788e185779d7ce8",
    stock: 169,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb589",
    sizeId: "665aca6e5788e185779d7ce9",
    stock: 24,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb589",
    sizeId: "665aca6e5788e185779d7cea",
    stock: 189,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb58a",
    sizeId: "665aca6e5788e185779d7ce6",
    stock: 165,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb58a",
    sizeId: "665aca6e5788e185779d7ce7",
    stock: 86,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb58a",
    sizeId: "665aca6e5788e185779d7ce8",
    stock: 89,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb58a",
    sizeId: "665aca6e5788e185779d7ce9",
    stock: 63,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb58a",
    sizeId: "665aca6e5788e185779d7cea",
    stock: 192,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb58b",
    sizeId: "665aca6e5788e185779d7ce6",
    stock: 109,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb58b",
    sizeId: "665aca6e5788e185779d7ce7",
    stock: 192,
  },
  {
    productId: "665b00173220eba7c7eabab3",
    colorId: "66570726617228492bfcb58b",
    sizeId: "665aca6e5788e185779d7ce8",
    stock: 116,
  },
];
