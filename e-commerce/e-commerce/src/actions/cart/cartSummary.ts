"use server";

import { prismadb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function calculateCartSummary(userId: string) {
  if (!userId) {
    throw new Error("User is not logged in");
  }

  try {
    // Find the user's cart items including product details
    const cart = await prismadb.cart.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: {
          cartItems: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      });

    if (!cart) {
      // If the cart doesn't exist, return empty summary
      return {
        totalUniqueItems: 0,
        totalAmount: 0,
        orderSummary: [],
      };
    }

    // Initialize variables for total unique items and total amount
    let totalUniqueItems = 0;
    let totalAmount = 0;

    // Initialize an object to store the order summary
    const orderSummary = [];


    // Calculate total unique items and total amount, and build order summary
    cart.cartItems.forEach((cartItem) => {
      totalUniqueItems++;

      // Calculate the amount for the current cart item
      const amount = cartItem.product.price * cartItem.quantity;

      // Update total amount
      totalAmount += amount;

      // Update order summary
     // Add to order summary
     orderSummary.push({
        productId: cartItem.product.id,
        name: cartItem.product.name,
        quantity: cartItem.quantity,
        amount: amount,
      });
    });
    // console.log(
    //   "this is the order summary",
    //   orderSummary,
    //   totalAmount,
    //   totalUniqueItems
    // );
    return {
      totalUniqueItems,
      totalAmount,
      orderSummary: Object.values(orderSummary),
    };
  } catch (error) {
    // console.error("Error calculating cart summary:", error);
    throw new Error("Failed to calculate cart summary");
  }
}


export async function getProductsInCartSummary(userId: string) {
    if (!userId) {
      throw new Error("User is not logged in");
    }
  
    try {
      // Calculate cart summary to get product IDs
      const { orderSummary } = await calculateCartSummary(userId);
  
      // Extract unique product IDs from the order summary
      const productIds = orderSummary.map((item) => item.productId);
  
      // Fetch product details for the extracted product IDs
      let products = await prismadb.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
        include: {
          brand: true,
          images: { take: 1 }, // Fetch only the first image
          cartItems: true,
        },
      });


    // Fetch the user's cart items
    const cart = await prismadb.cart.findFirst({
        where: { userId },
        include: { cartItems: true },
      });
      const cartItems = cart ? cart.cartItems : [];
  
      // Map the cart items to products and include the cart quantity for each product
      products = products.map((product) => {
        const cartItem = cartItems.find((item) => item.productId === product.id);
        const cartQuantity = cartItem ? cartItem.quantity : 0;
        return {
          ...product,
          cartQuantity: cartQuantity,
        };
      });
  
      revalidatePath('/cart')
      // console.log("this is the products in cart summary", products)
    //   wierd issue here was unable to fethc the product id with the url and was shwoing undefined imracoulously it started working again  now 
//   console.log("this is the products in cart summary", products[0].images[0].url)
// console.log("this is the products in cart summary", products)
      return products;
    } catch (error) {
      console.error("Error fetching products in cart summary:", error);
      throw new Error("Failed to fetch products in cart summary");
    }
  }