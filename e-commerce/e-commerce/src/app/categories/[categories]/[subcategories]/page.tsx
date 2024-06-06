import React from 'react'

const page = ({ params }: { params: { subcategories: string } }) => {
  return (
    <div>
      <h1>
        This is the subCategories page for {params.subcategories}
      </h1>
    </div>
  )
}

export default page
