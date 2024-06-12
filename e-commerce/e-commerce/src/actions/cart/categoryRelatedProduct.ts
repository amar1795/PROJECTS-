"use server";

import { prismadb } from "@/lib/db";
import { revalidatePath } from "next/cache";


// Function to retrieve related products based on cart items
export async function getRelatedProducts(userId) {
    try {
        // Find the user's most recent cart
        const cart = await prismadb.cart.findFirst({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { cartItems: true }
        });
        console.log("this is the cart", cart);
        if (!cart) {
            // If no cart found for the user, return an empty array
            return [];
        }

        const cartItems = cart.cartItems;
        console.log("this is the cart items", cartItems);
        const relatedProducts = [];

        for (const cartItem of cartItems) {
            const product = await prismadb.product.findUnique({
                where: { id: cartItem.productId },
                include: { category: true } // Include category info
            });

            // Find parent category
            const parentCategory = await prismadb.category.findUnique({
                where: { id: product.category.parentId }
            });
                // Fetch related products from the parent category's children categories
            const childCategories = await prismadb.category.findMany({
                where: { parentId: parentCategory.id }
            });

            for (const childCategory of childCategories) {
                const categoryProducts = await prismadb.product.findMany({
                    where: { categoryId: childCategory.id },
                    take: 1 // Adjust based on your requirements
                });

            relatedProducts.push(...categoryProducts);
            }

        }
        console.log("this is the related products", relatedProducts.length);

        return relatedProducts;
    } catch (error) {
        // Handle error
        console.error("Error fetching related products:", error);
        return [];
    }
}

  
  
  
// // Usage example
// const cartId = 'your-cart-id';
// getRelatedProducts(cartId)
//   .then((relatedProducts) => {
//     console.log(relatedProducts);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
