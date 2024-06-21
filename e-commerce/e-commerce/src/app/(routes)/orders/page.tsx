import { fetchAllOrders } from "@/actions/order/fetchAllOrder";
import OrderSummaryComponent from "@/components/order summary component/OrderSummaryComponent";
import { PaginationComponent } from "@/components/pagination";
import React from "react";

const page = async () => {
  const orders = await fetchAllOrders();
  // console.log("these are the orders",orders);
  // orders.forEach((order) => {
  //   console.log(`Order ID: ${order.id}`);
  //   console.log(`Order Total: ${order.orderTotal}`);
  //   console.log(`Delivery Status: ${order.deliveryStatus}`);
  //   console.log(`Is Paid: ${order.isPaid}`);

  //   console.log("Order Items:");
  //   order.orderItems.forEach((orderItem) => {
  //     console.log(`- Order Item ID: ${orderItem.id}`);
  //     console.log(`  Product Name: ${orderItem.product?.name}`);
  //     console.log(`  Product Image: ${orderItem.product.images[0].url}`);
  //     console.log(`  Quantity: ${orderItem.quantity}`);
  //     console.log(`  Price: ${orderItem.price}`);
  //     // Add more properties as needed
  //   });
  // });

  return (
    <div>
      <div className=" min-h-[95vh] bg-pink-500 ">
        <h1 className=" text-[4rem] pl-10 uppercase">Your Orders : {orders.length}</h1>
        <div className=" px-8">
          <div className=" border-black border-b-4 "></div>
        </div>
        <div>
          <div className="  pt-5 pb-5">
            {orders.map((order) => (
              <OrderSummaryComponent
                isPaid={order.isPaid}
                order={order}
                key={order.id}
              />
            ))}
          </div>
        </div>
        <div className="px-8  mt-[5rem] ml-[50rem]">
          {/* <PaginationComponent /> */}
        </div>
      </div>
    </div>
  );
};

export default page;
