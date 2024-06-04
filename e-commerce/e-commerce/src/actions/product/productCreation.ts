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
    productName: "GlidePro Kids' Black Skating Sneakers: Style Meets Performance",
    productPrice: 4500.00,
    productBrandId: "665ac7545788e185779d7ccf",
    productCategoryId: "665df2e246b36eef0288e435",
    productDiscountPercentage: 15,
    productDescription: "Elevate your child's style and performance with our GlidePro Kids' Black Skating Sneakers, perfect for both skating and everyday fashion. These sleek black sneakers feature a stylish design that complements any outfit, making them ideal for kids who love to skate and look trendy. Crafted from high-quality, durable materials, they provide the necessary support and flexibility for skating, while the reinforced toe cap and sturdy outsole offer excellent protection and grip on various surfaces. The cushioned insole ensures all-day comfort, whether they're at the skate park or hanging out with friends. With a secure lace-up closure, these sneakers provide a snug and adjustable fit, making them the perfect choice for kids who need both functionality and fashion in their footwear.",

    productImages: [
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067318/Kids/Shoes/sneakers/617zBq7mtbL._SY695__hlujso.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067294/Kids/Shoes/sneakers/71Tf5On2KKL._SY695__grvjxa.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067261/Kids/Shoes/sneakers/61vP01idCTL._SY695__hywesz.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067247/Kids/Shoes/sneakers/61r0GIzvYcL._SY695__g64hjb.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067231/Kids/Shoes/sneakers/51NjecHp7rL._SY695__pfttcx.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067222/Kids/Shoes/sneakers/51DKgisn5XL._SY695__wyht1e.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717067219/Kids/Shoes/sneakers/51AgTBc9zcL._SY695__la5isz.jpg",

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

