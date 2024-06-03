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
    productName: "Modern Fit Chambray Shirt: Sophisticated Casual Wear for the Contemporary Man",
    productPrice: 2700.00,
    productBrandId: "665ac7545788e185779d7cce",
    productCategoryId: "665a0ba214be77720636d44c",
    productDiscountPercentage: 15,
    productDescription: "Elevate your casual style with our Modern Fit Chambray Shirt, designed for the contemporary man. This sophisticated shirt features a modern fit, a button-down collar, and a single chest pocket, offering a clean and polished look. The lightweight chambray fabric provides comfort and breathability, making it ideal for both casual and semi-formal occasions. Pair it with chinos or denim for a versatile, stylish ensemble.",
    productImages: [
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717061624/Men%20Shirts/71_vI95v4L._SY741__bolvnk.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717061624/Men%20Shirts/61Uf-CVdGYL._SY741__pul2bs.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717061623/Men%20Shirts/61PB3NlD7XL._SY741__dpynhs.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717061624/Men%20Shirts/61xCZ3kHKFL._SY741__uwe3nt.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717061622/Men%20Shirts/61_3s3sYTWL._SY741__nvgjwo.jpg",
       
           
    ]
};

export async function productCreationNew() {
    createProduct(productParams);
}


