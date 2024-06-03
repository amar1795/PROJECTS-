import { createProduct } from "../createProduct";

interface ProductParams {
    productName: string;
    productPrice: number;
    productDiscountPercentage: number;
    productDescription: string;
    productImages: string[];
    productCategoryId: string;
    productBrandId: string;
}
const productParams: ProductParams = {
    productName: "Active Performance Shorts: Lightweight Versatility for Active Lifestyles",
    productPrice: 2150.00,
    productBrandId: "665ac7545788e185779d7ccf",
    productCategoryId: "665a0ba214be77720636d44b",
    productDiscountPercentage: 55,
    productDescription: "Stay active in style with our Active Performance Shorts, offering lightweight versatility for active lifestyles. These shorts feature moisture-wicking fabric and four-way stretch for maximum comfort and mobility during workouts or outdoor activities. The elastic waistband with drawstring closure ensures a secure fit, while the breathable mesh panels provide enhanced ventilation. Whether running, cycling, or hitting the gym, these performance shorts keep you cool and comfortable all day long.",
    productImages: [
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717061940/Men%20shorts/51t9NeRp8DL._SX679__afxtg8.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717061941/Men%20shorts/51wz6KwTRZL._SX679__hs36e8.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717061944/Men%20shorts/61mBsUSEFRL._SX679__c7jenz.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717061943/Men%20shorts/61LdHDL5dFL._SX679__pcru0j.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717061943/Men%20shorts/61LdHDL5dFL._SX679__pcru0j.jpg",
          
           
    ]
};

export async function productCreationNew() {
    createProduct(productParams);
}


