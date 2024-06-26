"use server"
import { cookies } from 'next/headers';

export async function addCartDatatoCookies(updatedProducts) {
  const cookieStore = cookies();
  
  // Retrieve existing data from cookies
  const existingDataCookie = cookieStore.get('cartProducts');
  const existingData = existingDataCookie ? JSON.parse(existingDataCookie.value) : [];

  // Filter the updated products to store only those with cartQuantity > 0
  const productsToStore = updatedProducts
    .filter(product => product?.cartQuantity > 0)
    .map(product => ({
      id: product.id,
      cartQuantity: product?.cartQuantity,
      discountedPrice: product.discountedPrice,
    }));

  // Merge new data with existing data, ensuring no duplicates
  const mergedData = [...existingData];
  
  productsToStore.forEach(productToStore => {
    const index = mergedData.findIndex(item => item.id === productToStore.id);
    if (index !== -1) {
      mergedData[index] = productToStore;
    } else {
      mergedData.push(productToStore);
    }
  });

  // Save the merged data back to cookies
  cookieStore.set({
    name: 'cartProducts',
    value: JSON.stringify(mergedData),
    httpOnly: true,
    path: '/',
  });

  
}

export async function getCartDataFromCookies() {
  const cookieStore = cookies();
  const existingDataCookie = cookieStore.get('cartProducts');
  const existingData = existingDataCookie ? JSON.parse(existingDataCookie.value) : [];
  return existingData;

console.log("this is the existing data cookie", existingData);
}