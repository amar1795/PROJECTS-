"use server"

import { auth } from "@/auth";
import { prismadb } from "@/lib/db";


export async function getProductReviews(productId: string ,fetchLimit: number) {

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
          review: {
            not: null, // Include only reviews where 'review' is not null
        },
        },
        include: {
          images: true, // Include associated images
          user: {       // Include the user who wrote the review
            select: {
                name: true, // Only fetch the name of the user
            },
        },
        likes: true,    // Include likes
        dislikes: true, // Include dislikes
        },
        take: fetchLimit || undefined, // Use fetchLimit if provided, otherwise fetch all reviews

      });

         // Process reviews to include total likes, dislikes, and user-specific like/dislike status
    const processedReviews = reviews.map(review => {
      const totalLikes = review.likes.length;
      const totalDislikes = review.dislikes.length;
      const likedByUser = user ? review.likes.some(like => like.userId === user) : false;
      const dislikedByUser = user ? review.dislikes.some(dislike => dislike.userId === user) : false;

      return {
        ...review,
        totalLikes,
        totalDislikes,
        likedByUser,
        dislikedByUser,
      };
    });


      // Count the verified purchases
      const verifiedPurchaseCount = await prismadb.rating.count({
        where: {
            productId: productId,
            verifiedPurchase: true,
        },
    });

  
    return {
      reviews: processedReviews,
      verifiedPurchaseCount,
  };
      
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      return { error: "Error fetching product reviews" };
    }


  }