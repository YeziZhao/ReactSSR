import en_US from './en_US';
import ko_KR from './ko_KR';
import ja_JP from './ja_JP';
import zh_CN from './zh_CN';
import zh_TW from './zh_TW';
import utils from '../utils';

function getMessage() {
    const dLang = 'ko_KR';
    const lang = utils.getParameter('language') || dLang;
    const messages = {
        en_US,
        ko_KR,
        ja_JP,
        zh_CN,
        zh_TW
    };
    return messages[lang] || messages[dLang];
}
export default getMessage();