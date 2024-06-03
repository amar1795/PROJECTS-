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
    productName: "Sporty Utility yellow Jumpsuit: Functional Style and Comfort for Active Days",
    productPrice: 6000.00,
    productBrandId: "665ac7545788e185779d7cd3",
    productCategoryId: "665d9bf1fa508b3a39463163",
    productDiscountPercentage: 45,
    productDescription: "Stay stylish and comfortable on active days with our Sporty Utility Jumpsuit, designed for functionality and modern style. This jumpsuit features a zip-front closure, adjustable waist, and multiple pockets for convenience. Made from durable, breathable fabric, it provides comfort and ease of movement. Ideal for running errands, travel, or casual outdoor activities, this jumpsuit pairs well with sneakers or casual footwear for a sporty, on-the-go look.",
    productImages: [
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717150052/Women/jumpsuits/51vyMrGe7TL._SY741__oxwine.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717150052/Women/jumpsuits/61r2Rwcn2mL._SY741__xuaq0e.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717150051/Women/jumpsuits/51V6F1p-9EL._SY741__m8dg8v.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717150051/Women/jumpsuits/51AWA5Rsp-L._SY741__jyt8sl.jpg",         
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717150054/Women/jumpsuits/71ft77gZO7L._SY741__lxn2al.jpg",         
        
    ]
};

export async function productCreationNew() {
    createProduct(productParams);
}


