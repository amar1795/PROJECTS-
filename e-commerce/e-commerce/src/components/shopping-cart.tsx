import React from 'react'
import { FaShoppingBag } from "react-icons/fa";

const ShoppingCart = () => {
    return (
        <div>
             <div className=" flex text-center">
                    <div className=" flex justify-between items-center mr-5 relative">
                    <FaShoppingBag size={30}/>
                        <span className=" font-mono bg-red-500 w-5 h-5 rounded-full absolute top-0 left-6">1</span>
                        
                        </div>
                    </div> 
        </div>
    )
}

export default ShoppingCart
