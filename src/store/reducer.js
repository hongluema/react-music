// 合并不同模块 reducer 的时候需要用到 redux-immutable 中的方法
// 不是immutable 数据结构的就是从redux直接引入了
import { combineReducers } from 'redux-immutable'
// recommend 的reducer
import { reducer as recommendReducer } from '../application/Recommend/store'
import { reducer as singersReducer } from '../application/Singers/store'
import { reducer as rankReducer } from '../application/Rank/store'

// 根据不同的功能模块区分的 reducer
export default combineReducers({
    recommend: recommendReducer,
    singers: singersReducer,
    rank: rankReducer
})