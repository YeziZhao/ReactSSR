
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../configs/webpack.config.dev';
import open from 'open';
import colors from 'colors';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import httpProxy from 'http-proxy';
import createError from 'http-errors';
import fs from 'fs';
import https from 'https';

const port = 80;
const app = express();
const compiler = webpack(config);
const apiProxy = httpProxy.createProxyServer();
let options = {
    key: fs.readFileSync('./ssl/privatekey.pem'),
    cert: fs.readFileSync('./ssl/certificate.pem'),
};

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
        },
        ssl: options,
        secure: true
    });
});
app.get('/notice/detail', function(req, res, next) {
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
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


https.createServer(options, app).listen(443, function (err) {
    console.log('Https server listening on port ' + 80);
});
// app.listen(port,"10.34.136.69", function(err) {
//     if (err) {
//         console.error(err);
//     }
// });