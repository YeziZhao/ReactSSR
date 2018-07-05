import axios from 'axios';
import {
    updateParameter
} from '../../models';
function getUpdate(parameters = updateParameter) {
    const {
        noticeUuid,
        noticeType,
        osPlatform,
        domainId,
        language
    } = parameters;
    return axios({
        method: 'GET',
        url: `/oneapp/api/getNoticeDetail?noticeUuid=${noticeUuid}&noticeType=${noticeType}&osPlatform=${osPlatform}&domainId=${domainId}&language=${language}&date=${(new Date()).valueOf()}`
    })
    .then((response) => {
        return response.data;
    });
}
export default getUpdate;