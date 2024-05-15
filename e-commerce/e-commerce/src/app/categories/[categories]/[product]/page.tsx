import React from 'react'

const page = ({ params }: { params: { product: string } }) => {
  return (
    <div>
       This is the product page for {params.product}
    </div>
  )
}

export default page
