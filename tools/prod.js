import express from 'express';
import path from 'path';
import color from 'color';
import bodyParser from 'body-parser';
import helmet from 'helmet'; // maks sure app secure
import compression from 'compression';
import PrettyError from 'pretty-error';
import morgan from 'morgan'; // logger middleware
import route from '../dist/index';
import url from 'url';

import httpProxy from 'http-proxy';
const apiProxy = httpProxy.createProxyServer();

const PORT = 80;
const IP_ADRESS = '127.0.0.1';
const DOCS_PATH =  '../client/';

const app = express();
app.set('port', PORT);
app.set('ipAdress', IP_ADRESS);
// const location = '';
// not mandatory but better looking console errors
const pe  = new PrettyError();
pe.start();
app.use(helmet());          // ensure app security
// app.use(compression());     // gzip compress if bowser supports it
app.use(bodyParser.json());

// if you need logs (note: uncomment line 11 too):
app.use(morgan('combined'));

// api
app.use('/oneapp/api/*', (req, res) => {
    let proxiedUrl = req.baseUrl;
    const url = require('url');
    let url_parts = url.parse(req.url, true);
    if (url_parts.search !== null) {
        proxiedUrl += url_parts.search;
    }
    req.url = proxiedUrl;

    apiProxy.web(req, res, {
        target: {
            // host: 'alpha-kr1-view.noticeapp.navercorp.com',
            host: 'alpha-kr1-notiapi.navercorp.com',
            port: 80
        }
    });
});

// SSR
app.get(['/notice', '/update'], route);

// client file and not SSR
app.use('*', function(req, res, next) {
    let pathExp = /((?:\/\w+)+)(\.\w+)?\??/;
    pathExp.exec(req.originalUrl.replace(/\/client/, ''))
    let filepath = RegExp.$1 + ( RegExp.$2 ? RegExp.$2 : '.html');
    try {
        res.sendFile(path.join(__dirname, '../client', filepath));
    } catch(err) {
        res.end('not found');
    }
}); 

app.use(errorHandle404);
app.use(allErrorHandler);
app.listen(PORT, IP_ADRESS,  () => console.log(`
=====================================================
-> Server start
=====================================================
`))

function errorHandle404(req, res, next) {
    console.log('req.url: ', req.url);
    const err = new Error('Not found');
    err.status = 404;
    next(err);
}
function allErrorHandler(err, req, res, next) {
    if (err.status === 404) {
      res.status(404).send('Sorry nothing here for now...');
    }
    console.error(err);
    res.status(500).send('internal server error');
  }