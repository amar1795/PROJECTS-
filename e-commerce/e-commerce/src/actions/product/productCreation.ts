import { createProduct, createProductReview } from "../createProduct";
import { prismadb } from "@/lib/db";

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
    productName: "Ocean Breeze Kids' Blue Crocs-Style Sandals: Dive into Comfort and Style",
    productPrice: 9500.00,
    productBrandId: "665ac7555788e185779d7cdb",
    productCategoryId: "665df2e246b36eef0288e433",
    productDiscountPercentage: 35,
    productDescription: "Dive into comfort and style with our Ocean Breeze Kids' Blue Crocs-Style Sandals, designed for young adventurers who love to make a splash. These vibrant blue sandals feature a Crocs-inspired design with rectangular perforations along the upper, adding a playful touch to their look. Made from lightweight and durable material, they offer all-day comfort and support for active little feet. The adjustable strap ensures a secure fit, while the textured footbed provides traction and stability on various surfaces. Whether they're exploring tide pools or playing in the backyard, these blue Crocs-like sandals will keep their feet happy and stylish on every adventure.",
    productImages: [
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067102/Kids/Shoes/sandals/51OhRzDUlLL._SY695__wwzgli.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067106/Kids/Shoes/sandals/51TRTbR1-6L._SY695__rz1bbq.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067111/Kids/Shoes/sandals/61DoprqdwnL._SY695__air4zy.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067097/Kids/Shoes/sandals/51JRkKyn7RL._SY695__lkldut.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067100/Kids/Shoes/sandals/51mi_CjhkXL._SY695__bnxjun.jpg", ]
};

export async function productCreationNew() {
    createProduct(productParams);
}


// creating product reviews for all the items for a specfic category , need to optimse this function as well later 
export async function productReviewCreation() {
    try {
        const products = await prismadb.product.findMany({
            where: {
                category: {
                    // Filter by category name
                    name: "shoes",
                    // Filter by parent category name
                    parent: {
                        name: "men"
                    }
                }
            },
            include: {
                category: true
            }
        });
        
        // Loop over the products and extract their IDs
        for (const product of products) {
            const productId = product.id;
            // Perform any operations you need with the product ID
            // For example, pass it to createProductReview function
            await createProductReview(productId);
        }
        
        console.log("Product reviews created successfully!");
    } catch (error) {
        console.error("Error creating product reviews:", error);
    } finally {
        await prismadb.$disconnect();
    }
}

