import * as types from '../actions/actionTypes';
import initialState from './initialState';
function updateReducer(state = initialState.update, action) {
    switch(action.type) {
        case types.GET_UPDATE:
            return getUpdate(state, action);
        default:
            return state;
    }
}
function getUpdate(state, action) {
    return action.update;
}
export default updateReducer;