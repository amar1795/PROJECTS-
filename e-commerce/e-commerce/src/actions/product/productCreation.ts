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
    productName: "Bootcut Jeans: Classic Fit with a Modern Twist",
    productPrice: 2500.00,
    productBrandId: "665ac7545788e185779d7cce",
    productCategoryId: "665df25d46b36eef0288e42c",
    productDiscountPercentage: 20,
    productDescription: "Give your boy a classic yet contemporary look with our Bootcut Jeans. These jeans feature a slight flare at the bottom, perfect for wearing over boots or sneakers. The comfortable fit and sturdy denim fabric ensure durability and ease of wear. With a timeless design and modern twist, these bootcut jeans are versatile enough for both casual and dressy occasions.",
    productImages: [
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717150602/Kids/male%20kids/jeans/51F7hIxenXL._SX679__fj8a4i.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717150601/Kids/male%20kids/jeans/51eU4NK1hcL._SX679__bxuw1z.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717150598/Kids/male%20kids/jeans/41b7FdGiJJL._SX679__favo2r.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717150601/Kids/male%20kids/jeans/51eU4NK1hcL._SX679__bxuw1z.jpg",
        
                         
    ]
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

