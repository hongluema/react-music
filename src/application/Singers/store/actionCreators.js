import { getHotSingerListRequest, getSingerListRequest } from '../../../api/request'
import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { categoryTypes } from '../../../api/config';

const changeSingerList = (data) => ({
    type: actionTypes.CHANGE_SINGER_LIST,
    data: fromJS(data)
})

// bool 是不用fromJS的
export const changePageCount = (data) => ({
    type: actionTypes.CHANGE_PAGE_COUNT,
    data
})

// 进场loading
export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

// 滑动最底部的loading
export const changePullUpLoading = (data) => ({
    type: actionTypes.CHANGE_PULLUP_LOADING,
    data
})

// 顶部下拉刷新loading
export const changePullDownLoading = (data) => ({
    type: actionTypes.CHANGE_PULLDOWN_LOADING,
    data
})

// 第一次加载热门歌手
export const getHotSingerList = () => {
    return (dispatch) => {
        getHotSingerListRequest(0).then((res) => {
            const data = res.artists
            dispatch(changeSingerList(data))
            dispatch(changeEnterLoading(false))
            dispatch(changePullDownLoading(false))
        })
            .catch(err => {
                console.log('热门歌手数据获取失败')
            })
    }

}

// 加载更多热门歌手
export const refreshMoreHotSingerList = () => {
    return (dispatch, getState) => {
        // 获取redux中的当前页数和歌手列表
        const pageCount = getState().getIn(['singers', 'pageCount']);
        // 这里为了方便处理，转为JavaScript
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getHotSingerListRequest(pageCount).then(res => {
            // 将原来的歌手列表和新获取的歌手列表合并在一起组成新的数据
            const data = [...singerList, ...res.artists]
            dispatch(changeSingerList(data))
            dispatch(changePullUpLoading(false))
        }).catch((err) => {
            console.log('加载更多热门歌手数据获取失败')
        })
    }
}

// 第一次加载对应类别的歌手
export const getSingerList = (category, alpha) => {
    return (dispatch, getState) => {
        getSingerListRequest(category, alpha, 0).then(res => {
            const data = res.artists
            dispatch(changeSingerList(data))
            dispatch(changeEnterLoading(false))
            dispatch(changePullDownLoading(false))
        }).catch(err => {
            console.log('第一次加载对应类别的歌手获取失败')
        })
    }
}

// 加载更多歌手
export const refreshMoreSingerList = (category, alpha) => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount'])
        const singerList = getState().getIn(['singers', 'singerList']).toJS()
        getSingerListRequest(category, alpha, pageCount).then(res => {
            const data = [...singerList, ...res.artists]
            dispatch(changeSingerList(data))
            dispatch(changePullUpLoading(false))
        }).catch(err => {
            console.log('第一次加载对应类别的歌手获取失败')
        })
    }
}
