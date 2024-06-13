"use server";

import { PrismaClient, DeliveryStatus } from '@prisma/client';


import { prismadb } from "@/lib/db";

interface Product {
    productId: string;
    quantity: number;
    price: number;
}

interface CreateOrderProps {
    userId: string;
    products: Product[];
    addressID: string;
    paymentMode?: string;
    cardId?: string;
    walletId?: string;
}


export async function createOrder(props: CreateOrderProps) {
    try {
        const { userId, products, addressID="666b18dcd4a3961818aeb7a9",paymentMode="CARD", cardId="666b163bd4a3961818aeb7a7", walletId } = props;

        // Step 1: Prepare formatted order details
        const formattedOrder = {
            user: {
                connect: {
                    id: userId,
                }
            },
            address: {
                connect: {
                    id: addressID // Connects to an existing address
                }
            },
            paymentMode: paymentMode as any,

            card: {
                connect: {
                    id: cardId // Use nested connect for card
                }
            },
            walletId: walletId ?? undefined,
            deliveryStatus: DeliveryStatus.ORDER_PLACED,
            orderItems: {
                create: products.map((product) => ({
                    productId: product.productId,
                    quantity: product.quantity,
                    price: product.price,
                }))
            }
        };
console.log('Order data prepared successfully', formattedOrder);
        // Step 2: Create the order using the formatted order details
        const createdOrder = await prismadb.order.create({
            data:formattedOrder,
            include: {
                orderItems: true,
            }
        });
console.log('Order created successfully', createdOrder);
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
