"use server"

import { auth } from "@/auth";
import { prismadb } from "@/lib/db";


export async function getProductReviews(productId: string) {

    const userSession = await auth();
    const user = userSession?.user?.id;
    
// user does not need to be signed in to view all the reviews
    // if(!user){
    //     return  {error:"User not Signed in"}
    // }

    try {
      // Fetch all reviews for a specific product
      const reviews = await prismadb.rating.findMany({
        where: {
          productId: productId,
        },
        include: {
          images: true, // Include associated images
          user: {       // Include the user who wrote the review
            select: {
                name: true, // Only fetch the name of the user
            },
        },
        },
      });

      // Count the verified purchases
      const verifiedPurchaseCount = await prismadb.rating.count({
        where: {
            productId: productId,
            verifiedPurchase: true,
        },
    });

  
    return {
      reviews,
      verifiedPurchaseCount,
  };
      
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      return { error: "Error fetching product reviews" };
    }


  }