import React from 'react';
import PropTypes from 'prop-types';
import {
    viewStyle as Styles
} from '../../styles/view';
import {
    converts
} from '../../services';
import utils from '../../services/utils';
const propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};
class ViewComponent extends React.Component {
    render() {
        const {
            type,
            data
        } = this.props;
        const {
            title,
            startTime,
            content
        } = data;
        const isValidData = title && content && startTime ? true : false;
        const classLanguage = Styles[utils.getParameter('language') || 'en_US'];
        return (
            <div>
            {
                isValidData ?
                 <div className={classLanguage}>
                    <div className={Styles.content_container}>
                        <div className={Styles.content_title}>
                            <h4 className={Styles.title}>[{type}] {title}</h4>
                            <p className={Styles.time}>{converts.dateToString(startTime)}</p>
                        </div>
                        <div 
                            className={Styles.content_content} 
                            dangerouslySetInnerHTML={{
                                __html: content
                            }}
                        >
                        </div>
                    </div>
                </div>
                    : null
                
            }
            </div>
        );
    }
}
ViewComponent.propTypes = propTypes;
export default ViewComponent;