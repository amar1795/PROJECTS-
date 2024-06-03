"use server";
// pages/api/createDummyUsers.js
import { faker } from "@faker-js/faker";
import { prismadb } from "@/lib/db";
import { NextResponse } from "next/server";
interface ProductParams {
    productName: string;
    productPrice: number;
    productDiscountPercentage: number;
    productDescription: string;
    productImages: string[];
    productCategoryId: string;
    productBrandId: string;
}
export async function createProduct({
    productName,
    productPrice,
    productDiscountPercentage,
    productDescription,
    productImages,
    productCategoryId,
    productBrandId
}: ProductParams) {
  try {
    const price = productPrice; // Original price of the product
const discountPercentage = productDiscountPercentage; // Discount percentage (e.g., 10% off)

// Calculate the discount amount
const discountAmount = (price * discountPercentage) / 100;

// Calculate the discounted price
const discountedPrice = price - discountAmount;
    const formalShirt = await prismadb.product.create({
      data: {
        name: productName,
        price: price,
        discount: discountPercentage, // Discount amount in currency (e.g., $10 off)
        discountedPrice:discountedPrice, // Discounted price after applying the discount
        brandId: productBrandId, // Replace with the actual Brand ID
        description: productDescription,
        categoryId:productCategoryId, // Replace with actual Formal Shirts Category ID
        images: {
            create: productImages.map(image => ({
              url: image
            }))
          },
      },
    });
    console.log("Product created:", formalShirt);
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

export async function createProductVarient() {
    try {
        const formalShirtVariants = await prismadb.productVariant.createMany({
            data: [
              { 
                
                productId: "665af50e3220eba7c7eab944", 
                colorId: "66570726617228492bfcb586", 
                sizeId: "665aca6e5788e185779d7ce6", 
                stock: 10 
              },
              { 
                
                productId: "665af50e3220eba7c7eab944", 
                colorId: "66570726617228492bfcb586", 
                sizeId: "665aca6e5788e185779d7ce7", 
                stock: 12 
              },
              { 
                
                productId: "665af50e3220eba7c7eab944", 
                colorId: "66570726617228492bfcb586", 
                sizeId: "665aca6e5788e185779d7ce8", 
                stock: 15 
              },
              { 
                
                productId: "665af50e3220eba7c7eab944", 
                colorId: "66570726617228492bfcb588", 
                sizeId: "665aca6e5788e185779d7ce6", 
                stock: 17 
              },
              { 
                
                productId: "665af50e3220eba7c7eab944", 
                colorId: "66570726617228492bfcb588", 
                sizeId: "665aca6e5788e185779d7ce7", 
                stock: 10 
              },{ 
                
                productId: "665af50e3220eba7c7eab944", 
                colorId: "66570726617228492bfcb588", 
                sizeId: "665aca6e5788e185779d7ce8", 
                stock: 10 
              },{ 
                
                productId: "665af50e3220eba7c7eab944", 
                colorId: "66570726617228492bfcb589", 
                sizeId: "665aca6e5788e185779d7ce6", 
                stock: 10 
              },{ 
                
                productId: "665af50e3220eba7c7eab944", 
                colorId: "66570726617228492bfcb589", 
                sizeId: "665aca6e5788e185779d7ce7", 
                stock: 10 
              },{ 
                
                productId: "665af50e3220eba7c7eab944", 
                colorId: "66570726617228492bfcb589", 
                sizeId: "665aca6e5788e185779d7ce8", 
                stock: 10 
              },{ 
                
                productId: "665af50e3220eba7c7eab944", 
                colorId: "66570726617228492bfcb58a", 
                sizeId: "665aca6e5788e185779d7ce6", 
                stock: 10 
              },{ 
                
                productId: "665af50e3220eba7c7eab944", 
                colorId: "66570726617228492bfcb58a", 
                sizeId: "665aca6e5788e185779d7ce7", 
                stock: 10 
              },{ 
                
                productId: "665af50e3220eba7c7eab944", 
                colorId: "66570726617228492bfcb58a", 
                sizeId: "665aca6e5788e185779d7ce8", 
                stock: 10 
              },
                            
            ],
          });
          
          console.log("Product variants created:", formalShirtVariants);
    } catch (error) {
        console.error("Error creating product variant:", error);
    }
}

export async function createProductRating() {
    try {
        
        const productId = "665af50e3220eba7c7eab944"; // Replace with the actual product ID
const userId = "6655adcc05f2665c9bc85c1a"; // Replace with the actual User ID

// Create 75 five-star ratings without reviews
for (let i = 0; i < 90; i++) {
  await prismadb.rating.create({
    data: {
      productId: productId,
      rating: 5,
      userId: userId,
    },
  });
}

// Create 15 four-star ratings without reviews
for (let i = 0; i < 85; i++) {
  await prismadb.rating.create({
    data: {
      productId: productId,
      rating: 4,
      userId: userId,
    },
  });
}

// Create 5 three-star ratings without reviews
for (let i = 0; i < 15; i++) {
  await prismadb.rating.create({
    data: {
      productId: productId,
      rating: 3,
      userId: userId,
    },
  });
}

// Create 4 two-star ratings without reviews
for (let i = 0; i < 14; i++) {
  await prismadb.rating.create({
    data: {
      productId: productId,
      rating: 2,
      userId: userId,
    },
  });
}

// Create 1 one-star rating without review
await prismadb.rating.create({
  data: {
    productId: productId,
    rating: 1,
    userId: userId,
  },
});

    } catch (error) {
        
    }
}
export async function createProductReview() {
    try {
        
        const productId = "665af50e3220eba7c7eab944"; // Replace with the actual product ID
const userId = "6655adcc05f2665c9bc85c1a";
        // Define arrays of different reviews for each star rating
const fiveStarReviews = [
  "This product exceeded my expectations! Amazing quality and fit.",
  "Absolutely love this shirt! Great fabric and comfortable to wear.",
  "Excellent purchase! Exactly what I was looking for.",
  "Highly recommend this shirt. It looks even better in person!",
  "Couldn't be happier with my purchase. Will definitely buy again.",
];

const fourStarReviews = [
  "Overall satisfied with the product, although the sizing runs a bit large.",
  "Good quality shirt, but the color is slightly different from the picture.",
  "Nice design and comfortable to wear, but the fabric is thinner than expected.",
  "Decent shirt for the price, but the stitching could be better.",
  "Happy with the purchase, but delivery took longer than anticipated.",
];

const threeStarReviews = [
  "Average shirt. Not exceptional, but not terrible either.",
  "Expected better quality for the price. It's just okay.",
  "The shirt arrived with a small stain, which was disappointing.",
  "Meh. Nothing special about this shirt.",
  "The fit is okay, but the material feels cheap.",
];

const twoStarReviews = [
  "Not impressed. Shirt started to fade after just a few washes.",
  "Poor quality. Seams started coming apart after wearing it twice.",
  "Disappointed with the sizing. It runs much smaller than expected.",
  "Shirt arrived damaged. Looks like it was poorly packaged.",
  "Would not recommend. Better off spending a bit more for better quality.",
];

const oneStarReview = [
    "Absolutely terrible! The shirt arrived with holes in it.",
    "Complete waste of money. The fabric feels like sandpaper.",
    "Zero stars if I could! The color faded after just one wash.",
    "Horrible quality. It shrunk two sizes after washing.",
    "I wouldn't even use this shirt as a rag. It's that bad.",
    "Avoid at all costs! The stitching unraveled after wearing it once.",
  ];
// Create 75 five-star ratings with random reviews
for (let i = 0; i < 55; i++) {
  const randomReview = fiveStarReviews[Math.floor(Math.random() * fiveStarReviews.length)];
  await prismadb.rating.create({
    data: {
      productId: productId,
      rating: 5,
      review: randomReview,
      userId: userId, // Replace userId with the actual User ID
    },
  });
}

// Create 15 four-star ratings with random reviews
for (let i = 0; i < 45; i++) {
  const randomReview = fourStarReviews[Math.floor(Math.random() * fourStarReviews.length)];
  await prismadb.rating.create({
    data: {
      productId: productId,
      rating: 4,
      review: randomReview,
      userId: userId, // Replace userId with the actual User ID
    },
  });
}

// Create 5 three-star ratings with random reviews
for (let i = 0; i < 15; i++) {
  const randomReview = threeStarReviews[Math.floor(Math.random() * threeStarReviews.length)];
  await prismadb.rating.create({
    data: {
      productId: productId,
      rating: 3,
      review: randomReview,
      userId: userId, // Replace userId with the actual User ID
    },
  });
}

// Create 4 two-star ratings with random reviews
for (let i = 0; i < 10; i++) {
  const randomReview = twoStarReviews[Math.floor(Math.random() * twoStarReviews.length)];
  await prismadb.rating.create({
    data: {
      productId: productId,
      rating: 2,
      review: randomReview,
      userId: userId, // Replace userId with the actual User ID
    },
  });
}

// Create 1 one-star rating with fixed review
for (let i = 0; i < 20; i++) {
    const randomReview = twoStarReviews[Math.floor(Math.random() * oneStarReview.length)];
    await prismadb.rating.create({
      data: {
        productId: productId,
        rating: 1,
        review: randomReview,
        userId: userId, // Replace userId with the actual User ID
      },
    });
  }
        
  console.log("Product reviews created");

    } catch (error) {
        console.error("Error creating product reviews:", error);
    }
}

export async function fetchProduct() {
    const product = await prismadb.product.findUnique({
        where: {
          id: "665ac95e5788e185779d7ce0",
        },
        include: {
            category: true, // Include the category
            brand: true, // Include the brand
            images: true, // Include the images
            
          productVariants: {
            include: {
              color: true,
              size: true,
            },
          },
         
        },
      });
      console.log("Product:", product);
      product?.productVariants.forEach(variant => {
        // Accessing color and size properties directly
        const color = variant.color.name; // Assuming 'name' is the property containing the color name
        const size = variant.size.name; // Assuming 'name' is the property containing the size name
      
        console.log("Color:", color);
        console.log("Size:", size);});

        const category = await prismadb.category.findUnique({
            where: {
              id: product?.categoryId,
            },
          });
        
          // Access category name
          const categoryName = category?.name;
        
          console.log("Category:", categoryName);    
}

export async function fetchAllReviews() {
    
    try {
        // Fetch reviews for the product
        const reviews = await prismadb.rating.findMany({
          where: {
            productId: "665ac95e5788e185779d7ce0",
            review: {
                not: null, // Filter out reviews that are null
              },
          },
        });
    
        // Initialize an object to store counts for each rating
        const ratingCounts = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        };
    
        // Loop through reviews and increment counts for each rating
        reviews.forEach(review => {
          ratingCounts[review.rating]++;
        });
    
        // Log the rating counts
        console.log("Rating Counts:", ratingCounts);
    
        // Log the reviews
        console.log("Reviews:");
        reviews.forEach(review => {
          console.log(`Rating: ${review.rating}, Review: ${review.review}`);
        });
      } catch (error) {
        console.error("Error fetching product reviews:", error);
      }
}

export async function fetchProductAllData() {
    // Fetch the product with its category, brand, images, and product variants
    const product = await prismadb.product.findUnique({
      where: {
        id: "665af50e3220eba7c7eab944",
      },
      include: {
        category: true, // Include the category
        brand: true, // Include the brand
        images: true, // Include the images
        productVariants: {
          include: {
            color: true,
            size: true,
          },
        },
        ratings: true, // Include the ratings
      },
    });
  
    if (!product) {
      console.log("Product not found");
      return;
    }
  
    // Format the productVariants to include color and size names directly
    const formattedProductVariants = product.productVariants.map((variant) => ({
      id: variant.id,
      color: variant.color.name, // Assuming 'name' is the property containing the color name
      size: variant.size.name, // Assuming 'name' is the property containing the size name
      stock: variant.stock,
      createdAt: variant.createdAt,
      updatedAt: variant.updatedAt,
    }));
  
    // Format the ratings
    const ratingsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const reviews = [];
  
    product.ratings.forEach((rating) => {
      if (rating.review) {
        reviews.push({
          rating: rating.rating,
          review: rating.review,
        });
      }
      ratingsCount[rating.rating] = (ratingsCount[rating.rating] || 0) + 1;
    });
  
    // Organize the final product data
    const organizedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      discountedPrice: product.discountedPrice,
      description: product.description,
      category: {
        id: product.category.id,
        name: product.category.name,
      },
      brand: {
        id: product.brand.id,
        name: product.brand.name,
      },
      images: product.images.map(image => ({
        id: image.id,
        url: image.url,
      })),
      productVariants: formattedProductVariants,
      ratings: {
        count: ratingsCount,
        reviews: reviews,
      },
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  
    console.dir(organizedProduct, { depth: null });
    return organizedProduct;
}
  