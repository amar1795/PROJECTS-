"use server";

import { auth } from "@/auth";
import { prismadb } from "@/lib/db";

export async function fetchAllOrders() {
    const userSession = await auth();
    const user = userSession?.user?.id;
    try {

        // Fetch all orders for the given userId
        const orders = await prismadb.order.findMany({
            where: {
                userId: user,
            },
            include: {
                orderItems: {
                    include: {
                        product: {
                            include: {
                                brand: true,
                                images: {
                                    take: 1,  // Limit to only the first image
                                },
                            },
                        },
                    },
                },
                address: true,
                card: true,
                wallet: true,
            },
        });


        // Ensure orderTotal is not null
        const sanitizedOrders = orders.map(order => ({
            ...order,
            orderTotal: order.orderTotal ?? 0,  // Defaulting to 0 if orderTotal is null
        }));

        // console.log('Orders fetched successfully', sanitizedOrders);

        return sanitizedOrders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders");
    } finally {
        await prismadb.$disconnect(); // Disconnect Prisma client
    }
}
