import {
  addCartDatatoCookies,
  removeProductFromCookies,
} from "@/actions/cart/addCartDatatoCookies";
import addItemToCart from "@/actions/cart/addItemToCart";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Minus, Plus, ShoppingCart, StarIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProductCardLower = ({ product, theme, formatPrice, callToast }) => {
  const [tempquantity, settempQuantity] = useState(0);
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [productVarientID, setProductVarientID] = useState();
  const [stock, setStock] = useState();
  const user = useCurrentUser();
  const [itemInCart, setItemInCart] = useState(false);

  useEffect(() => {
    settempQuantity(product.cartQuantity);
    setColor(product.color);
    setSize(product.size);
    setProductVarientID(product.productVarientID);
    setStock(product.stock);

    if (product.cartQuantity) {
      setItemInCart(true);
    }
  }, [product]);

  const handleIncrease = () => {
    if (tempquantity > stock - 1) {
      return;
    }
    settempQuantity((prev) => prev + 1);

    // handleQuantityChange(user?.id, data.id, 1)

    // the below needs to be done when the product is finalized and clicked on proceed to buy
    // handleClickAdd(user?.id, data.id, selectedColor, selectedSize);

    // const productVarietnID = findProductVariant(
    //   data?.productVariants,
    //   selectedColor,
    //   selectedSize
    // );

    // console.log(
    //   "this is the product varient id which is selected",
    //   productVarietnID
    // );
  };

  const handleDecrease = async () => {
    if (tempquantity == 0) {
    
      return;
    }

    settempQuantity((prev) => prev - 1);

    // the below needs to be done when the product is finalized and clicked on proceed to buy

    // handleQuantityChange(user?.id, data.id, -1);
    // const productVarietnID = findProductVariant(
    //   data?.productVariants,
    //   selectedColor,
    //   selectedSize
    // );

    // console.log(
    //   "this is the product varient id which is selected",
    //   productVarietnID
    // );
  };

  const handleConfirm = async () => {
    if (tempquantity == 0) {
      return;
    }

    if (user) {
      // this is being added to db also need to add in the cookie when the user is not logged in
      const { success, message } = await addItemToCart(
        user?.id,
        product.id,
        productVarientID,
        color,
        size,
        tempquantity,
        stock
      );
      if (success === true) {
        //   alert("Item added to cart successfully")
      }
      console.log(
        "this is the final value to be updated in the db",
        tempquantity,
        color,
        size,
        productVarientID,
        stock
      );
      // handleClickAdd(user?.id, data.id, selectedColor, selectedSize);
      const dataobj = {
        id: product.id,
        cartQuantity: tempquantity,
        discountedPrice: product.discountedPrice,
        color: color,
        size: size,
        stock: stock,
        productVarientID: productVarientID,
      };

      const value = await addCartDatatoCookies([dataobj]);
      console.log("this is the cookie value", value.success, value.cookieValue);
    } else {
      const dataobj = {
        id: product.id,
        cartQuantity: tempquantity,
        discountedPrice: product.discountedPrice,
        color: color,
        size: size,
        stock: stock,
        productVarientID: productVarientID,
      };

      console.log(
        "this is the final value to be updated in the db",
        tempquantity,
        color,
        size,
        productVarientID,
        stock
      );
      const { success, cookieValue } = await addCartDatatoCookies([dataobj]);
      console.log("this is the cookie value", success, cookieValue);
    }

    if (tempquantity === 0) {
      alert("Please add the quantity first");
      callToast({
        variant: "destructive",
        message: "Please add the quantity first",
        description:
          "Please add the quantity first in order to add the item to cart",
      });
    } else {
      callToast({
        message: "Item added to cart",
        description: "successfully added item to cart",
      });
    }
    setItemInCart(true);
  };


  const handleremove = async () => {

      settempQuantity(0);
    await removeProductFromCookies(product.id);
    setItemInCart(false);
    
  }

  return (
    <div>
      <div>
        <div className="mt-[1.5rem] text-sm flex justify-between bg-opacity-20 backdrop-blur-lg border border-white/30">
          <div className="bg-gray-200 w-16">
            <div className="flex justify-between px-2 pt-1">
              <span>{product?.ratings?.averageRating.toFixed(1)}</span>
              <div className="self-center">
                <StarIcon size={20} fill="black" />
              </div>
            </div>
          </div>
          <div>
            <div className="box flex pr-4">
              {/* <button className="pr-2 hover:bg-gray-200 pl-1" onClick={() => handleQuantityChange(user?.id, product.id, -1)}> */}
              <button
                className="pr-2 hover:bg-gray-200 pl-1"
                onClick={handleDecrease}
              >
                <Minus size={20} />
              </button>
              <div className="text-[1.5rem] bg-white h-[2rem]">
                {/* <div className="px-2 py-2">{product.cartQuantity || 0}</div> */}
                <div className="px-2 py-2">{tempquantity}</div>
              </div>
              <button
                className="pl-2 hover:bg-gray-200 pr-1"
                onClick={handleIncrease}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="ProductDetails">
          <div
            className={`card_slider px-4 pb-5 ${
              theme === "dark" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <div>{product.brand.name}</div>
            <div className="font-extralight text-lg">
              {product.name.length > 36
                ? product.name.slice(0, 30) + "..."
                : product.name}
            </div>
            <div>{formatPrice(product.price)}</div>
            {/* <Link href={`/cart`}> */}

            {product.cartQuantity || itemInCart ? (
              <button className="buynow" onClick={handleremove}>
                <div>
                  <ShoppingCart size={30} />
                </div>
                <div className="text-sm px-1">Remove  </div>
              </button>
            ) : (
              <button className="buynow" onClick={handleConfirm}>
                <div>
                  <ShoppingCart size={30} />
                </div>
                <div className="text-sm px-1">Add to Cart </div>
              </button>
            )}

            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardLower;
