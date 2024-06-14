"use server";

import { auth } from "@/auth";
import { prismadb } from "@/lib/db";

export default async function emptyCart() {
    const session = await auth();
    const user = session?.user?.id;

    // Check if there are items in the cart before deleting
    const cartItems = await prismadb.cartItem.findMany({
        where: {
            cart: {
                userId: user
            }
        }
    });

    if (cartItems && cartItems.length > 0) {
        await prismadb.cartItem.deleteMany({
            where: {
                cart: {
                    userId: user
                }
            }
        });

        console.log('Cart items deleted successfully');
    } else {
        console.log('No items found in the cart');
    }
}
