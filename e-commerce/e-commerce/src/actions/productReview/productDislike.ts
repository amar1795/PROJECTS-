"use server"

import { auth } from "@/auth";
import { prismadb } from "@/lib/db";

export async function productDislike(reviewId: string) {
  const userSession = await auth();
  const user = userSession?.user?.id;

  if (!user) {
    return { error: "User not signed in" };
  }

  try {
    // Check if the user has already liked the review
    const existingLike = await prismadb.like.findFirst({
      where: {
        ratingId: reviewId,
        userId: user,
      },
    });

    if (existingLike) {
        // Remove the like
        await prismadb.like.delete({
          where: { id: existingLike.id },
        });
      }
  

    // Check if the user has already disliked the review
    const existingDislike = await prismadb.dislike.findFirst({
      where: {
        ratingId: reviewId,
        userId: user,
      },
    });

    if (existingDislike) {
      return { message: "You have already disliked this review." };
    }

    // Create a new dislike
    const newDislike = await prismadb.dislike.create({
      data: {
        ratingId: reviewId,
        userId: user,
      },
    });

    return { message: "Review disliked", dislike: newDislike };
  } catch (error) {
    console.error("Error disliking review:", error);
    return { error: "Error disliking review" };
  }
}
