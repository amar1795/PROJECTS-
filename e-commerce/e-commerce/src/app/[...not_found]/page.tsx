"use client";

import Image from 'next/image'
import React from 'react'
// import notfound from '../video/pulp-fiction-john-travolta-ezgif.com-video-to-gif-converter.gif'
import notfound from '../../video/pulp-fiction-john-travolta-ezgif.com-video-to-gif-converter.gif'
import Link from 'next/link'


const NotFound = () => {
    return (
        <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Link href="/" >
                Return Home
            </Link>
            
            <Image src={notfound} alt='not-found'></Image>
        </div>
    )
}

export default NotFound
