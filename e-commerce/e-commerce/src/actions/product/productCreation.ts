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
    productName: "Metropolitan Chic Mens Formal Shirt",
    productPrice: 7250.00,
    productBrandId: "665ac7545788e185779d7ccf",
    productCategoryId: "665a0ba114be77720636d449",
    productDiscountPercentage: 15,
    productDescription: "Add a modern twist to your formal wear with our Metropolitan Chic shirt. The striking checkered pattern sets you apart in a sea of solids, while the soft cotton blend ensures maximum comfort. Featuring a spread collar, French placket, and barrel cuffs, this shirt is both stylish and functional. Whether you're attending a business meeting or a dinner date, it’s the perfect choice for a smart, contemporary look.",
    productImages: [
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717062509/formal%20men%20shirts/51UFaB6QWRL._SY741__odf0ii.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717062508/formal%20men%20shirts/51Ue-jSTByL._SY741__qd16gu.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717062271/formal%20men%20shirts/51nt-mODT0L._SY741__ehgbmj.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717062271/formal%20men%20shirts/51cjfaDYRSL._SY741__rr4foj.jpg",
        "https://res.cloudinary.com/dfveswqdm/image/upload/v1717062315/formal%20men%20shirts/51Pme4pjlbL._SY741__luepoa.jpg"
    ]
};

export async function productCreationNew() {
    createProduct(productParams);
}


