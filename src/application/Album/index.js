import React, { memo } from 'react'
import './style.scss'

function Album() {
    console.log('enter album')
    return (
        <div className='album-container'>
            album
        </div>
    )
}

export default memo(Album)