"use server"
// pages/api/createDummyUsers.js
import { faker } from '@faker-js/faker';
import { prismadb } from "@/lib/db";
import { NextResponse } from 'next/server';
import { count } from 'console';



export async function fetchImagesByProductId(productId: string) {
  try {
    const images = await prismadb.image.findMany({
      where: {
        productId: productId,
      },
      select: {
        id: true,
        url: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    console.log("Images fetched:", images);
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}

export async function createdummyPosterFunction() {
    try {
        const dummyUsers = [];

        const labels = [         
            { label: 'jeans', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717401135/Women/tops/pexels-ono-kosuki-6000143_v7rosq.jpg' },
            { label: 'jumpsuits', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717401135/Women/tops/pexels-ono-kosuki-6000143_v7rosq.jpg' },
            { label: 'jewellery', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717401135/Women/tops/pexels-ono-kosuki-6000143_v7rosq.jpg' },
            { label: 'Kurtis', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717401135/Women/tops/pexels-ono-kosuki-6000143_v7rosq.jpg' },
            { label: 'Sportswear', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717401135/Women/tops/pexels-ono-kosuki-6000143_v7rosq.jpg' },
            { label: 'Tops', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717401135/Women/tops/pexels-ono-kosuki-6000143_v7rosq.jpg' },
            { label: 'Watches', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717401135/Women/tops/pexels-ono-kosuki-6000143_v7rosq.jpg' },
           
            
        ];
        for (const item of labels) {
           const label= await prismadb.poster.create({
                data: {
                    label: item.label,
                    imageUrl: item.imageUrl
                }
            });
            dummyUsers.push(label);
        }

        console.error("successfully created dummy posters",dummyUsers);

    } catch (error) {
        console.error('Error creating dummy users:', error);
    }
}

export async function getAllDummyPosters() {
    try {
        const dummyPosters = await prismadb.poster.findMany();
        console.log("Retrieved dummy posters:", dummyPosters);
        return dummyPosters;
    } catch (error) {
        console.error("Error retrieving dummy posters:", error);
        throw error;
    }
}

export async function getAllUsers() {
  try {
    const users = await prismadb.user.findMany();
    const count = await prismadb.user.count();
    console.log("successfully retrieved users",users, "and user count is ",count);
    return users;
    
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
    
  }
}


export async function getAllPosters() {
    try {
        const posters = await prismadb.poster.findMany();
        console.log("successfully retrieved posters",posters);
        return posters;
    } catch (error) {
        console.error('Error retrieving posters:', error);
        throw error;
    }
}



export async function CreateColour() {
    try {
        const colours = [];

        const labels = [
            { name: 'White', value: 'FFFFFF' },
           
        ];

        for (const item of labels) {
           const label= await prismadb.color.create({
                data: {
                    name: item.name,
                    value: item.value
                }
            });
            colours.push(label);
        }

        console.error("successfully created colours",colours);

    }
     catch (error) {
        console.error('Error retrieving posters:', error);
        throw error;
    }
}

export async function getAllColorsWithCount() {
  
    try {
      const colors = await prismadb.color.findMany();
      const colorCount = await prismadb.color.count();
      console.log("successfully retrieved colors",colors, "and color count is ",colorCount);
      return { colors, count: colorCount };
    } catch (error) {
      console.error('Error fetching colors:', error);
      throw error;
    } finally {
      await prismadb.$disconnect();
    }
  }


export async function CreateSize() {
    try {
        const sizes = [];
        
        const sizeLabels = [
           
          
        
            { name: 'UK Size 3', value: '3', category: 'shoes' },
            { name: 'UK Size 4', value: '4', category: 'shoes' },
            { name: 'UK Size 5', value: '5', category: 'shoes' },
            { name: 'UK Size 6', value: '6', category: 'shoes' },
            { name: 'UK Size 7', value: '7', category: 'shoes' },
            { name: 'UK Size 8', value: '8', category: 'shoes' },
            { name: 'UK Size 9', value: '9', category: 'shoes' },
            { name: 'UK Size 10', value: '10', category: 'shoes' },
            { name: 'UK Size 11', value: '11', category: 'shoes' },
            { name: 'UK Size 12', value: '12', category: 'shoes' }
        ];

        for (const item of sizeLabels) {
            const size = await prismadb.size.create({
                data: {
                    name: item.name,
                    value: item.value,
                    category: item.category,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
            sizes.push(size);
        }

        console.log("successfully created sizes", sizes);
    } catch (error) {
        console.error('Error creating sizes:', error);
        throw error;
    }
}
export async function getAllSizes() {
  
    try {
      const sizes = await prismadb.size.findMany();
      const sizeCount = await prismadb.size.count();

      console.log("successfully retrieved sizes",sizes, "and size count is ",sizeCount);
      return sizes;
    } catch (error) {
      console.error('Error fetching sizes:', error);
      throw error;
    } finally {
      await prismadb.$disconnect();
    }
  }


export async function CreateBrand() {
    try {
        const brands = [];
        
        const brandLabels = [
            // Men's fashion brands
            { name: 'Louis Vuitton' },
            { name: 'Gucci' },
            { name: 'Prada' },
            { name: 'Hugo Boss' },
            { name: 'Burberry' },
            // Women's fashion brands
            { name: 'Chanel' },
            { name: 'Dior' },
            { name: 'Versace' },
            { name: 'Ralph Lauren' },
            { name: 'Valentino' },
            // Kids' fashion brands
            { name: 'Carter’s' },
            { name: 'OshKosh B’gosh' },
            { name: 'Gap Kids' },
            { name: 'Gymboree' },
            { name: 'The Children’s Place' },
            // Shoe brands
            { name: 'Nike' },
            { name: 'Adidas' },
            { name: 'Puma' },
            { name: 'Reebok' },
            { name: 'New Balance' }
        ];

        for (const item of brandLabels) {
            const brand = await prismadb.brand.create({
                data: {
                    name: item.name,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
            brands.push(brand);
        }

        console.log("successfully created brands", brands);
    } catch (error) {
        console.error('Error creating brands:', error);
        throw error;
    }
}

export async function getBrand() {
    try {
        
        const brand = await prismadb.brand.findMany();
        const sizeCount = await prismadb.brand.count();

        console.log("successfully created brands", brand,"size count is ",sizeCount);
    } catch (error) {
        console.error('Error creating brands:', error);
        throw error;
    }
}
  

export async function Createposter() {
    try {
        const colours = [];

        const labels = [
            { label: 'Formal Shoes Poster', imageurl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717063879/men%20formal%20shoes/613eE6rOzIL._SY695__sqxzff.jpg'},
            { label: 'Casual Shoes Poster', imageurl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717064199/men%20casual%20shoes/618nLT5fkPL._SY695__aeh2xn.jpg' },
            { label: 'Sandals Poster', imageurl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717064440/mens%20sandals/71ROtdsVW8L._SX695__jzxw1k.jpg'},                   
        ];

        for (const item of labels) {
           const label= await prismadb.poster.create({
                data: {
                  label: item.label,
                  imageUrl: item.imageurl,
                }
            });
            colours.push(label);
        }

        console.error("successfully created posters",colours);

    }
     catch (error) {
        console.error('Error retrieving posters:', error);
        throw error;
    }
}

export async function fetchCategoriesWithPosters() {
    try {
      const categories = await prismadb.category.findMany({
        include: {
          Poster: {
            select: {
              label: true,
              imageUrl: true,
            },
          },
        },
      });
  
      console.log("this is the linkedposterwith categories", categories);
    } catch (error) {
      console.error(error);
    } 
  }
  export async function getallCategory() {
    try {
      const categories = await prismadb.category.findMany();
  
      console.log("this is the linkedposterwith categories", categories);
    } catch (error) {
      console.error(error);
    } 
  }
     
  export async function deleteSize() {
    try {
        // Delete all sizes
        await prismadb.size.deleteMany();
    
        console.log("All sizes deleted successfully.");
      } catch (error) {
        console.error("Error deleting sizes:", error);
    } 
  }     
  export async function deleteduplicatebrandnames() {
    try {
        // Delete all sizes
        await prismadb.brand.deleteMany();
    
        console.log("All sizes deleted successfully.");
      } catch (error) {
        console.error("Error deleting sizes:", error);
    } 
  }





 export async function CreateCategories() {
    try {
      await prismadb.category.create({
        data: {
          name: "ballerinas",
          parentId: "665d9bf1fa508b3a39463169",
          PosterId: "665d96107547073cf15bf543", // Replace with actual Poster ID
        },
      });await prismadb.category.create({
        data: {
          name: "clogs",
          parentId: "665d9bf1fa508b3a39463169",
          PosterId: "665d96107547073cf15bf543", // Replace with actual Poster ID
        },
      });await prismadb.category.create({
        data: {
          name: "flats",
          parentId: "665d9bf1fa508b3a39463169",
          PosterId: "665d96107547073cf15bf543", // Replace with actual Poster ID
        },
      });await prismadb.category.create({
        data: {
          name: "Heels",
          parentId: "665d9bf1fa508b3a39463169",
          PosterId: "665d96107547073cf15bf543", // Replace with actual Poster ID
        },
      });await prismadb.category.create({
        data: {
          name: "slippers",
          parentId: "665d9bf1fa508b3a39463169",
          PosterId: "665d96107547073cf15bf543", // Replace with actual Poster ID
        },
      });await prismadb.category.create({
        data: {
          name: "sneakers",
          parentId: "665d9bf1fa508b3a39463169",
          PosterId: "665d96107547073cf15bf543", // Replace with actual Poster ID
        },
      });
      
 
  
console.log("successfully created categories");
      } catch (error) {
        console.error("Error deleting sizes:", error);
    } 
  }
     
  
export async function test() {
 
 
}

  

