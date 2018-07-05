import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import url from 'url';
import httpProxy from 'http-proxy';
const apiProxy = httpProxy.createProxyServer();
const app = express();
const DOCS_PATH =  '../client/';
const PORT = 3000;
const IP_ADRESS = "localhost";

app.use(compression());
app.use(express.static(path.join(__dirname, DOCS_PATH)));

// api
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

// assert url deal
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
app.listen(
    PORT,
    IP_ADRESS,
    () => console.log(`
      =====================================================
      -> Server start
      =====================================================
    `)
  );