let Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/js/app.js')
    .addEntry('user_edit', './assets/js/user/edit.js')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableSassLoader()
    .copyFiles({
      from: './assets/images',
      to: 'images/[path][name].[ext]',
    })
    .enableSingleRuntimeChunk()
    .createSharedEntry('vendor', './assets/js/vendor/index.js')
;

module.exports = Encore.getWebpackConfig();