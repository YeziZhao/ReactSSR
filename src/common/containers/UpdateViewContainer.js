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
import {
    updateParameter
} from '../models';
const propTypes = {
    update: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
class UpdateViewContainer extends React.Component {
    constructor(props) {
        super(props);

        this.getParameters = this.getParameters.bind(this);
        this.getUpdate = this.getUpdate.bind(this);
    }
    componentDidMount() {
        this.getUpdate();
    }
    getUpdate() {
        const {
            actions
        } = this.props;
        const parameters = this.getParameters();
        actions.getUpdate(parameters);
    }
    getParameters() {
        let updateParameters = _.map(updateParameter, (p, k) => k);
        let parameters = _.zipObject(updateParameters, _.map(updateParameters, p => utils.getParameter(p)));
        return parameters;
    }
    render() {
        const {
            update
        } = this.props;
        return (
            <ViewComponent
                data={update}
                type={M.TEXT_UPDATE}
            />
        );
    }
}
UpdateViewContainer.propTypes = propTypes;
const mapStateToProps = (state) => {
    return {
        update: state.update
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(viewActions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateViewContainer);