import React, { useState, useContext, useEffect, memo } from 'react';
import Horizen from '../../baseUI/horizen-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import Lazyload, { forceCheck } from 'react-lazyload'
import Scroll from '../../baseUI/scroll'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import Loading from '../../baseUI/loading'
import './style.scss'
import { changePageCount, changeEnterLoading, getSingerList, changePullUpLoading, refreshMoreHotSingerList, refreshMoreSingerList, changePullDownLoading, getHotSingerList } from './store/actionCreators';

function Singers(props) {

    const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props
    const { getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props

    const [category, setCategory] = useState('')
    const [alpha, setAlpha] = useState('')

    let handleUpdateCategory = (val) => {
        setCategory(val)
        updateDispatch(category, alpha)
    }

    let handleUpdateAlpha = (val) => {
        setAlpha(val)
        updateDispatch(category, alpha)
    }

    let handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, category === '', pageCount)
    }

    let handlePullDown = () => {
        pullDownRefreshDispatch(category, alpha, category === '')
    }


    useEffect(() => {
        getHotSingerDispatch()
    }, [])

    // mock 数据
    // const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
    //     return {
    //         picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    //         name: "隔壁老樊",
    //         accountId: 277313426,
    //     }
    // })

    // 渲染函数，返回歌手列表
    const renderSingerList = () => {
        // singerList 还是 immutable 数据结构
        const list = singerList.size ? singerList.toJS() : []
        return (
            <div className="singer-list">
                {
                    list.map((item, index) => {
                        return (
                            <div className="singer-list-item" key={`${item.accountId}${index}`}>
                                <div className="img-wrapper">
                                    <div className="decorate"></div>
                                    <Lazyload placeholder={<img width='100%' height='100%' src={require('./singer.png')} alt='music' />}>
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
                <Scroll onScroll={forceCheck} pullUp={handlePullUp} pullDown={handlePullDown} pullUpLoading={pullUpLoading} pullDownLoading={pullDownLoading}>
                    {renderSingerList()}
                </Scroll>
                <Loading show={enterLoading}></Loading>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount']),
})

const mapDispatchToProps = (dispatch) => ({
    getHotSingerDispatch: () => {
        dispatch(actionCreators.getHotSingerList())
    },
    updateDispatch: (category, alpha) => {
        dispatch(changePageCount(0)) // 由于改变了分类，所以pageCount清零
        dispatch(changeEnterLoading(true)) // loading，现在实现控制逻辑，效果实现放在后面
        dispatch(getSingerList(category, alpha))
    },
    // 滑动到最底部刷新部分的处理
    pullUpRefreshDispatch: (category, alpha, hot, count) => {
        dispatch(changePullUpLoading(true))
        dispatch(changePageCount(count + 1))
        if (hot) {
            dispatch(refreshMoreHotSingerList())
        } else {
            dispatch(refreshMoreSingerList(category, alpha))
        }
    },
    // 顶部下拉刷新
    pullDownRefreshDispatch: (category, alpha, hot) => {
        dispatch(changePullDownLoading(true));
        dispatch(changePageCount(0)) // 属于重新获取数据
        if (hot) {
            dispatch(getHotSingerList())
        } else {
            dispatch(getSingerList(category, alpha))
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Singers))