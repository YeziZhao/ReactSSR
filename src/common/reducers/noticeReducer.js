import * as types from '../actions/actionTypes';
import initialState from './initialState';
function noticeReducer(state = initialState.notice, action) {
    switch(action.type) {
        case types.GET_NOTICE:
            return getNotice(state, action);
        default:
            return state;
    }
}
function getNotice(state, action) {
    return action.notice;
}
export default noticeReducer;