"use server";

import { prismadb } from "@/lib/db";

export async function calculateCartSummary(userId: string) {
    // Find the user's cart items including product details
    const cart = await prismadb.cart.findFirst({
      where: { userId },
      include: { cartItems: { include: { product: { select: { name: true, price: true } } } } }
    });
  
    if (!cart) {
      // If the cart doesn't exist, return empty summary
      return {
        totalUniqueItems: 0,
        totalAmount: 0,
        orderSummary: []
      };
    }
  
    // Initialize variables for total unique items and total amount
    let totalUniqueItems = 0;
    let totalAmount = 0;
  
    // Initialize an object to store the order summary
    const orderSummary: { [productId: string]: { name: string; quantity: number; amount: number } } = {};
  
    // Calculate total unique items and total amount, and build order summary
    cart.cartItems.forEach((cartItem) => {
      totalUniqueItems++;
      
      // Calculate the amount for the current cart item
      const amount = cartItem.product.price * cartItem.quantity;
  
      // Update total amount
      totalAmount += amount;
  
      // Update order summary
      if (cartItem.productId in orderSummary) {
        orderSummary[cartItem.productId].quantity += cartItem.quantity;
        orderSummary[cartItem.productId].amount += amount;
      } else {
        orderSummary[cartItem.productId] = {
          name: cartItem.product.name,
          quantity: cartItem.quantity,
          amount: amount
        };
      }
    });
  console.log("this is the order summary", orderSummary, totalAmount, totalUniqueItems)
    return {
      totalUniqueItems,
      totalAmount,
      orderSummary: Object.values(orderSummary)
    };
  }
  