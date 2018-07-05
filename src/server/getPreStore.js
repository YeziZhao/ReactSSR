import parallel from 'async/parallel';
import getNotice from '../common/services/api/getNotice';
import axios from 'axios';
import { utils } from '../common/services';

const getData = function(params) {
    return function(done) {
        const {
            noticeUuid,
            noticeType,
            osPlatform,
            domainId,
            language
        } = params;
        axios({
            method: 'GET',
            url: `/oneapp/api/getNoticeDetail?noticeType=${noticeType}&noticeUuid=${noticeUuid}&domainId=${domainId}&osPlatform=${osPlatform}&language=${language}&date=${(new Date()).valueOf()}`
        })
        .then((response) => {
            done(null, response.data)
        });
    }
}

const getNoticeData = async function(params) {
    return new Promise((resolve, reject) => {
        parallel({
            one: getData(params),
            // two: getData(params),
            // three: getData(params),
            // four: getData(params),
            // five: getData(params),
            // six: getData(params),
            // seven: getData(params),
            // eight: getData(params),
            // nine: getData(params),
            // ten: getData(params)
        }, function(err, results) {
            if (err) {
                reject(err)
            }else {
                resolve(results.one)
            }
        })
    });
}

const getPreStore = async (path, next) => {
    let params = utils.getNoticeParams();
    let {
        code,
        message,
        data
    } = await getNoticeData(params);

    if (code !== 'SUCCESS') {
        let err = { status: 404 };
        next(err);
    }
    const {
        startTime,
        updateContent
    } = data;
    const {
        title,
        content
    } = updateContent;
    let type = new RegExp(/\/(\w+)/).exec(path)[1];
    return {
        [type]: {
            startTime,
            title,
            content
        }
    };
}

export default getPreStore;