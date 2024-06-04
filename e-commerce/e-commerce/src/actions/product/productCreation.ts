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
    productName: "SportStar Kids' Black School Shoes: Built for Tough Play and Everyday Wear",
    productPrice: 7000.00,
    productBrandId: "665ac7545788e185779d7ccf",
    productCategoryId: "665df2e246b36eef0288e434",
    productDiscountPercentage: 35,
    productDescription: "Equip your child with the SportStar Kids' Black School Shoes, specifically designed for sports and rough play while maintaining a sleek school-ready look. These versatile black shoes combine the durability needed for active kids with the comfort required for long school days. Constructed from high-quality, rugged materials, they are built to withstand the demands of sports and playground activities. The reinforced toe cap and sturdy outsole provide extra protection and traction, ensuring stability on various surfaces. With a cushioned insole and breathable lining, these shoes offer all-day comfort and support. The secure lace-up or Velcro closure ensures a snug fit, making them the perfect choice for kids who need both toughness and versatility in their school footwear.",
    productImages: [
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717068088/Kids/Shoes/school%20shoes/61rJeA8knwL._SY695__v43iyw.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717068071/Kids/Shoes/school%20shoes/61EInMRCg8L._SY695__otj4vm.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717068060/Kids/Shoes/school%20shoes/51RX59DqxoL._SY695__zwqkyh.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717068053/Kids/Shoes/school%20shoes/51GKXw07rHL._SY695__ahuyo5.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717068053/Kids/Shoes/school%20shoes/51GKXw07rHL._SY695__ahuyo5.jpg",

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

