import Link from "next/link";
import React from "react";
import OrderDetailsComponent from "./OrderDetailsComponent";

interface OrderItem {
  productName: string;
  productCompanyName: string;
  productQuantity: number;
}

interface OrderProps {
  orderPlacedDate: string;
  orderTotalAmount: number;
  orderShippersName: string;
  orderNumber: string;
  orderItems: OrderItem[];
}

const OrderSummaryComponent: React.FC<OrderProps> = ({
  orderPlacedDate,
  orderTotalAmount,
  orderShippersName,
  orderNumber,
  orderItems,
}) => {
  return (
    <div>
      <div className=" mt-8 pt-2 border-2 border-black mx-24 pb-5">
        <div className=" bg-yellow-500 text-white h-[15vh] flex justify-between px-9 mx-2 border-2 border-black border-b-8 border-r-4 ">
          <div>
            <div className=" flex justify-between h-full text-[1.3rem] w-[30rem] pt-5 ">
              <div className="">
                <h1>ORDER PLACED</h1>
                <p>17 July 2021</p>
              </div>
              <div className=" ">
                <h1> TOTAL</h1>
                <p> $ 200</p>
              </div>
              <div className=" ">
                <h1>SHIP TO</h1>
                <p> 123 Main Street</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col  h-full text-[1.3rem] w-[15rem] pt-5">
            <h1> ORDER#102456321789</h1>
            <button>
              <Link href={`/orders/${102456321789}`}>View Order Details</Link>
            </button>
          </div>
        </div>
        <div className=" mx-2 mt-4 ">
          <div>
            <OrderDetailsComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryComponent;
