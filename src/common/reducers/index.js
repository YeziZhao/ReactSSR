import { combineReducers } from 'redux';
import notice from './noticeReducer';
import update from './updateReducer';

const rootReducer = combineReducers({
    notice,
    update
});

export default rootReducer;