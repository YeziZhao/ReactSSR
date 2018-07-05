import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ViewComponent from '../components/ViewComponent';
import * as viewActions from '../actions/viewActions';
import {
    utils,
    MESSAGES as M
} from '../services';
import _ from 'lodash';
const propTypes = {
    notice: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
class NoticeViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.getNotice = this.getNotice.bind(this);
    }
    componentDidMount() {
        this.getNotice();
        this.getNotice();
        // this.getNotice();
        // this.getNotice();
        // this.getNotice();
        // this.getNotice();
        // this.getNotice();
        // this.getNotice();
        // this.getNotice();
        // this.getNotice();
    }
    getNotice() {
        const {
            actions
        } = this.props;
        const parameters = utils.getNoticeParams();
        actions.getNotice(parameters);
    }
    render() {
        const {
            notice
        } = this.props;
        return (
            <div>
                <ViewComponent
                    data={notice}
                    type={M.TEXT_NOTICE}
                /> 
            </div>
        );
    }
}
NoticeViewContainer.propTypes = propTypes;
const mapStateToProps = (state) => {
    return {
        notice: state.notice
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(viewActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NoticeViewContainer);