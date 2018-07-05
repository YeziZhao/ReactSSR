import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import NoticeViewContainer from './containers/NoticeViewContainer';
import UpdateViewContainer from './containers/UpdateViewContainer';
export default (
    <Switch>
        <Route exact path="/notice" component={NoticeViewContainer} />
        <Route exact path="/notice/detail" component={NoticeViewContainer} />
        <Route exact path="/update" component={UpdateViewContainer} />
        <Route exact path="/update/detail" component={UpdateViewContainer} />
    </Switch>
);