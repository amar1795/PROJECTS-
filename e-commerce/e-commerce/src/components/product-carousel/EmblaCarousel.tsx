"use client";
import React, { useState, useCallback, useEffect } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { PrevButton, NextButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import { Heart, Minus, Plus, StarIcon, ShoppingCart } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useToast } from "@/components/ui/use-toast";
import { toggleWishlist } from "@/actions/wishlist";
import increaseProductQuantity from "@/actions/cart/increaseProduct";
import decreaseProductQuantity from "@/actions/cart/decreaseProduct";
import { addCartDatatoCookies, getCartDataFromCookies } from "@/actions/cart/addCartDatatoCookies";

type Brand = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type Image = {
  url: string;
  altText?: string;
};

type Category = {
  id: string;
  name: string;
  parentId: string;
  parentName: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  brandId: string;
  discount: number | null;
  discountedPrice: number | null;
  description: string;
  categoryId: string;
  category: Category;
  isWishlisted: boolean;
  cartItems: any;
  createdAt: Date;
  updatedAt: Date;
  brand: Brand;
  images: Image[];
};

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  products: Product[];
  category: string;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, products, category } = props;
  const [updatedProducts, setupdatedProducts] = useState<Product[]>(products);
  console.log("this is the product", updatedProducts);
  const { theme } = useTheme();
  const { toast } = useToast();

  const user = useCurrentUser();
  

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

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



  const handleQuantityChange = useCallback(
    (userId: string, productId: string, change: number) => {

      const updatedProductsList = updatedProducts.map((product) => {
        if (product.id === productId) {
          // Ensure quantity doesn't go below 0
          const currentQuantity = product?.cartQuantity ? product?.cartQuantity: 0; // Initialize to 0 if undefined or null
          const newQuantity = Math.max(currentQuantity + change, 0);
          return { ...product, cartQuantity: newQuantity };
        }
        return product;
      });
      setupdatedProducts(updatedProductsList);

      console.log("these are the updated products", updatedProducts);

      if(user){
      setTimeout(async () => {
        if (change > 0) {
          // alert("increase quantity is called", userId, productId)
          await increaseProductQuantity(userId, productId);
        } else {
          // alert("decrease quantity is called")
          await decreaseProductQuantity(userId, productId);
        }
      }, 200);
    }
  },
    [updatedProducts]
  );

  
  // useEffect to monitor changes to updatedProducts and save to cookies
useEffect(() => {
  async function saveToCookies() {
    await addCartDatatoCookies(updatedProducts);
  }
  saveToCookies();
}, [updatedProducts]);


  // useEffect to load data from cookies and merge with fetched products on component mount
  useEffect(() => {
    async function mergeDataFromCookies() {
      const cookieData = await getCartDataFromCookies();

      const mergedProducts = updatedProducts.map((product) => {
        const cookieProduct = cookieData.find(item => item.id === product.id);
        return cookieProduct ? { ...product, cartQuantity: cookieProduct.cartQuantity } : product;
      });

      setupdatedProducts(mergedProducts);
    }

    mergeDataFromCookies();
  }, []);



  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;
    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi, onNavButtonClick);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi, onNavButtonClick);

  const formatPrice = (price: number): string => "₹" + price.toLocaleString("en-IN");



  return (
    <section className="ProductEmbla_product">
      <div className="embla__viewport_product" ref={emblaRef}>
        <div className="Product_embla__container">
          {!products ? (
            <>
              {slides.map((index) => (
                <div className="embla__slide_product" key={index}>
                  <div className="embla__slide__number__product">
                    <div className="ProductImageCard h-60 over">
                      <Link href={`categories/men/sdgsg`}>
                        <div className="ProductImage bg-red-400 h-full w-full">
                          <button className="heartButton">
                            <Heart size={40} />
                          </button>
                        </div>
                      </Link>
                    </div>
                    <div className="ProductDetails">
                      <div className="card_slider px-4 pb-5">
                        <div className="">Company name</div>
                        <div className="font-extralight text-lg">product name</div>
                        <div>Price</div>
                        <Link href={`categories/${category}/sdgsg`}>
                          <button className="buynow">
                            <div>
                              <ShoppingCart size={30} />
                            </div>
                            <div className="text-sm px-3">Buy Now</div>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {updatedProducts.slice(0, 7).map((product, index) => (
                <div key={product.id}>
                  <div className="embla__slide_product">
                    {index !== 6 ? (
                      <div className="embla__slide__number__product">
                        <div className="ProductImageCard h-60 over">
                          <div className="ProductImage bg-red-400 h-full w-full">
                            <button
                              className={`heartButton hover:text-red-500`}
                              onClick={() => handleWishlistToggle(user?.id, product.id)}
                            >
                              <Heart
                                size={40}
                                className={`hover:fill-red-500 text-black ${product?.isWishlisted ? "fill-red-500" : ""}`}
                              />
                            </button>
                            <Link href={`categories/${category}/${product.category.name.replace(/\s+/g, "")}/${product.id}`}>
                              <img src={product.images[0]?.url} alt={product.images[0].altText || "Product Image"} />
                            </Link>
                          </div>
                        </div>
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
                              <button className="pr-2 hover:bg-gray-200 pl-1" onClick={() => handleQuantityChange(user?.id, product.id, -1)}>
                                <Minus size={20} />
                              </button>
                              <div className="text-[1.5rem] bg-white h-[2rem]">
                                <div className="px-2 py-2">{product.cartQuantity || 0}</div>
                              </div>
                              <button className="pl-2 hover:bg-gray-200 pr-1" onClick={() => handleQuantityChange(user?.id, product.id, 1)}>
                                <Plus size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="ProductDetails">
                          <div className={`card_slider px-4 pb-5 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                            <div>{product.brand.name}</div>
                            <div className="font-extralight text-lg">
                              {product.name.length > 36 ? product.name.slice(0, 30) + "..." : product.name}
                            </div>
                            <div>{formatPrice(product.price)}</div>
                            <Link href={`/cart`}>
                              <button className="buynow">
                                <div>
                                  <ShoppingCart size={30} />
                                </div>
                                <div className="text-sm px-3">Buy Now</div>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link href={`http://localhost:3000/categories/${category}`}>
                        <div className="embla__slide__number__product bg-yellow-500">
                          <div className="flex flex-col justify-center self-center h-full">
                            <h1 className="text-[3rem] italic pl-5">See More in {category} Categories</h1>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              <div className="lastCard">
                <div className="embla__slide_product"></div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="embla__controls_product">
        <div className="previous absolute top-52 left-5 h-full flex self-center">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <div className="next absolute top-52 right-5">
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
