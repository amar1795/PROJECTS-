"use server";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prismadb } from "@/lib/db";
import { createOrder } from "@/actions/order/orderCreation";
import { prepareOrderData } from "@/actions/order/prepareOrderData";
import { getProductsInCartSummary } from "@/actions/cart/cartSummary";
import { auth } from "@/auth";

// webhook not required as we are not using the advanced features like subscriptions ,disputes etc and confirming if the payent succeeded or not  which can be done  checking the success true or false in the url as well 

// no need to use the loadstripe when using checout session 

export async function processOrder({ selectedAddressId }:{selectedAddressId:string}) {
  console.log("Process order function is being called ")
  try {
   
    const userSession = await auth();
    const user = userSession?.user?.id;

    if (!user) {
      throw new Error("Unauthorized");
    }

    const productData = await getProductsInCartSummary(user);

    if(!productData || productData.length === 0){
        throw new Error("No products found in the cart");
        }

    const line_items = productData.map((product) => ({
      quantity: product?.cartQuantity,
      price_data: {
        currency: "INR",
        product_data: {
          name: product.name,
          images: [product.images[0].url],
         

        },
        unit_amount: product?.discountedPrice * 100,
      },
    }));

    const { userId, products, addressID, totalAmount } = prepareOrderData(
      user,
      productData,
      selectedAddressId
    );

    const orderData = {
      userId: userId,
      products: products,
      addressID: addressID,
      totalAmount: totalAmount,
    };

    const orderResult = await createOrder(orderData);

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `http://localhost:3000/order-success/?success=true/orderId=${orderResult?.createdOrder.id}`,
      cancel_url: `http://localhost:3000/cart/?canceled=true`,
      metadata: {
        orderId: orderResult?.createdOrder.id,
      },
    });

   
    return { url: session.url };
  } catch (error) {
    console.error("Error processing order:", error);
    throw new Error("Internal Server Error");
  }
}
