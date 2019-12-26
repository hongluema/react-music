import * as actionTypes from './constants';
// fromJS 是用来把JS数据结构转化成 immutable 数据结构
import { fromJS } from 'immutable'

const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
    enterLoading: true
})


export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER:
            return state.set('bannerList', action.data);
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data)
        default:
            return state
    }
}

