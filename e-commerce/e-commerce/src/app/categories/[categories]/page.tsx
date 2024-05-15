import React from 'react';
import { redirect } from 'next/navigation'

const Page = ({ params }: { params: { categories: string } }) => {
    const categoryColors: { [key: string]: string } = {
        men: 'bg-red-500',
        women: 'bg-pink-500',
        kids: 'bg-green-500',
    };

    // Check if the entered category is valid
    if (!categoryColors[params.categories]) {
        // Redirect to the "Not Found" page
         
        redirect(`/not-found`)         
       
    }

    return (
        <div className={`h-[90vh] ${categoryColors[params.categories]}`}>
            This is the categories page for {params.categories}
        </div>
    );
};

export default Page;
