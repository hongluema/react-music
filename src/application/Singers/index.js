import React, { useState, memo } from 'react';
import Horizen from '../../baseUI/horizen-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import Lazyload, { forceCheck } from 'react-lazyload'
import Scroll from '../../baseUI/scroll'
import './style.scss'

function Singers(props) {

    const [category, setCategory] = useState('')
    const [alpha, setAlpha] = useState('')

    let handleUpdateCategory = (val) => {
        setCategory(val)
    }

    let handleUpdateAlpha = (val) => {
        setAlpha(val)
    }

    // mock 数据
    const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
        return {
            picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
            name: "隔壁老樊",
            accountId: 277313426,
        }
    })

    // 渲染函数，返回歌手列表
    const renderSingerList = () => {
        return (
            <div className="singer-list">
                {
                    singerList.map((item, index) => {
                        return (
                            <div className="singer-list-item" key={`${item.accountId}${index}`}>
                                <div className="img-wrapper">
                                    <div className="decorate"></div>
                                    <Lazyload placeholder={<img width='100%' height='100%' src={require('../../components/list/music.png')} alt='music' />}>
                                        <img src={item.picUrl + "?param=300x300"} alt="music" width="100%" height="100%" />
                                    </Lazyload>
                                </div>
                                <div className="desc">{item.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className='singers-wrapper'>
            <div className="singer-nav">
                <Horizen list={categoryTypes} title='分类 (默认热门):' handleClick={(val) => handleUpdateCategory(val)} oldVal={category} ></Horizen>
                <Horizen list={alphaTypes} title={"首字母:"} handleClick={(val) => handleUpdateAlpha(val)} oldVal={alpha}></Horizen>
            </div>

            <div className="singer-list-container">
                <Scroll onScroll={forceCheck}>
                    {renderSingerList()}
                </Scroll>
            </div>
        </div>
    )
}

export default memo(Singers)