import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { EmblaOptionsType } from 'embla-carousel'
import  EmblaCarousel  from './EmblaCarousel'
import './productembla.css'




 const ProductCarousel=()=> {
    const OPTIONS: EmblaOptionsType = { dragFree: true, loop: false }
    const SLIDE_COUNT = 20
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  return (
    <div>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  )
}

export default ProductCarousel