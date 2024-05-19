import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import  Confetti  from 'react-confetti'


const ConfettiComponent = () => {
        // const { width, height } = useWindowSize()
        return (
            <Confetti
            width={1200}
            height= {800}
            // tweenDuration={20000}
            numberOfPieces={500}
            />)
            
}

export default ConfettiComponent
