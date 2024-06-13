interface Product {
    id: string;
    cartQuantity: number;
    price: number;
}

interface OrderData {
    userId: string;
    address: string;
    phone: string;
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

export function prepareOrderData(userId: string, products: Product[], address: string, phone: string, paymentMode: string, cardId?: string, walletId?: string): OrderData {
    const orderItems = products.map(product => ({
        productId: product.id,
        quantity: product.cartQuantity,
        price: product.price,
    }));

    return {
        userId,
        products: orderItems,
        address,
        phone,
        paymentMode,
        cardId,
        walletId,
    };
}