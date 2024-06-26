import React from 'react'
import { FaShoppingBag } from "react-icons/fa";

const ShoppingCart = ({mensCollectionData}) => {
    return (
        <div>
             <div className=" flex text-center">
                    <div className=" flex justify-between items-center mr-5 relative">
                    <FaShoppingBag size={23}/>
                        <span className=" font-mono bg-white w-5 h-5 rounded-full absolute top-0 left-6">{mensCollectionData[0]?.totalUniqueCartItems}</span>
                        
                        </div>
                    </div> 
        </div>
    )
}

export default ShoppingCart
