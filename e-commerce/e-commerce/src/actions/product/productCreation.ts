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
    productName: "Women's Tennis Sneakers: Supreme Comfort and Stability for Court Dominance",
    productPrice: 15000.00,
    productBrandId: "665ac7555788e185779d7cda",
    productCategoryId: "665d9c7afa508b3a3946316f",
    productDiscountPercentage: 65,
    productDescription: "Step onto the court with confidence in our Women's Tennis Sneakers, meticulously crafted to provide supreme comfort and stability for your game. These sneakers feature a sleek and supportive design tailored for the unique needs of female tennis players. With a durable rubber outsole optimized for traction on hard courts, they offer exceptional grip and agility for quick movements and rapid direction changes. The cushioned midsole and padded collar ensure plush comfort and ankle support, reducing fatigue during long matches. Whether you're serving aces or chasing down volleys, these tennis sneakers empower you to unleash your full potential and dominate the game with style and grace",
    productImages: [
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717066610/Women/Women%20shoes/sneakers/51JYQ9RKwHL._SY695__ngpumc.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717066612/Women/Women%20shoes/sneakers/61i5mkDZlXL._SY695__rwmyxq.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717066615/Women/Women%20shoes/sneakers/61Pq1Krdv8L._SY695__g9sznw.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717066620/Women/Women%20shoes/sneakers/61SIgt3zYjL._SY695__ln1ltx.jpg",        
               
              
                
    ]
};

export async function productCreationNew() {
    createProduct(productParams);
}


