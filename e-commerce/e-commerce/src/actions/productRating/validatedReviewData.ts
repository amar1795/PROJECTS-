"use server";

import * as z from "zod";

import { ReviewSchema } from "@/schemas";
import { createUserReview } from "./CreateProductReview";


export const ValidatedReviewData = async (values: z.infer<typeof ReviewSchema>,ProductId, isPaid) => {
  
  const validatedFields = ReviewSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Data please fill the data properly !" };
  }

  const { rating,images,title,review } = validatedFields.data;

//   after validation we can now create the review

//   productId: string;
//   rating: number;
//   reviewTitle?: string | null;
//   review?: string | null;
//   verifiedPurchase?: boolean;
//   imageUrls?: string[];

const data={
    ispaid:isPaid,
    productId: ProductId, // Replace with an actual product ID
    rating: rating,
    reviewTitle: title,
    review: review,
    verifiedPurchase: isPaid ? true : false,
    imageUrls: images,
}

  console.log("Data:", data);

  const validatedReviewData = await createUserReview({...data});

    console.log("User review created:", validatedReviewData);

// send email to user with reset link now commented out for testing

 

  return { success: "Reset email sent!" ,data:validatedReviewData};
}