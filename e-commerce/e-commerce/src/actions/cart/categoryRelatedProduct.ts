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

        if (!cart) {
            // If no cart found for the user, return an empty array
            return [];
        }

        const cartItems = cart.cartItems;
        const relatedProducts = [];

        // If there's only one product in the cart, fetch related products from its parent category
        if (cartItems.length === 1) {
            const product = await prismadb.product.findUnique({
                where: { id: cartItems[0].productId },
                include: { category: true } // Include category info
            });
            console.log("this is the product", product);
            // Find parent category
            const parentCategory = await prismadb.category.findUnique({
                where: { id: product.category.parentId }
            });
                console.log("this is the parent category", parentCategory);
            // Fetch products from the parent category
            const parentCategoryProducts = await prismadb.product.findMany({
                where: { categoryId: parentCategory.id }
            });
            console.log("this is the parent category products", parentCategoryProducts);
            // Show all products from the parent category
            relatedProducts.push(...parentCategoryProducts);
            console.log("this is the related products", relatedProducts);
        } else {
            // If there are multiple products in the cart, randomly select a parent category
            const randomParentCategory = await getRandomParentCategory();

            // Fetch products from the randomly selected parent category
            const parentCategoryProducts = await prismadb.product.findMany({
                where: { categoryId: randomParentCategory.id },
                take: 6 // Adjust based on your requirements
            });

            // Show 4-6 randomly selected products
            relatedProducts.push(...getRandomProducts(parentCategoryProducts));
        }

        return relatedProducts;
    } catch (error) {
        // Handle error
        console.error("Error fetching related products:", error);
        return [];
    }
}

// Function to get a random parent category
async function getRandomParentCategory() {
    const parentCategories = await prismadb.category.findMany({
        where: { parentId: null } // Find top-level categories
    });

    // Randomly select a parent category
    const randomIndex = Math.floor(Math.random() * parentCategories.length);
    return parentCategories[randomIndex];
}

// Function to get 4-6 randomly selected products from an array of products
function getRandomProducts(products) {
    const randomProducts = [];
    const numProductsToShow = Math.min(6, Math.max(4, products.length)); // Show 4-6 products

    // Shuffle the array of products
    products.sort(() => Math.random() - 0.5);

    // Select the required number of products
    for (let i = 0; i < numProductsToShow; i++) {
        randomProducts.push(products[i]);
    }

    return randomProducts;
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
