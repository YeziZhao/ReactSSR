import axios from 'axios';
import {
    noticeParameter
} from '../../models';
function getNotice(parameters = noticeParameter) {
    const {
        noticeUuid,
        noticeType,
        osPlatform,
        domainId,
        language
    } = parameters;
    return axios({
        method: 'GET',
        url: `/oneapp/api/getNoticeDetail?noticeType=${noticeType}&noticeUuid=${noticeUuid}&domainId=${domainId}&osPlatform=${osPlatform}&language=${language}&date=${(new Date()).valueOf()}`
    })
    .then((response) => {
        return response.data;
    });
}
export default getNotice;