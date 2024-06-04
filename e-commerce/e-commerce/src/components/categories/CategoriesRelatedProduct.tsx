import React from 'react'
import ProductCard from '../product card/productCard'

const CategoriesRelatedProduct = () => {
  return (
    <div>
      <div className="  bg-blue-500 min-h-[30rem] px-5">
            <h1 className=" pt-4 pb-4">Related products</h1>

            <div className=" flex  flex-wrap pl-3">
              <div className=" pr-10 py-4">
                <ProductCard />
              </div>
              <div className=" pr-10 py-4">
                <ProductCard />
              </div>
            </div>
          </div>
    </div>
  )
}

export default CategoriesRelatedProduct
