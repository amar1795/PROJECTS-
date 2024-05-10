import Image from 'next/image'
import React from 'react'
import notfound from '../video/pulp-fiction-john-travolta-ezgif.com-video-to-gif-converter.gif'


const NotFound = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image src={notfound} alt='not-found'></Image>
        </div>
    )
}

export default NotFound
