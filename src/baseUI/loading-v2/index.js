import React, { memo } from 'react'
import './style.scss'

function LoadingV2() {
    return (
        <div className="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <span> 拼命加载中... </span>
        </div>
    )
}

export default memo(LoadingV2)

