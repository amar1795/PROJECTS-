"use server";

import { PrismaClient, DeliveryStatus } from '@prisma/client';


import { prismadb } from "@/lib/db";

interface Product {
    id: string;
    cartQuantity: number;
    price: number;
}

interface CreateOrderProps {
    userId: string;
    products: Product[];
    address: string;
    phone: string;
    paymentMode: string;
    cardId?: string;
    walletId?: string;
}


export async function createOrder(props: CreateOrderProps) {
    try {
        const { userId, products, address, phone, paymentMode, cardId, walletId } = props;

        // Step 1: Prepare formatted order details
        const formattedOrder = {
            userId: userId,
            address: address,
            phone: phone,
            paymentMode: paymentMode as any,
            cardId: cardId ?? undefined,
            walletId: walletId ?? undefined,
            orderItems: {
                create: products.map((product) => ({
                    productId: product.id,
                    quantity: product.cartQuantity,
                    price: product.price, // Assuming product price is included
                }))
            },
            deliveryStatus: DeliveryStatus.ORDER_PLACED, // Initial delivery status
        };

        // Step 2: Create the order using the formatted order details
        const createdOrder = await prismadb.order.create({
            data: {
                ...formattedOrder
            },
            include: {
                orderItems: true,
            }
        });

        // Step 3: Delete cart items (assuming this function is elsewhere)
        await prismadb.cartItem.deleteMany({
            where: {
                cart: {
                    userId: userId
                }
            }
        });

        return { createdOrder :createdOrder,  success: true, message: "Order created successfully" };

    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Failed to create order");
    } finally {
        await prismadb.$disconnect(); // Disconnect Prisma client
    }
}
