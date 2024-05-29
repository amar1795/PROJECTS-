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
        const posters = await prismadb.poster.findMany({
            select: {
                label: true,
                imageUrl: true
            }
        });
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

    
          
      

  
