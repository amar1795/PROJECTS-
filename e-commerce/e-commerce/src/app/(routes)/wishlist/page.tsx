// "use client";

import OrderDetailsComponent from "@/components/order summary component/OrderDetailsComponent";
import React, { use, useEffect, useState } from "react";
import { getUserWishlist } from "@/actions/wishlist";
import { useCurrentUser } from "@/hooks/use-current-user";
import WishlistedProductCard from "@/components/Wishlisted product card/productCard";
import { toast } from "@/components/ui/use-toast";
// import RemoveFromWishlist from "@/components/removeFromWishlist/RemoveFromWishlist";
import { auth } from "@/auth";


const page = async() => {
  const session = await auth();

  const user = session?.user?.id;

  const wishlist = await getUserWishlist(user?.id);
  // const user = useCurrentUser();

//   const [wishlist, setWishlist] = useState([]);
// const [data, setData] = useState(false);
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         if (user?.id) {
//           const response = await getUserWishlist(user?.id);
//           setWishlist(response);
//         }
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//       }
//     };

//     fetchWishlist();
//   }, [user?.id,data]);

  // console.log("this is the wishlist count", wishlist.length);
  // setData={setData}
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
                <WishlistedProductCard product={product?.product}   />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
