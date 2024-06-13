"use server";
import { z } from "zod";
import { PaymentSchema } from "@/schemas"; // Adjust the import path accordingly

import { prismadb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function userCheckoutPayment(userId: string, paymentDetails: z.infer<typeof PaymentSchema>) {
  try {
    // Validate userId and paymentDetails
    if (!userId) {
      return { error: "User ID is required" };
    }
    const validatedPayment = PaymentSchema.safeParse(paymentDetails);
    if (!validatedPayment.success) {
      return { error: "Invalid payment fields" };
    }

    // Find the user to ensure they exist
    const user = await prismadb.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Simulate storing the payment details
    const paymentRecord = {
      ...validatedPayment.data,
      userId: userId,
      // Add any other necessary fields here
    };

    console.log('Payment processed successfully', paymentRecord);
    return { success: "Payment processed successfully" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while processing the payment" };
  }
}
