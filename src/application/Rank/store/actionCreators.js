import * as actionTypes from './constants'
import { fromJS } from 'immutable';
import { getRankListRequest } from '../../../api/request'

const changeRankList = (data) => ({
    type: actionTypes.CHANGE_RANK_LIST,
    data: fromJS(data)
})

const changeLoading = (data) => ({
    type: actionTypes.CHANGE_LOADING,
    data
})

export const getRankList = () => {
    return (dispatch) => {
        getRankListRequest().then(res => {
            const data = res && res.list
            dispatch(changeRankList(data))
            dispatch(changeLoading(false))
        }).catch((err) => {
            console.log('请求排行榜数据出错')
        })
    }
}
