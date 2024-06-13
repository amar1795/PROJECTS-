interface Product {
  id: string;
  cartQuantity: number;
  price: number;
}

interface OrderData {
  userId: string;
  addressID: string;
  paymentMode: string;
  cardId?: string;
  walletId?: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}

// this function will sort and prepare the order data and take only the required fields

export function prepareOrderData(
  userId: string,
  products: Product[],
  addressID: string,
  paymentMode: string,
  cardId?: string,
  walletId?: string
): OrderData {
  const orderItems = products.map((product) => ({
    productId: product.id,
    quantity: product.cartQuantity,
    price: product.price,
  }));


//   console.log('Order data prepared successfully', orderItems);
  return {
    userId,
    products: orderItems,
    addressID,
    paymentMode,
    cardId,
    walletId,
  };
}
