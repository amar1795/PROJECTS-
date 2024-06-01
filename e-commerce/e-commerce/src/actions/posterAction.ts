"use server"
// pages/api/createDummyUsers.js
import { faker } from '@faker-js/faker';
import { prismadb } from "@/lib/db";
import { NextResponse } from 'next/server';
import { count } from 'console';


export async function dummyPosterFunction() {
    try {
        const dummyUsers = [];

        const labels = [
            { label: 'Men Category', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717176156/Mens%20category%20folder/mens_l23be6.jpg' },
            { label: 'Belt', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717176135/Mens%20category%20folder/belt_vfzrlt.jpg' },
            { label: 'Shoes', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717176160/Mens%20category%20folder/shoes_fmkkjh.jpg' },
            { label: 'Formal Clothes', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717176146/Mens%20category%20folder/formal_asap5l.jpg' },
            { label: 'Casual Clothes', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717176138/Mens%20category%20folder/casual_z0t3sz.jpg' },
            { label: 'Blazers', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717176136/Mens%20category%20folder/blazzer_qff9vw.jpg' },
            { label: 'Formal Shirts', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717176153/Mens%20category%20folder/formal_shirt_ayzyee.jpg' },
            { label: 'Formal Pants', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717176149/Mens%20category%20folder/formal_pant_igrhac.jpg' },
            { label: 'Casual Shorts', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717176141/Mens%20category%20folder/casual_pants_jjzbqx.jpg' },
            { label: 'Casual Shirts', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1717176144/Mens%20category%20folder/casual_shirt_yeijrx.jpg' }
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
            { name: 'Men', PosterId: '6655b7713bc9ad76aabc9e88' },
            { name: 'Women', PosterId: '6655b7713bc9ad76aabc9e89' },
            { name: 'Kids', PosterId: '6655b7713bc9ad76aabc9e8a' },
            { name: 'Furniture', PosterId: '6655b7713bc9ad76aabc9e8b' },
            { name: 'Shoes', PosterId: '6655b7713bc9ad76aabc9e8c' },
            
        ];

        for (const item of labels) {
           const label= await prismadb.category.create({
                data: {
                    name: item.name,
                    PosterId: item.PosterId
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
        // Delete all sizes
       // Step 1: Create Categories

// 1. Create Men Category
const menCategory = await prismadb.category.create({
    data: {
      name: "Men",
      PosterId: "665a0ace14be77720636d439", // Replace with actual Poster ID
    },
  });
  
  // 2. Create Belt Category (Subcategory of Men)
  const beltCategory = await prismadb.category.create({
    data: {
      name: "Belt",
      parentId: menCategory.id,
      PosterId: "665a0ace14be77720636d43a", // Replace with actual Poster ID
    },
  });
  
  // 3. Create Shoes Category (Subcategory of Men)
  const shoesCategory = await prismadb.category.create({
    data: {
      name: "Shoes",
      parentId: menCategory.id,
      PosterId: "665a0ace14be77720636d43b", // Replace with actual Poster ID
    },
  });
  
  // 4. Create Formal Clothes Category (Subcategory of Men)
  const formalClothesCategory = await prismadb.category.create({
    data: {
      name: "Formal Clothes",
      parentId: menCategory.id,
      PosterId: "665a0acf14be77720636d43c", // Replace with actual Poster ID
    },
  });
  
  // 5. Create Casual Clothes Category (Subcategory of Men)
  const casualClothesCategory = await prismadb.category.create({
    data: {
      name: "Casual Clothes",
      parentId: menCategory.id,
      PosterId: "665a0acf14be77720636d43d", // Replace with actual Poster ID
    },
  });
  
  // 6. Create Blazers Category (Subcategory of Men)
  const blazersCategory = await prismadb.category.create({
    data: {
      name: "Blazers",
      parentId: menCategory.id,
      PosterId: "665a0acf14be77720636d43e", // Replace with actual Poster ID
    },
  });
  
  // 7. Create Formal Shirts Category (Subcategory of Formal Clothes)
  const formalShirtsCategory = await prismadb.category.create({
    data: {
      name: "Formal Shirts",
      parentId: formalClothesCategory.id,
      PosterId: "665a0acf14be77720636d43f", // Replace with actual Poster ID
    },
  });
  
  // 8. Create Formal Pants Category (Subcategory of Formal Clothes)
  const formalPantsCategory = await prismadb.category.create({
    data: {
      name: "Formal Pants",
      parentId: formalClothesCategory.id,
      PosterId: "665a0ad014be77720636d440", // Replace with actual Poster ID
    },
  });
  
  // 9. Create Casual Shorts Category (Subcategory of Casual Clothes)
  const casualShortsCategory = await prismadb.category.create({
    data: {
      name: "Casual Shorts",
      parentId: casualClothesCategory.id,
      PosterId: "665a0ad014be77720636d441", // Replace with actual Poster ID
    },
  });
  
  // 10. Create Casual Shirts Category (Subcategory of Casual Clothes)
  const casualShirtsCategory = await prismadb.category.create({
    data: {
      name: "Casual Shirts",
      parentId: casualClothesCategory.id,
      PosterId: "665a0ad014be77720636d442", // Replace with actual Poster ID
    },
});
console.log("successfully created categories");
      } catch (error) {
        console.error("Error deleting sizes:", error);
    } 
  }
     
  

  

