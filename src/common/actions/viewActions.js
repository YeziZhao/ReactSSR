import * as types from './actionTypes';
import {
    noticeParameter,
    updateParameter,
    notice,
    update
} from '../models';
import {
    api
} from '../services';
export function initNotice() {
    return {
        type: types.INIT_NOTICE
    };
}
export function initUpdate() {
    return {
        type: types.INIT_UPDATE
    };
}
export function getNotice(parameter = noticeParameter) {
    return (dispatch) => {
        api.getNotice(parameter)
        .then(({
            code,
            message,
            data
        }) => {
            if (code === 'SUCCESS') {
                const {
                    startTime,
                    updateContent
                } = data;
                const {
                    title,
                    content
                } = updateContent;
                const notice = {
                    startTime,
                    title,
                    content
                };
                dispatch(getNoticeSuccess({
                    notice
                }));
            }
        });
    };
}
function getNoticeSuccess({
    notice
} = notice) {
    return {
        type: types.GET_NOTICE,
        notice
    };
}
export function getUpdate(parameter = updateParameter) {
    return (dispatch) => {
        api.getUpdate(parameter)
        .then(({
            code,
            message,
            data
        }) => {
            if (code === 'SUCCESS') {
                const {
                    startTime,
                    updateContent
                } = data;
                const {
                    title,
                    content
                } = updateContent;
                const update = {
                    startTime,
                    title,
                    content
                };
                dispatch(getUpdateSuccess({
                    update
                }));
            }
        });
    };
}
function getUpdateSuccess({
    update
} = update) {
    return {
        type: types.GET_UPDATE,
        update
    };
}