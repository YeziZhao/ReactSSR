import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../configs/webpack.config.dev';
import open from 'open';
import colors from 'colors';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import httpProxy from 'http-proxy';

const port = 3000;
const app = express();
const compiler = webpack(config);
const apiProxy = httpProxy.createProxyServer();

let webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    quiet: true    // display nothing to the console
});
app.use(webpackDevMiddlewareInstance);

app.use(webpackHotMiddleware(compiler));

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

app.get('*', function(req, res, next) {
    let filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result) {
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(result);
        res.end();
    });
});

app.listen(port,"localhost", function(err) {
    if (err) {
        console.error(err);
    }
    // else {
    //     // open(`http://localhost:${port}`);

    //     // to wait until Webpack Dev Server loaded.
    //     webpackDevMiddlewareInstance.waitUntilValid(() => {
    //         open(`http://localhost:3000`);
    //     });   
    // }
});