import React, { memo } from 'react';
import Lazyload from 'react-lazyload'
import './style.scss'
import { getCount } from '../../api/utils'

function RecommendList(props) {
    return (
        <div className='recommend-list-wrapper'>
            <h1 className='recommend-title'>推荐歌单</h1>
            <div className="recommend-list">
                {
                    props.recommendList.map((item, index) => {
                        return (
                            <div className="list-item" key={item.id}>
                                <div className="img-wrapper">
                                    <div className="decorate"></div>
                                    <Lazyload placeholder={<img width='100%' height='100%' src={require('./music.png')} alt='music' />}>
                                        <img src={item.picUrl + "?param=300x300"} alt="music" width="100%" height="100%" />
                                    </Lazyload>
                                    <div className="play-count">
                                        <i className="iconfont play">&#xe757;</i>
                                        <span className="count">{getCount(item.playCount)}</span>
                                    </div>
                                </div>
                                <div className="desc">{item.name}</div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default memo(RecommendList);