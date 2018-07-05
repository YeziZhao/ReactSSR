import { noticeParameter } from '../../models';
import getParameter from './getParameter';
import _ from 'lodash'; 
function getNoticeParams() {
    let noticeParameters = _.map(noticeParameter, (p, k) => k);
    let parameters = _.zipObject(noticeParameters, _.map(noticeParameters, p => getParameter(p)));
    return parameters;
}
export default getNoticeParams;