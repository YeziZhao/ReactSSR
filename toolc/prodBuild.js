import webpack from 'webpack';
import config from '../configs/webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production'; 
console.log('Generating minified bundle for production via Webpack. This will take a moment...'.blue);
webpack(config).run((err, stats) => {
    if (err) {  // so a fatal error occured. Stop here.
        console.log(err.bold.red);
        return 1;
    }
    const jsonStats = stats.toJson();
    if (jsonStats.hasErrors) {
        return jsonStats.erros.map(error => console.log(error.red));
    }
    if (jsonStats.hasWarnings) {
        console.log('Webpack generated the following warnings: '.bold.yellow);
        jsonStats.warnings.map(warning => console.log(warning.yellow));
    }
    console.log(`Webpack stats: ${stats}`);
     // if we got this far, the build succeeded.
     console.log(`Your app has been compiled in production mode and written to /dist. It's ready to roll!`.green);
});