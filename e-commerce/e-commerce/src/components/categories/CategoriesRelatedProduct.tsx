import React from 'react'
import ProductCard from '../product card/productCard'
import { relatedProduct ,updatedDataResponse } from '@/app/categories/[categories]/[product]/page'

const CategoriesRelatedProduct:React.FC<relatedProduct[]>  = ({relatedProduct}) => {
  if(!relatedProduct) return <div>
    Loading ...
  </div>
  return (
    <div>
      <div className="  bg-blue-500 min-h-[30rem] px-5">
            <h1 className=" pt-4 pb-4 text-[2rem]">Related products</h1>

            <div className=" flex  flex-wrap pl-3">
            {relatedProduct.map((product:updatedDataResponse) => (
            <div className="py-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
            </div>
          </div>
    </div>
  )
}

export default CategoriesRelatedProduct
