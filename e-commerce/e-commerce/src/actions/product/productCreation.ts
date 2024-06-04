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
    productName: "Sunshine Splash Kids' Orange Flip Flops: Brighten Their Day with Every Step",
    productPrice: 3000.00,
    productBrandId: "665ac7555788e185779d7cdc",
    productCategoryId: "665df2e246b36eef0288e432",
    productDiscountPercentage: 12,
    productDescription: "Bring a burst of sunshine to your child's summer wardrobe with our Sunshine Splash Kids' Orange Flip Flops, perfect for adding a pop of color to their beach or poolside adventures. These vibrant orange flip flops feature a playful design that's sure to put a smile on their face. Made from lightweight and durable material, they offer comfort and support for active little feet. The textured footbed and non-slip sole provide traction and stability on wet surfaces, while the easy slip-on style makes them convenient for kids to wear. Whether they're splashing in the waves or building sandcastles on the shore, these orange flip flops will keep their feet happy and stylish all summer long.",
    productImages: [
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067060/Kids/Shoes/flip%20flops/71XI0CNWFkL._SY695__byvhxq.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067066/Kids/Shoes/flip%20flops/512gSJB4sBL._SY695__jdzqnc.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067011/Kids/Shoes/flip%20flops/61iLpOVh5KL._SY695__jf3c7r.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717066986/Kids/Shoes/flip%20flops/51YNUUnVkmL._SY695__k2opfu.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067014/Kids/Shoes/flip%20flops/61kiqXB0nxL._SY695__jdsknv.jpg",
      
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

