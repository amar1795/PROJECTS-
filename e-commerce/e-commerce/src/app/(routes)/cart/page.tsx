"use client";
import CheckoutProductCard from "@/components/checkout product card/checkoutProductCard";
import ProductCard from "@/components/product card/productCard";
import StyledButton from "@/components/styled Button/StyledButton";
import {
  Delete,
  DollarSign,
  Heart,
  Minus,
  Plus,
  Recycle,
  Trash2,
  X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

import React, { use, useCallback, useEffect, useRef, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import {
  calculateCartSummary,
  getProductsInCartSummary,
} from "@/actions/cart/cartSummary";
import CheckoutPorductCardComponent from "@/components/CheckoutPorductCardComponent";
import increaseProductQuantity from "@/actions/cart/increaseProduct";
import decreaseProductQuantity from "@/actions/cart/decreaseProduct";
import deleteCartItem from "@/actions/cart/deleteCartProducts";
import { getRelatedProducts } from "@/actions/cart/categoryRelatedProduct";
import addProductToCart from "@/actions/cart/addToProduct";
import { useToast } from "@/components/ui/use-toast";
import {
  addCartDatatoCookies,
  getCartDataFromCookies,
  removeProductFromCookies,
} from "@/actions/cart/addCartDatatoCookies";
import { fetchMultipleProducts } from "@/actions/cart/fetchMultipleProducts";
import { set } from "zod";
import { fetchSingleProduct } from "@/actions/cart/fetchSingleProduct";
import { fetchAllCartCookieData } from "@/actions/cart/fetchAllCartCookieData";
import { toggleWishlist } from "@/actions/wishlist";
import { useCheckoutStock } from "@/state hooks/product-checkout-stock";
import { getProductsByCategoryOriginal } from "@/actions/createProduct";

function calculateTotal(products) {
  let total = 0;
  for (let product of products) {
      let cartQuantity = product.cartQuantity;
      let discountedPrice = product.discountedPrice;
      total += cartQuantity * discountedPrice;
  }
  return total;
}

const page = () => {
  const user = useCurrentUser();
  const { toast } = useToast();
  const testQuantity =useCheckoutStock((state) => state.cartProductQuantity);

  const searchParams = useSearchParams();
  const cancelled = searchParams.get("canceled");
  const [summaryData, setSummaryData] = useState([]); // [totalItems, totalAmount
  const [productData, setproductData] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [updateRelatedTrigger, setUpdateRelatedTrigger] = useState(false);

  const [fetchnewTotal, setfetchnewTotal] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cartCookieProducts, setCartCookieProducts] = useState([]);
  const [totalCookieAmount, setTotalCookieAmount] = useState(0);
  const [productCookieCount, setProductCookieCount] = useState(0);
  const [updatedProducts, setupdatedProducts] = useState([]);
  const [CartRelatedProducts, setCartRelatedProducts] = useState(true);
  const [completeMergedupdatedProducts, setCompleteMergedupdatedProducts] =
    useState([]);
  const [mergedTotalCount, setMergedTotalCount] = useState(0);
  const [mergedTotalAmount, setMergedTotalAmount] = useState(0);
  console.log("this is the  mereged products", completeMergedupdatedProducts);

  const [total, setTotal] = useState(0);

  // fethcing the cookies Data
  // useEffect(() => {
  //   async function getCookiesData() {
  //     // alert("get cookies data is being called")
  //     const cookieData = await getCartDataFromCookies();
  //     const completedata = await fetchMultipleProducts(
  //       cookieData.map((product) => product.id)
  //     );
  //     // Merge cartQuantity from cookies into completedata
  //     const mergedData = completedata.map((product) => {
  //       const cookieProduct = cookieData.find((item) => item.id === product.id);
  //       if (cookieProduct) {
  //         return { ...product, cartQuantity: cookieProduct.cartQuantity };
  //       }
  //       return product;
  //     });

  //     setCartCookieProducts(mergedData);
  //     console.log("this is the cookie data", mergedData);
  //     setCompleteMergedupdatedProducts(mergedData);

  //     console.log("this is the merged data", mergedData);
  //     // Calculate total amount and product count
  //     let total = 0;
  //     let count = 0;

  //     cookieData.forEach((product) => {
  //       const price = product.discountedPrice || 0;
  //       const quantity = product.cartQuantity || 0;
  //       total += price * quantity;
  //       count++;
  //     });

  //     // setTotalCookieAmount(total);
  //     setMergedTotalAmount(total);
  //     // alert("merged total amount is being called")
  //     // alert("setTotalCookieAmount" + total)
  //     // setProductCookieCount(count);
  //     setMergedTotalCount(count);
  //   }

  //   getCookiesData();
  // }, [updateTrigger, fetchnewTotal]);


  useEffect(() => {

    async function getCookiesData() {
      const { mergedData, total, count } = await fetchAllCartCookieData();
    
      setMergedTotalAmount(total);
      setMergedTotalCount(count);
    }

    getCookiesData();

  },[fetchnewTotal])

  useEffect(() => {
    async function getCookiesData() {
      const { mergedData, total, count } = await fetchAllCartCookieData();
      // create another server function to merge the dbcart data and the cookie data lenght and show it everytime the same count on the shopping cart Icon in this way the consistency will be mainted and the data will be shown without any delayed updation 

      console.log("this is the merged data added to completemeregeddata", mergedData);
      setCompleteMergedupdatedProducts(mergedData);
      setMergedTotalAmount(total);
      setTotal(total);

      setMergedTotalCount(count);
    }

    getCookiesData();
  }, [updateTrigger]);

  useEffect(() => {
    if (cancelled) {
      toast({
        title: "Order Payment Failed",
        description: "Something went wrong, please try again!",
        variant: "destructive",
      });
    }
  }, [cancelled]);

  const handleClickDelete = (userID, productID) => {
    cartCookieProducts.map((product) => {
      if (product?.id == productID) {
        removeProductFromCookies(productID);

        setUpdateTrigger((prev) => !prev);
        setUpdateRelatedTrigger((prev) => !prev);

        setTimeout(() => {
          toast({
            title: "Item removed from cart",
            description: "successfully removed the item from cart",
            variant: "destructive",
          });
        }, 1000);
      }
    });

    if (userID) {
      // alert("delete cart item is being called")
      deleteCartItem(userID, productID);
      setTimeout(() => {
        toast({
          title: "Item removed from cart",
          description: "successfully removed the item from cart",
          variant: "destructive",
        });
      }, 1000);
    }
  };

  const handleClickCookieDelete = (userID, productID) => {
    cartCookieProducts.map((product) => {
      if (product?.id == productID) {
        removeProductFromCookies(productID);
        setUpdateTrigger((prev) => !prev);
        setTimeout(() => {
          toast({
            title: "Item removed from cart",
            description: "successfully removed the item from cart",
            variant: "destructive",
          });
        }, 1000);
      }
    });
    // deleteCartItem(userID, productID);
  };

  const handleClickAdd = async (userID, productID) => {
    // alert("add to cart is being called")
    // console.log("this is the product id", productID);
    // const completedata = await fetchSingleProduct(productID);
    // console.log("this is the completed data", completedata);
    // addProductToCart(userID, productID);
    // toast({
    //   title: "Item Added to cart",
    //   description: "successfully added the item to cart",
    // });
    // addCartDatatoCookies(completedata);


    setUpdateTrigger((prev) => !prev);
    setUpdateRelatedTrigger((prev) => !prev);
  };

  const handleWishlistToggle = useCallback(async (userId: string, productId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not Logged In",
        description: "Please login to wishlist this item",
      });
      return;
    }
    const updatedProductsList = updatedProducts.map((product) =>
      product.id === productId ? { ...product, isWishlisted: !product.isWishlisted } : product
    );
    
    setupdatedProducts(updatedProductsList);
  
    setTimeout(async () => {
      const message = await toggleWishlist(userId, productId);
      toast({
        variant: message.message === "added" ? "default" : "destructive",
        title: message.message === "added" ? "Added to Wishlist" : "Removed from Wishlist",
        description: message.message === "added" ? "The item has been wishlisted" : "The item has been removed from wishlist",
        
      });
    }, 200);
  }, [updatedProducts, user, toast]);
  

  useEffect(() => {
    const cartSummary = async () => {
      try {
        const {products, totalAmount} = await getProductsInCartSummary(user?.id);
        console.log(
          "this is the product data from getproductsCartSummary",
          products
        );
        // setproductData(data);
        // const cartSummaryData = await calculateCartSummary(user?.id);
        // // console.log("this is the cart summary data", cartSummaryData);
        // setSummaryData(cartSummaryData);
        setMergedTotalCount(products.length);
        setMergedTotalAmount(totalAmount);
       
      setTotal(totalAmount);
        // now merging the data from the db into the cookies data hence merge Data
        setCompleteMergedupdatedProducts(products);
      } catch (error) {
        // alert(error);
        console.log("this is the error", error);
      }
    };
    cartSummary();
  }, []);



  // related products useffect
  useEffect(() => {
    const relatedData = async () => {
      // this needs to work without the user as well
     
      const data = await getRelatedProducts(user?.id);
      console.log("this is the related updated products list", data);

      setupdatedProducts(data);
      
    
    };
    relatedData();
  }, [updateRelatedTrigger]);

  if (productData.length === 0 && !summaryData) {
    return <div>loading...</div>;
  }

  // need to implement deboucning here for the quantity change
  const handleQuantityChange = useCallback(
    async (userId: string, productId: string, change: number) => {
      let refetch = false;

      const updatedProductsList = productData
        ?.map((product) => {
          if (product.id === productId) {
            const updatedCartItems =
              product.cartItems.length > 0
                ? product.cartItems.map((item) => {
                    if (item.productId === productId) {
                      const newQuantity = Math.max(item.quantity + change, 0);
                      if (newQuantity === 0) refetch = true;
                      return { ...item, quantity: newQuantity };
                    }
                    return item;
                  })
                : [{ productId, quantity: Math.max(change, 0) }];
            return {
              ...product,
              cartItems: updatedCartItems.filter((item) => item.quantity > 0),
            };
          }
          return product;
        })
        .filter((product) => product.cartItems.length > 0);

      setproductData(updatedProductsList);

      if (change > 0) {
        await increaseProductQuantity(userId, productId);
      } else {
        await decreaseProductQuantity(userId, productId);
      }

      if (refetch) {
        setUpdateTrigger((prev) => !prev);
      } else {
        const cartSummaryData = await calculateCartSummary(user.id);
        setSummaryData(cartSummaryData);
      }
    },
    [productData]
  );

  const handleQuantityCookieChange = useCallback(
    (userId: string, productId: string, change: number) => {
      
      // update the change in the cookies and we will update the database when fethcning the data from the cookies
      const updatedProductsList = completeMergedupdatedProducts.map(
        (product) => {
          if (product.id === productId) {
            // Ensure quantity doesn't go below 0
            const currentQuantity = product?.cartQuantity
              ? product?.cartQuantity
              : 0; // Initialize to 0 if undefined or null
            const newQuantity = Math.max(currentQuantity + change, 0);
            // alert( newQuantity)

            return { ...product, cartQuantity: newQuantity };
          }
          return product;
        }
      );

      setfetchnewTotal(prev => !prev)
      setCompleteMergedupdatedProducts(updatedProductsList);
     const total= calculateTotal(updatedProductsList);
      setTotal(total);
      setCartCookieProducts(updatedProductsList);

      // setUpdateTrigger((prev) => !prev);

      // need to add the updated products to the database as well since it is being added in the cookies already

      console.log("these are the updated products", cartCookieProducts);

      // Save updated product information to cookies
      if (
        updatedProductsList.find((product) => product.id === productId)
          ?.cartQuantity === 0
      ) {
        deleteCartItem(userId, productId);
        removeProductFromCookies(productId); // Remove product from cookies if cartQuantity is 0

        //  setUpdateTrigger((prev) => !prev);

        setTimeout(() => {
          toast({
            title: "Item removed from cart",
            description: "successfully removed the item from cart",
            variant: "destructive",
          });
        }, 1000);
      } else {
        addCartDatatoCookies(updatedProductsList); // Otherwise, save updated data to cookies
        //  setUpdateTrigger((prev) => !prev);
      }

      //   if(user){
      //   setTimeout(async () => {
      //     if (change > 0) {
      //       // alert("increase quantity is called", userId, productId)
      //       await increaseProductQuantity(userId, productId);
      //     } else {
      //       // alert("decrease quantity is called")
      //       await decreaseProductQuantity(userId, productId);
      //     }
      //   }, 200);
      // }
      // Update state after debounce
      // debounceUpdateTrigger();
    },
    [completeMergedupdatedProducts]
  );

  // Debounce function implementation
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debounceUpdateTrigger = useRef(
    debounce(() => {
      // setCompleteMergedupdatedProducts(updatedProductsList);
      // setCartCookieProducts(updatedProductsList);
      setUpdateTrigger((prev) => !prev);
    }, 1000)
  ).current;

  // Optionally, clean up the timer if the component unmounts or dependencies change
  useEffect(() => {
    return () => {
      clearTimeout(debounceUpdateTrigger.current);
    };
  }, []);
  // console.log("this is the summary data", summaryData);

  return (
    <div className="  border-2 border-black overflow-hidden ">
      <div className=" bg-teal-600  px-5 py-5">
        <div>
          <h1 className=" text-[4rem] leading-none ">SHOPPING CART</h1>
          <div className=" h-[4rem]">
            <h3 className="w-80 text-[2rem] leading-none p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
              TOTAL ITEMS ({mergedTotalCount})
            </h3>
          </div>

          <div className=" w-[15rem]">
            <div className=" text-[2rem] leading-none  border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
              <div className=" flex self-center py-2  h-[3.5rem]">
                <h1 className=" text-[2rem] self-center leading-none">
                  { total?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })
                  }
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* if the user is signed in */}
      {
        <div className=" bg-orange-300 flex justify-around px-30 py-4">
          <div>
            <div>
              <div className=" px-4 py-4 mt-2 w-[40rem] flex-1 ">
                {completeMergedupdatedProducts.map((product) => {
                  return (
                    <div className=" mb-4" key={product.id}>
                      <CheckoutProductCard
                        handleClickDelete={handleClickDelete}
                        product={product}
                        size={product?.size}
                        color={product?.color}
                        handleQuantityChange={handleQuantityCookieChange}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className=" w-[45rem]  border-b-8 border-r-4 border-2 border-black  mt-6">
            <div className="   bg-opacity-20 backdrop-blur-lg border border-white/30 bg-white">
              <div className=" px-4 py-4  ">
                <div className=" h-[4rem] pl-6 mb-8">
                  <h3 className=" text-[2rem] leading-none p-2 border-2 border-black text-black mt-4 flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                    Order Summary
                  </h3>
                </div>

                {completeMergedupdatedProducts.map((item) => (
                  <div className="orderSummary">
                    <div className=" flex justify-between ">
                      <div className=" w-[26rem]">
                        <h1 className=" self-center  text-[1.2rem] font-bold">
                          {" "}
                          {item.name.length > 36
                            ? item.name.slice(0, 35) + "..."
                            : item.name}
                        </h1>
                      </div>
                      <span className=" flex  self-center   w-[4rem]  justify-between">
                        <div className=" self-center">
                          <X />
                        </div>{" "}
                        <h1 className=" text-[1.5rem] ">{item.cartQuantity}</h1>
                        {/* <h1 className=" text-[1.5rem] ">{testQuantity}</h1> */}
                      </span>

                      <div className=" flex self-center py-2  w-[10rem]">
                        <h1 className=" text-[1.3rem] self-center">
                          {(
                            item.discountedPrice * item.cartQuantity
                          )?.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}

                <div></div>
                <div className=" flex justify-between px-12 ">
                  <h1 className=" self-center text-[1.5rem] uppercase font-bold">
                    Delivery
                  </h1>

                  <div className=" flex self-center py-2   mr-12">
                    <h1 className=" text-[1.3rem] self-center font-bold ">
                      Free
                    </h1>
                  </div>
                </div>
                <div></div>

                <div className=" border-b-2 border-black "></div>
                <div className=" flex justify-between py-8 px-8 ">
                  <h1 className=" self-center font-bold text-[2rem] uppercase">
                    Total
                  </h1>

                  <div className=" flex self-center py-2 font-bold">
                    <h1 className=" text-[1.3rem] self-center">
                      {total?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h1>
                  </div>
                </div>
                <div></div>
                <div className="">
                  {!user ? (
                    <div className=" flex justify-center">
                      <StyledButton buttonName="Please Sign In to purchase" />
                    </div>
                  ) : (
                    <Link href={"/checkout"}>
                      <div className=" flex justify-center">
                        <StyledButton buttonName=" Proceed to Checkout" />
                      </div>
                    </Link>
                  )}
                  {/* <StyledButton buttonName=" Proceed to Checkout" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    
      

      {updatedProducts && updatedProducts.length > 0 && (
        <div className=" bg-teal-600 min-h-[37rem] ">
          <div className="px-5">
            <div className=" pt-10 mb-8 ">
              <h3 className="w-[20rem] text-[2rem] leading-none p-2 border-2 border-black text-black  flex self-center justify-center border-b-8 border-r-4 bg-yellow-500">
                Related Products
              </h3>
            </div>

            <div className=" flex  flex-wrap pl-3">
              <div className=" pr-10 py-4 flex  flex-wrap">
                {updatedProducts.map((product) => (
                  <div className=" mb-4" key={product?.id}>
                    <ProductCard
                    callToast = {toast}
                    CartRelatedProducts={CartRelatedProducts}
                      product={product}
                      handleClickAdd={handleClickAdd}
                      handleQuantityChange={handleQuantityCookieChange} 
                      handleWishlistToggle={handleWishlistToggle}
                      productId={product?.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
