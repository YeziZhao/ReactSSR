
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import NoticeViewContainer from '../common/containers/NoticeViewContainer';
import UpdateViewContainer from '../common/containers/UpdateViewContainer';
import configureStore from '../common/store/configureStore';
import template from './template';
import getPreStore from './getPreStore';
import Routes from '../common/routes';
import { StaticRouter, Switch, Route } from 'react-router-dom';


var route = async (req, res, next) => {
 
    try { 
        location.href = req.url;
        // This context object contains the results of the render
        const context = {};
        // Compile an initial state, Create a new Redux store instance
        const store = configureStore(await getPreStore(req.path, next));
        let initView = (
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    { Routes }
                </StaticRouter>
            </Provider>
        );
        // Render the component to a string
        let html = '';
        try {
            html = renderToString(initView);
        } catch (err) {
            console.error('error: renderToString failed: ', err);
            next(err);
        }
    
        // Grab the initial state from our Redux store
        const preloadedState = store.getState();
        // Send the rendered page back to the client
        return res
        .status(202)
        .set('content-type', 'text/html')
        .send(template(html, preloadedState));
        
    } catch (err) {
        err.status = 500;
        next(err);
      }
}
export default route;