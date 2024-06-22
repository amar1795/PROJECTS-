"use client"

import { fetchAllOrders } from "@/actions/order/fetchAllOrder";
import OrderSummaryComponent from "@/components/order summary component/OrderSummaryComponent";
import { PaginationComponent } from "@/components/pagination";
import React, { use, useEffect, useState } from "react";

const page =  () => {

  const [orders, setOrders] = useState([]);

  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem("currentOrdersPage");
    return storedPage ? parseInt(storedPage, 10) : 1;
  });

     // Save current page to local storage whenever it changes
     useEffect(() => {
      localStorage.setItem("currentOrdersPage", currentPage.toString());
    }, [currentPage]);

  useEffect(() => {
    const fetchOrders = async () => {
     const  fetchedOrders = await fetchAllOrders({page:currentPage});
      setOrders(fetchedOrders);
      console.log("these are the orders",fetchedOrders);
      
     
    };
    fetchOrders();

  }
  , [currentPage])



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
        <h1 className=" text-[4rem] pl-10 uppercase">Your Total Orders : {orders[0]?.totalOrdersCount}</h1>
        <div className=" px-8">
          <div className=" border-black border-b-4 "></div>
        </div>
        <div>
          <div className="  pt-5 pb-5">
         {
          
    (orders == null || orders.length === 0)
      ?(<h1 className=" text-[2rem]">loading...</h1>)
      :(orders.map((order) => (
        <OrderSummaryComponent
          
          order={order}
          key={order.id}
        />
      )))
    
    
  }
         
          </div>
        </div>
        <div className="px-8  mt-[5rem] ml-[50rem]">
          <PaginationComponent 
          currentPage={currentPage}
          totalPages={orders[0]?.totalPages}
          onPageChange={(page) => setCurrentPage(page)}/>

        </div>
      </div>
    </div>
  );
};

export default page;
