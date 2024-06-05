import React from 'react'
import ProductCard from '../product card/productCard'

const CategoriesRelatedProduct = () => {
  return (
    <div>
      <div className="  bg-blue-500 min-h-[30rem] px-5">
            <h1 className=" pt-4 pb-4 text-[2rem]">Related products</h1>

            <div className=" flex  flex-wrap pl-3">
              <div className="py-4">
                <ProductCard />
              </div>
              <div className=" py-4">
                <ProductCard />
              </div>
            </div>
          </div>
    </div>
  )
}

export default CategoriesRelatedProduct
