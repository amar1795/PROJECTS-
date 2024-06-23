"use server"

import { auth } from "@/auth";
import { prismadb } from "@/lib/db";


export async function getProductReviews(productId: string) {

    const userSession = await auth();
    const user = userSession?.user?.id;

    if(!user){
        return  {error:"User not Signed in"}
    }

    try {
      // Fetch all reviews for a specific product
      const reviews = await prismadb.rating.findMany({
        where: {
          productId: productId,
        },
        include: {
          images: true, // Include associated images
        },
      });
  
      return reviews;
      
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      return { error: "Error fetching product reviews" };
    }


  }