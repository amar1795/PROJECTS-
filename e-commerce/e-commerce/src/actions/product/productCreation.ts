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
    productName: " Premier Chelsea Boots: Effortless Style for the Modern Gentleman",
    productPrice: 1200.00,
    productBrandId: "665ac7555788e185779d7cdd",
    productCategoryId: "665b0bc53220eba7c7eabae6",
    productDiscountPercentage: 10,
    productDescription: "Step up your footwear game with our Premier Chelsea Boots, the epitome of effortless style for the modern gentleman. Crafted from luxurious leather and featuring a sleek Chelsea boot silhouette, these shoes exude sophistication and versatility. Whether paired with tailored trousers or casual denim, these boots add a touch of refinement to any ensemble, making them a must-have addition to your formal footwear collection.",
    productImages: [
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717063847/men%20formal%20shoes/61Fi43cx7FL._SY695__blqzl9.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717063844/men%20formal%20shoes/51z1OuzEleL._SY695__elo1al.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717063843/men%20formal%20shoes/51dwtNdY8HL._SY695__e4yqz2.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717063841/men%20formal%20shoes/51CHcDhQWqL._SY695__ldsm8o.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717063843/men%20formal%20shoes/51dwtNdY8HL._SY695__e4yqz2.jpg",
       
    ]
};

export async function productCreationNew() {
    createProduct(productParams);
}


