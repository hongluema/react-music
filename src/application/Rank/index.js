import React, { useEffect, memo } from 'react';
import * as actionCreators from './store/actionCreators'
import { connect } from 'react-redux'
import { filterIndex } from '../../api/utils';
import Scroll from '../../baseUI/scroll'
import Loading from '../../baseUI/loading'
import './style.scss'

function Rank(props) {

    const { rankList, loading } = props
    const { getRankListDispatch } = props
    console.log('rankList:', rankList)
    let list = rankList ? rankList.toJS() : []

    useEffect(() => {
        if (!list.length) {
            getRankListDispatch()
        }
    }, [])

    /*
    排行榜单分为两个部分，一部分是官方榜，另一部分是全球榜。
    官方榜单数据有 tracks 数组，存放部分歌曲信息，而全球榜没有。
    但是后端数据并没有将这两者分开，因此我们需要做一下数据的处理。
    */
    let globalStartIndex = filterIndex(list);
    let officialList = list.slice(0, globalStartIndex);
    let globalList = list.slice(globalStartIndex);

    // 进入详情
    const enterDetail = (name) => {

    }

    // 这是渲染歌曲列表函数
    const renderSongList = (list) => {
        return list.length ? (
            <div className="song-list">
                {
                    list.map((item, index) => {
                        return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
                    })
                }
            </div>
        ) : null
    }

    // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
    const renderRankList = (list, global) => {
        return (
            <div className="rank-list" globalRank={global}>
                {
                    list.map((item) => {
                        return (
                            <div className="rank-list-item" key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item.name)} >
                                <div className="img-wrapper">
                                    <img src={item.coverImgUrl} alt="" width='100%' height='100%' />
                                    <div className="decorate"></div>
                                    <span className='update-frequecy'>{item.updateFrequency}</span>
                                </div>
                                {renderSongList(item.tracks)}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    // 榜单数据未加载出来之前都给隐藏
    const displayStyle = loading ? { display: 'none' } : { display: '' }

    return (
        // <div className='rank-wrapper'>
        <div className="rank-container">
            <Scroll>
                <div>
                    <h1 className='offical' style={displayStyle}> 官方榜 </h1>
                    {renderRankList(officialList)}
                    <h1 className='global' style={displayStyle}> 全球榜 </h1>
                    {renderRankList(globalList)}
                    {loading ? <Loading></Loading> : null}
                </div>
            </Scroll>
        </div>

        // </div>
    )
}

const mapStateToProps = (state) => ({
    rankList: state.getIn(['rank', 'rankList']),
    loading: state.getIn(['rank', 'loading'])
})

const mapDispatchToProps = (dispatch) => ({
    getRankListDispatch: () => {
        dispatch(actionCreators.getRankList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Rank))