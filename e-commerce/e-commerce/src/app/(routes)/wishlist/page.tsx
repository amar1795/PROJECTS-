"use client";

import OrderDetailsComponent from "@/components/order summary component/OrderDetailsComponent";
import React, { useEffect, useState } from "react";
import { getUserWishlist } from "@/actions/wishlist";
import { useCurrentUser } from "@/hooks/use-current-user";
import WishlistedProductCard from "@/components/Wishlisted product card/productCard";

const page = () => {
  const user = useCurrentUser();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (user?.id) {
          const response = await getUserWishlist(user?.id);
          setWishlist(response);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user?.id]);
  console.log("this is the wishlist", wishlist);

  return (
    <div>
      <div className=" min-h-[95vh] bg-pink-500 ">
        <h1 className=" text-[4rem] pl-10 uppercase">Your Wishlisted Items</h1>
        <div className=" px-8">
          <div className=" border-black border-b-4 "></div>
        </div>
        <div className=" flex flex-wrap px-11">
          <div className="flex  flex-wrap pl-3">
            {/* <OrderDetailsComponent /> */}

            {wishlist?.map((product) => (
              <div className="py-4" key={product?.id}>
                <WishlistedProductCard product={product?.product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
