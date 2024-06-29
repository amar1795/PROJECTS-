import React, { useCallback, useEffect, useState } from 'react'
import ProductCard from '../product card/productCard'
import { relatedProduct ,updatedDataResponse } from '@/app/categories/[categories]/[product]/page'
import { useToast } from '../ui/use-toast';
import { Product } from '../product-carousel/EmblaCarousel';
import { toggleWishlist } from '@/actions/wishlist';
import { addCartDatatoCookies, getCartDataFromCookies, removeProductFromCookies } from '@/actions/cart/addCartDatatoCookies';
import increaseProductQuantity from '@/actions/cart/increaseProduct';
import decreaseProductQuantity from '@/actions/cart/decreaseProduct';
import { useCurrentUser } from '@/hooks/use-current-user';
import { fetchSingleProduct } from '@/actions/cart/fetchSingleProduct';

interface CategoriesRelatedProductProps {
  relatedProduct: relatedProduct[];
  ProductId: string; // Define ProductId as string
}

const CategoriesRelatedProduct:React.FC<CategoriesRelatedProductProps>  = ({relatedProduct,ProductId,callToast}) => {
  if(!relatedProduct) return <div>
    Loading ...
  </div>
  console.log("this is the related product from related products page", relatedProduct);
  // Filter out the product with the same ID as ProductId
  // const filteredProducts = relatedProduct.filter(product => product.id !== ProductId);
  console.log("this is the product id from related products page:", ProductId);
  const [updatedProducts, setupdatedProducts] = useState<Product[]>(relatedProduct);
  console.log("this is the updatedProducts product from related products page", updatedProducts);

  const { toast } = useToast();
  const user = useCurrentUser();
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    setupdatedProducts(relatedProduct);
  }, [relatedProduct]);

  const handleClickAdd = async (userID, productID) => {
    // alert("add to cart is being called")
    console.log("this is the product id", productID);
    const completedata = await fetchSingleProduct(productID);
    console.log("this is the completed data", completedata);
    // addProductToCart(userID, productID);
    addCartDatatoCookies(completedata);

    setUpdateTrigger((prev) => !prev);
  };

  const handleWishlistToggle = useCallback(async (userId: string, productId: string) => {
    if (!user) {
      callToast({
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
      callToast({
        variant: message.message === "added" ? "default" : "destructive",
        title: message.message === "added" ? "Added to Wishlist" : "Removed from Wishlist",
        description: message.message === "added" ? "The item has been wishlisted" : "The item has been removed from wishlist",
        
      });
    }, 200);
  }, [updatedProducts, user, toast]);
  

  
const handleQuantityChange = useCallback(
  (userId: string, productId: string, change: number) => {
    // alert("i have been called")

    const updatedProductsList = updatedProducts.map((product) => {
      if (product.id === productId) {
        // Ensure quantity doesn't go below 0
        const currentQuantity = product?.cartQuantity ? product?.cartQuantity: 0; // Initialize to 0 if undefined or null
        const newQuantity = Math.max(currentQuantity + change, 0);
        // alert( newQuantity)
        return { ...product, cartQuantity: newQuantity };
      }
      return product;
    });
    setupdatedProducts(updatedProductsList);

    console.log("these are the updated products", updatedProducts);

       // Save updated product information to cookies
  if (updatedProductsList.find(product => product.id === productId)?.cartQuantity === 0) {
     removeProductFromCookies(productId); // Remove product from cookies if cartQuantity is 0
  } else {
     addCartDatatoCookies(updatedProductsList); // Otherwise, save updated data to cookies
  }

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


useEffect(() => {
  async function mergeDataFromCookies() {
    const cookieData = await getCartDataFromCookies();
    // create another function here to merge the login usercart lenght and the cookie cart length and then update the cart length in the shopping cart Icon
    const mergedProducts = relatedProduct.map((product) => {
      const cookieProduct = cookieData.find(item => item.id === product.id);
      return cookieProduct ? { ...product, cartQuantity: cookieProduct.cartQuantity } : product;
    });

    setupdatedProducts(mergedProducts);
  }

  mergeDataFromCookies();
}, [relatedProduct,updateTrigger]);

  return (
    <div>
      <div className="  bg-teal-600 min-h-[30rem] px-5">
            {/* <h1 className=" pt-4 pb-4 text-[2rem]">Related products</h1> */}

            <div className=" flex  flex-wrap pl-3">
            {updatedProducts
            .filter((product) => product.id !== ProductId) // Apply the filter here
            .map((product: relatedProduct) => (
              <div className="py-4" key={product.id}>
                <ProductCard product={product} productId={product.id} handleQuantityChange={handleQuantityChange} handleWishlistToggle={handleWishlistToggle} handleClickAdd={handleClickAdd} catRelatedProduct={true} />
              </div>
            ))}
            </div>
          </div>
    </div>
  )
}

export default CategoriesRelatedProduct
