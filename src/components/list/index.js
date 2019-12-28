import React, { memo } from 'react';
import Lazyload from 'react-lazyload'
import { withRouter } from 'react-router-dom'
import './style.scss'
import { getCount } from '../../api/utils'

function RecommendList(props) {

    // 函数式跳转路由到详情页
    const enterDetail = (id) => {
        props.history.push(`/recommend/${id}`)
    }

    return (
        <div className='recommend-list-wrapper'>
            <h1 className='recommend-title'>推荐歌单</h1>
            <div className="recommend-list">
                {
                    props.recommendList.map((item, index) => {
                        return (
                            <div className="list-item" key={item.id} onClick={() => { enterDetail(item.id) }}>
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

/*
注意，这里 List 组件作为 Recommend 的子组件，并不能从 props 拿到 history 变量，无法跳转路由。有两种解决方法：
    1. 将 Recommend 组件中 props 对象中的 history 属性传给 List 组件
    2. 将 List 组件用 withRouter 包裹
*/
export default memo(withRouter(RecommendList));