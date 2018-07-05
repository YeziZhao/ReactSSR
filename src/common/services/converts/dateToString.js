import moment from 'moment';
function dateToString(date) {
    return moment(new Date(date)).format('YYYY.MM.DD').toString();
}
export default dateToString;