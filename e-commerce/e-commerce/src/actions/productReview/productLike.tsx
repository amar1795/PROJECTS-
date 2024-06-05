import { prismadb } from "@/lib/db";


export const productLike = async (ratingId:string,userId: string) => {
    try {
        // Check if the user has already liked the review
        const existingLike = await prismadb.like.findFirst({
          where: {
            ratingId,
            userId,
          },
        });
    
        // If the user has already liked the review, return an error
        if (existingLike) {
          return { error: 'User has already liked this review' }
        }
    
        // Otherwise, create a new like for the review
        await prismadb.like.create({
          data: {
            ratingId,
            userId,
          },
        });
    
        // Update the likes count in the Rating model
        await prismadb.rating.update({
          where: {
            id: ratingId,
          },
          data: {
            likes: {
              increment: 1,
            } as any,
          },
        });
    
       return { message: 'Review liked successfully' }
      } catch (error) {
        console.error('Error liking review:', error);
        return { error: 'Internal server error' }
      }
};


export const productDislike = async (ratingId: string, userId: string) => {
  try {
      // Check if the user has already disliked the review
      const existingDislike = await prismadb.dislike.findFirst({
          where: {
              ratingId,
              userId,
          },
      });

      // If the user has already disliked the review, return an error
      if (existingDislike) {
          return { error: 'User has already disliked this review' };
      }

      // Otherwise, create a new dislike for the review
      await prismadb.dislike.create({
          data: {
              ratingId,
              userId,
          },
      });

      // Update the dislikes count in the Rating model
      await prismadb.rating.update({
          where: {
              id: ratingId,
          },
          data: {
              dislikes: {
                  increment: 1,
              } as any, // If necessary, cast to any to bypass TypeScript checking
          },
      });

      return { message: 'Review disliked successfully' };
  } catch (error) {
      console.error('Error disliking review:', error);
      return { error: 'Internal server error' };
  }
};
