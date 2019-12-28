import React, { useEffect, memo } from 'react';
import * as actionCreators from './store/actionCreators'
import { connect } from 'react-redux'
import { filterIndex } from '../../api/utils';
import Scroll from '../../baseUI/scroll'
import Loading from '../../baseUI/loading'
import { renderRoutes } from 'react-router-config';
import './style.scss'

function Rank(props) {

    const { rankList, loading } = props
    const { getRankListDispatch } = props
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
                        return <div key={index}>{index + 1}. {item.first} - {item.second}</div>
                    })
                }
            </div>
        ) : null
    }

    // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
    const renderRankList = (list, global) => {
        return (
            <div className={global ? 'rank-list global' : 'rank-list'}>
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
                    {renderRankList(officialList, false)}
                    <h1 className='global' style={displayStyle}> 全球榜 </h1>
                    {renderRankList(globalList, true)}
                    {loading ? <Loading></Loading> : null}
                </div>
            </Scroll>
            {/* 切记，renderRoutes 方法传入参数为路由配置数组，我们在组件中调用这个方法后只能渲染一层路由，再深层的路由就无法渲染，只能在组件中继续配置 */}
            {/* 还有数组其实取的就是props.route里的一个属性，这个属性的名字取决于你配置的是 routes 还是 children */}
            {renderRoutes(props.route.routes)}
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