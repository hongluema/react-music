import React, { memo } from 'react';
import Horizen from '../../baseUI/horizen-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import './style.scss'

function Singers(props) {
    return (
        <div className='singers-nav-container'>
            <Horizen list={categoryTypes} title='分类 (默认热门):' ></Horizen>
            <Horizen list={alphaTypes} title={"首字母:"}></Horizen>
        </div>
    )
}

export default memo(Singers)