import React from 'react'
import ProductCard from '../product card/productCard'
import { relatedProduct ,updatedDataResponse } from '@/app/categories/[categories]/[product]/page'

interface CategoriesRelatedProductProps {
  relatedProduct: relatedProduct[];
  ProductId: string; // Define ProductId as string
}

const CategoriesRelatedProduct:React.FC<CategoriesRelatedProductProps>  = ({relatedProduct,ProductId}) => {
  if(!relatedProduct) return <div>
    Loading ...
  </div>
  // Filter out the product with the same ID as ProductId
  // const filteredProducts = relatedProduct.filter(product => product.id !== ProductId);
  console.log("this is the product id from related products page:", ProductId);

  return (
    <div>
      <div className="  bg-teal-600 min-h-[30rem] px-5">
            {/* <h1 className=" pt-4 pb-4 text-[2rem]">Related products</h1> */}

            <div className=" flex  flex-wrap pl-3">
            {relatedProduct
            .filter((product) => product.id !== ProductId) // Apply the filter here
            .map((product: relatedProduct) => (
              <div className="py-4" key={product.id}>
                <ProductCard product={product}  />
              </div>
            ))}
            </div>
          </div>
    </div>
  )
}

export default CategoriesRelatedProduct
