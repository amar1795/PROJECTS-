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
    productName: " Peppa Paradise Kids' Flip Flops: Splash into Fun with Peppa Pig",
    productPrice: 8000.00,
    productBrandId: "665ac7555788e185779d7cdc",
    productCategoryId: "665df2e246b36eef0288e432",
    productDiscountPercentage: 22,
    productDescription: "Let your little one splash into fun with our Peppa Paradise Kids' Flip Flops, featuring adorable Peppa Pig prints that are sure to bring a smile to their face. These cute flip flops showcase colorful graphics of Peppa and her friends, adding a playful touch to their summer style. Made from lightweight and durable material, they offer comfort and support for all-day wear. The textured footbed and non-slip sole provide traction and stability on wet surfaces, while the easy slip-on style makes them convenient for kids to wear. Whether they're playing at the beach or lounging by the pool, these Peppa Pig flip flops will keep their feet happy and stylish all summer long.",
    productImages: [
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067048/Kids/Shoes/flip%20flops/71RV8sA0ENL._SY695__pakioo.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067036/Kids/Shoes/flip%20flops/71cipHN864L._SY695__sbvjc1.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067052/Kids/Shoes/flip%20flops/71UAU-7r7kL._SY695__r6vvkm.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067045/Kids/Shoes/flip%20flops/71nsWDY7RRL._SY695__q531cq.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067023/Kids/Shoes/flip%20flops/61sAsaIrHZL._SY695__xbd4c8.jpg",

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

