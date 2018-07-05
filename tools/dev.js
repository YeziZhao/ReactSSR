import csshook from 'css-modules-require-hook/preset';// import hook before routes
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../configs/webpack.config.dev';
import open from 'open';
import colors from 'colors';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import httpProxy from 'http-proxy';
import route from '../src/server/index';
import url from 'url';

console.log('Initializing server application...');
const app = express();
console.log('Compiling bundle...');
const PORT = 80;
const IP_ADRESS = '127.0.0.1';
const apiProxy = httpProxy.createProxyServer();

// 客户端内容
const compiler = webpack(config);
let webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    quiet: true    // display nothing to the console
});
app.use(webpackDevMiddlewareInstance);
app.use(webpackHotMiddleware(compiler));

// api proxy
app.use('/oneapp/api/*', (req, res) => {
    let proxiedUrl = req.baseUrl;
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

// client file 
app.use('/client/*', function(req, res, next) {
    try {
        res.sendFile(path.join(__dirname, '..',req.originalUrl))
    } catch(err) {
        res.end('not found');
    }
}); 

// SSR
app.get(['/notice', '/update'], route);

// not SSR
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

app.listen(PORT, IP_ADRESS,  () => console.log(`
    =====================================================
    -> Server start
    =====================================================
    `))