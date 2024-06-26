  "use server";

import { prismadb } from "@/lib/db";

export async function fetchMultipleProducts(productIds: string[]) {

    try{
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
                
        },
      });

      return products;

    } catch (error) {
      console.error("Error fetching products in cart summary:", error);
      throw new Error("Failed to fetch products in cart summary");
    }
}