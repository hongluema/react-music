import { fromJS } from "immutable";
import * as ationTypes from './constants'

const defaultState = fromJS({
    currentAlbum: {},
    enterLoading: true
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case ationTypes.CHANGE_CURRENT_ALBUM:
            return state.set('currentAlbum', action.data)
        case ationTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data)
        default:
            return state
    }
}
