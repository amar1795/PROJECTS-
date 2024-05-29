"use server"
// pages/api/createDummyUsers.js
import { faker } from '@faker-js/faker';
import { prismadb } from "@/lib/db";
import { NextResponse } from 'next/server';


export async function dummyPosterFunction() {
    try {
        const dummyUsers = [];

        const labels = [
            { label: 'Men', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1716810277/aszzwtofbgljr0nw1e2y.jpg' },
            { label: 'Women', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1716810545/biurxjvht0qwvk9mmfed.jpg' },
            { label: 'Kids', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1716810626/tdg8zgvztxkdwiegggua.jpg' },
            { label: 'Furniture', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1716810809/nxhbadspinsfzfhddd31.jpg' },
            { label: 'Shoes', imageUrl: 'https://res.cloudinary.com/dfveswqdm/image/upload/v1716811775/n52ughqjwezs5zcqnncl.jpg' }
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
            { name: 'Blue', value: '3a86ff' },
            { name: 'Purple', value: '8338ec' },
            { name: 'Red', value: 'ff006e' },
            { name: 'Orange', value: 'fb5607' },
            { name: 'Yellow', value: 'ffbe0b' },
            { name: 'Black', value: '000000' }, 
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


export async function CreateSize() {
    try {
        const sizes = [];
        
        const sizeLabels = [
            { name: 'Extra Small', values: 'XS', category: 'women' },
            { name: 'Small', values: 'S', category: 'women' },
            { name: 'Medium', values: 'M', category: 'women' },
            { name: 'Large', values: 'L', category: 'women' },
            { name: 'Extra Large', values: 'XL', category: 'women' },
            { name: 'Extra Extra Large', values: 'XXL', category: 'women' },
            { name: 'Extra Small', values: 'XS', category: 'men' },
            { name: 'Small', values: 'S', category: 'men' },
            { name: 'Medium', values: 'M', category: 'men' },
            { name: 'Large', values: 'L', category: 'men' },
            { name: 'Extra Large', values: 'XL', category: 'men' },
            { name: 'Extra Extra Large', values: 'XXL', category: 'men' },
            { name: 'Extra Small', values: 'XS', category: 'kids' },
            { name: 'Small', values: 'S', category: 'kids' },
            { name: 'Medium', values: 'M', category: 'kids' },
            { name: 'Large', values: 'L', category: 'kids' },
            { name: 'Extra Large', values: 'XL', category: 'kids' },
            { name: 'Extra Extra Large', values: 'XXL', category: 'kids' },
            { name: 'UK Size 3', values: '3', category: 'shoes' },
            { name: 'UK Size 4', values: '4', category: 'shoes' },
            { name: 'UK Size 5', values: '5', category: 'shoes' },
            { name: 'UK Size 6', values: '6', category: 'shoes' },
            { name: 'UK Size 7', values: '7', category: 'shoes' },
            { name: 'UK Size 8', values: '8', category: 'shoes' },
            { name: 'UK Size 9', values: '9', category: 'shoes' },
            { name: 'UK Size 10', values: '10', category: 'shoes' },
            { name: 'UK Size 11', values: '11', category: 'shoes' },
            { name: 'UK Size 12', values: '12', category: 'shoes' }
        ];

        for (const item of sizeLabels) {
            const size = await prismadb.size.create({
                data: {
                    name: item.name,
                    values: [item.values],
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
      

