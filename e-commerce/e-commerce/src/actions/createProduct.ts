"use server";
// pages/api/createDummyUsers.js
import { faker } from "@faker-js/faker";
import { prismadb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function createProduct() {
  try {
    const price = 3550.00; // Original price of the product
const discountPercentage = 10; // Discount percentage (e.g., 10% off)

// Calculate the discount amount
const discountAmount = (price * discountPercentage) / 100;

// Calculate the discounted price
const discountedPrice = price - discountAmount;
    const formalShirt = await prismadb.product.create({
      data: {
        name: "Preimium Office Formal Shirt",
        price: price,
        discount: discountPercentage, // Discount amount in currency (e.g., $10 off)
        discountedPrice:discountedPrice, // Discounted price after applying the discount
        brandId: "665ac7545788e185779d7ccc", // Replace with the actual Brand ID
        description: "High-quality formal shirt perfect for office wear.",
        categoryId: "665a0ba114be77720636d449", // Replace with actual Formal Shirts Category ID
        images: {
          create: [
            {
              url: "https://res.cloudinary.com/dfveswqdm/image/upload/v1717062515/formal%20men%20shirts/81Y0Jfm_xdL._SX569__um3x0d.jpg",
            },
            {
              url: "https://res.cloudinary.com/dfveswqdm/image/upload/v1717062517/formal%20men%20shirts/91Mb_F802qL._SX569__rdhupz.jpg",
            },
            {
              url: "https://res.cloudinary.com/dfveswqdm/image/upload/v1717062518/formal%20men%20shirts/91Rvg8DnupL._SX569__loaowj.jpg",
            },
            {
              url: "https://res.cloudinary.com/dfveswqdm/image/upload/v1717062511/formal%20men%20shirts/71BSvy2hEdL._SX569__wpowon.jpg",
            },
            // Add more image URLs if necessary
          ],
        },
      },
    });
    console.log("Product created:", formalShirt);
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

export async function createProductVarient() {
    try {
        const formalShirtVariants = await prismadb.productVariant.createMany({
            data: [
              { 
                
                productId: "665ac95e5788e185779d7ce0", 
                colorId: "66570726617228492bfcb588", 
                sizeId: "665aca6e5788e185779d7ce6", 
                stock: 10 
              },
              { 
                productId: "665ac95e5788e185779d7ce0", 
                colorId: "66570726617228492bfcb588", 
                sizeId: "665aca6e5788e185779d7ce7", 
                stock: 5 
              },
              { 
                productId: "665ac95e5788e185779d7ce0", 
                colorId: "66570726617228492bfcb588", 
                sizeId: "665aca6e5788e185779d7ce8", 
                stock: 0 
              },
              { 
                productId: "665ac95e5788e185779d7ce0", 
                colorId: "66570726617228492bfcb58a", 
                sizeId: "665aca6e5788e185779d7ce6", 
                stock: 8 
              },
              { 
                productId: "665ac95e5788e185779d7ce0", 
                colorId: "66570726617228492bfcb58a", 
                sizeId: "665aca6e5788e185779d7ce7", 
                stock: 0 
              },
              { 
                productId: "665ac95e5788e185779d7ce0", 
                colorId: "66570726617228492bfcb58a", 
                sizeId: "665aca6e5788e185779d7ce8", 
                stock: 12 
              },
              { 
                productId: "665ac95e5788e185779d7ce0", 
                colorId: "66570726617228492bfcb58b", 
                sizeId: "665aca6e5788e185779d7ce6", 
                stock: 15 
              },
              { 
                productId: "665ac95e5788e185779d7ce0", 
                colorId: "66570726617228492bfcb58b", 
                sizeId: "665aca6e5788e185779d7ce7", 
                stock: 7 
              },
              { 
                productId: "665ac95e5788e185779d7ce0", 
                colorId: "66570726617228492bfcb58b", 
                sizeId: "665aca6e5788e185779d7ce8", 
                stock: 0 
              },
              { 
                productId: "665ac95e5788e185779d7ce0", 
                colorId: "66570726617228492bfcb586", 
                sizeId: "665aca6e5788e185779d7ce6", 
                stock: 10 
              },
              { 
                productId: "665ac95e5788e185779d7ce0", 
                colorId: "66570726617228492bfcb586", 
                sizeId: "665aca6e5788e185779d7ce7", 
                stock: 5 
              },
              { 
                productId: "665ac95e5788e185779d7ce0", 
                colorId: "66570726617228492bfcb586", 
                sizeId: "665aca6e5788e185779d7ce8", 
                stock: 0 
              },
            ],
          });
          
          console.log("Product variants created:", formalShirtVariants);
    } catch (error) {
        console.error("Error creating product variant:", error);
    }
}

export async function createProductRating() {
    try {
        
        const productId = "665ac95e5788e185779d7ce0"; // Replace with the actual product ID
const userId = "6655adcc05f2665c9bc85c1a"; // Replace with the actual User ID

// Create 75 five-star ratings without reviews
for (let i = 0; i < 75; i++) {
  await prismadb.rating.create({
    data: {
      productId: productId,
      rating: 5,
      userId: userId,
    },
  });
}

// Create 15 four-star ratings without reviews
for (let i = 0; i < 15; i++) {
  await prismadb.rating.create({
    data: {
      productId: productId,
      rating: 4,
      userId: userId,
    },
  });
}

// Create 5 three-star ratings without reviews
for (let i = 0; i < 5; i++) {
  await prismadb.rating.create({
    data: {
      productId: productId,
      rating: 3,
      userId: userId,
    },
  });
}

// Create 4 two-star ratings without reviews
for (let i = 0; i < 4; i++) {
  await prismadb.rating.create({
    data: {
      productId: productId,
      rating: 2,
      userId: userId,
    },
  });
}

// Create 1 one-star rating without review
await prismadb.rating.create({
  data: {
    productId: productId,
    rating: 1,
    userId: userId,
  },
});

    } catch (error) {
        
    }
}