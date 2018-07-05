const template = (html, preloadedState) => {
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Update</title>
                <link href="/client/index.css" rel="stylesheet">
            </head>
            <body>
                <div id="app"><div>${html}</div></div>
                <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
                </script>
                <script type="text/javascript" src="/client/index.js"></script>
            </body>
        </html>
    `
};
export default template;